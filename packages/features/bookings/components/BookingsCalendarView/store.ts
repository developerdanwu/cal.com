import { create } from "zustand";

import type { Dayjs } from "@calcom/dayjs";
import dayjs from "@calcom/dayjs";
import { getQueryParam, updateQueryParam } from "@calcom/features/bookings/Booker/utils/query-param";

type BookingsCalendarViewStore = {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  getEndDate: () => Dayjs;
  addToSelectedDate: (days: number) => void;
};

export const useBookingsCalendarView = create<BookingsCalendarViewStore>((set, get, store) => ({
  selectedDate: getQueryParam("date") || dayjs().format("YYYY-MM-DD"),
  getEndDate: () => dayjs(get().selectedDate).add(6, "day"),
  setSelectedDate: (selectedDate: string | null) => {
    if (!selectedDate) {
      updateQueryParam("date", "");
      set({ selectedDate: null });
      return;
    }

    set({ selectedDate });
    updateQueryParam("date", selectedDate);
  },
  // getEndDate: () => get().selectedDate.add(6, "day"),
  addToSelectedDate: (days: number) => {
    const currentSelection = dayjs(get().selectedDate);
    const newSelection = currentSelection.add(days, "day");
    const newSelectionFormatted = newSelection.format("YYYY-MM-DD");

    if (newSelection.month() !== currentSelection.month()) {
      set({ month: newSelection.format("YYYY-MM") });
      updateQueryParam("month", newSelection.format("YYYY-MM"));
    }

    set({ selectedDate: newSelectionFormatted });
    updateQueryParam("date", newSelectionFormatted);
  },
}));
