import z from "zod";

import { useTypedQuery } from "@calcom/lib/hooks/useTypedQuery";

export const bookingQuerySchema = z.object({
  layout: z.enum(["week_view", "card_view"] as const).optional(),
});

export function useBookingState() {
  return useTypedQuery(bookingQuerySchema);
}
