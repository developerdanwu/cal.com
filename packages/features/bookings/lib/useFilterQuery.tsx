import z from "zod";

import dayjs from "@calcom/dayjs";
import { queryNumberArray, useTypedQuery } from "@calcom/lib/hooks/useTypedQuery";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

// TODO: Move this to zod utils
export const filterQuerySchema = z.object({
  teamIds: queryNumberArray.optional(),
  userIds: queryNumberArray.optional(),
  status: z.enum(validStatuses).optional(),
  eventTypeIds: queryNumberArray.optional(),
  search: z.string().optional(),
  dateRange: z
    .string()
    .or(z.tuple([z.string(), z.string()]))

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
