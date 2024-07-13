import { z } from "zod";

import dayjs from "@calcom/dayjs";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { Calendar } from "@calcom/features/calendars/weeklyview/components/Calendar";
import type { CalendarEvent } from "@calcom/features/calendars/weeklyview/types/events";
import { useParamsWithFallback } from "@calcom/lib/hooks/useParamsWithFallback";
import { trpc } from "@calcom/trpc";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

const querySchema = z.object({
  status: z.enum(validStatuses),
});

export default function BookingsCalendarView() {
  const startDate = dayjs().toDate();
  const endDate = dayjs().add(6, "day").toDate();
  const { data: filterQuery } = useFilterQuery();
  const params = useParamsWithFallback();
  const { status } = params ? querySchema.parse(params) : { status: "upcoming" as const };

  const query = trpc.viewer.bookings.get.useInfiniteQuery(
    {
      limit: 20,
      filters: {
        ...filterQuery,
        status: filterQuery.status ?? status,
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
    <div className="w-full overflow-hidden [--calendar-dates-sticky-offset:66px]">
      <Calendar
        isPending={false}
        disableInitialScrollToCurrentTime={true}
        gridCellsPerHour={60 / 120}
        events={test}
        startDate={startDate}
        endDate={endDate}
        startHour={0}
        endHour={23}
      />
    </div>
  );
}
