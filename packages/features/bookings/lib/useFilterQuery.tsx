import z from "zod";

import { queryNumberArray, useTypedQuery } from "@calcom/lib/hooks/useTypedQuery";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

// TODO: Move this to zod utils
export const filterQuerySchema = z.object({
  teamIds: queryNumberArray.optional(),
  userIds: queryNumberArray.optional(),
  status: z.enum(validStatuses).optional(),
  eventTypeIds: queryNumberArray.optional(),
  search: z.string().optional(),
  dateRange: z.array(z.string()).optional(),
});

export function useFilterQuery() {
  return useTypedQuery(filterQuerySchema);
}
