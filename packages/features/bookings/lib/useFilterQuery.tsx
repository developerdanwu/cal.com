import z from "zod";

import dayjs, { type Dayjs } from "@calcom/dayjs";
import { queryNumberArray, useTypedQuery } from "@calcom/lib/hooks/useTypedQuery";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

const zodDay = z.custom<Dayjs>((val) => val instanceof dayjs, "Invalid date");
// TODO: Move this to zod utils
export const filterQuerySchema = z.object({
  teamIds: queryNumberArray.optional(),
  userIds: queryNumberArray.optional(),
  status: z.enum(validStatuses).optional(),
  eventTypeIds: queryNumberArray.optional(),
  search: z.string().optional(),
  dateRange: z
    .string()
    .or(z.tuple([z.date(), z.date()]))

    .transform((a) => {
      if (typeof a === "string") {
        return a.split(",").map((date) => dayjs(date).toDate());
      }

      return a;
    })
    .optional(),
});

export function useFilterQuery() {
  return useTypedQuery(filterQuerySchema);
}
