import { create } from "zustand";

import type { Dayjs } from "@calcom/dayjs";
import dayjs from "@calcom/dayjs";

type BookingsCalendarViewStore = {
  selectedDate: Dayjs;
  getEndDate: () => Dayjs;
};

export const useBookingsCalendarView = create<BookingsCalendarViewStore>((setState, getState, store) => ({
  selectedDate: dayjs(),
  getEndDate: () => getState().selectedDate.add(6, "day"),
}));
