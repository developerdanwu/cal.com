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
    .optional()
    .transform(
      // it returns comma separated values, can you split into start and end date
      (dateRange) => {
        // handle undefined case
        if (!dateRange) {
          return undefined;
        }

        const [startDate, endDate] = dateRange.split(",");
        return { start: dayjs(startDate).toDate(), end: dayjs(endDate).toDate() };
      }
    ),
});

export function useFilterQuery() {
  return useTypedQuery(filterQuerySchema);
}
