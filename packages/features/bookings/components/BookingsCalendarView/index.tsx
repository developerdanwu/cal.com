import { z } from "zod";

import { useBookingsCalendarView } from "@calcom/features/bookings/components/BookingsCalendarView/store";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { Calendar } from "@calcom/features/calendars/weeklyview/components/Calendar";
import type { CalendarEvent } from "@calcom/features/calendars/weeklyview/types/events";
import { trpc } from "@calcom/trpc";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

const querySchema = z.object({
  status: z.enum(validStatuses),
});

export default function BookingsCalendarView() {
  const { data: filterQuery } = useFilterQuery();
  const { selectedDate: startDate, endDate } = useBookingsCalendarView((state) => {
    return {
      selectedDate: state.selectedDate,
      endDate: state.getEndDate(),
    };
  });

  const query = trpc.viewer.bookings.get.useInfiniteQuery(
    {
      limit: 20,
      filters: {
        ...filterQuery,
        status: filterQuery.status ?? "all",
      },
    },
    {
      // first render has status `undefined`
      enabled: true,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const test =
    query?.data?.pages?.reduce((acc, x) => {
      x.bookings.forEach((booking) => {
        acc.push({
          id: booking.id,
          start: booking.startTime,
          end: booking.endTime,
          title: booking.title,
          options: {
            status: "ACCEPTED",
          },
        });
      });
      return acc;
    }, [] as CalendarEvent[]) || ([] as CalendarEvent[]);

  return (
    <div className="h-full [--calendar-dates-sticky-offset:66px]">
      <Calendar
        hideHeader
        isPending={false}
        gridCellsPerHour={60 / 120}
        events={test}
        startDate={startDate.toDate()}
        endDate={endDate.toDate()}
        startHour={0}
        endHour={23}
      />
    </div>
  );
}
