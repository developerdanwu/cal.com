import dayjs from "@calcom/dayjs";
import { useBookingsCalendarView } from "@calcom/features/bookings/components/BookingsCalendarView/store";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { Calendar } from "@calcom/features/calendars/weeklyview/components/Calendar";
import type { CalendarEvent } from "@calcom/features/calendars/weeklyview/types/events";
import { trpc } from "@calcom/trpc";

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
      limit: 100,
      filters: {
        ...filterQuery,
        status: filterQuery.status ?? "all",
        dateRange: {
          start: dayjs(startDate).toDate(),
          end: dayjs(endDate).toDate(),
        },
      },
    },
    {
      // first render has status `undefined`
      enabled: true,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const events =
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
        isPending={query.isLoading}
        gridCellsPerHour={60 / 120}
        events={events}
        startDate={dayjs(startDate).toDate()}
        endDate={endDate.toDate()}
        startHour={0}
        endHour={23}
      />
    </div>
  );
}
