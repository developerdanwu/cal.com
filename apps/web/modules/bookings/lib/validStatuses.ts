export const validStatuses = ["all", "upcoming", "recurring", "past", "cancelled", "unconfirmed"] as const;
export type ValidStatuses = (typeof validStatuses)[number];
