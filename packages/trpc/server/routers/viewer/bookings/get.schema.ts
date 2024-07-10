import { z } from "zod";

import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

export const ZGetInputSchema = z.object({
  filters: z.object({
    teamIds: z.number().array().optional(),
    userIds: z.number().array().optional(),
    status: z.enum(validStatuses),
    eventTypeIds: z.number().array().optional(),
    search: z.string().optional(),
    dateRange: z.array(z.date()).optional(),
  }),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist when using useInfiniteQuery, but can be any type
});

export type TGetInputSchema = z.infer<typeof ZGetInputSchema>;
