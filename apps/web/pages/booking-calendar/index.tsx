import type { BookerAreas } from "@calcom/features/bookings/Booker/types";
import BookingsCalendarView from "@calcom/features/bookings/components/BookingsCalendarView";
import { useBookingsCalendarView } from "@calcom/features/bookings/components/BookingsCalendarView/store";
import { TimeFormatToggle } from "@calcom/features/bookings/components/TimeFormatToggle";
import { FormattedSelectedDateRange } from "@calcom/features/calendars/weeklyview/components/heading/SchedulerHeading";
import Shell from "@calcom/features/shell/Shell";
import { classNames } from "@calcom/lib";

import PageWrapper from "@components/PageWrapper";

const gridAreaClassNameMap: { [key in BookerAreas]: string } = {
  calendar: "[grid-area:calendar]",
  main: "[grid-area:main]",
  meta: "[grid-area:meta]",
  timeslots: "[grid-area:timeslots]",
  header: "[grid-area:header]",
};

const test = `
      "header header header"
      "main main main"
      `;

export default function BookingCalendarPage() {
  const { selectedDate: startDate, endDate } = useBookingsCalendarView((state) => {
    return {
      selectedDate: state.selectedDate,
      endDate: state.getEndDate(),
    };
  });
  return (
    <Shell disableChildrenPadding title="Booking Calendar" description="penis">
      <main
        style={{
          gridTemplateAreas: test,
        }}
        className={classNames("relative grid w-full")}>
        <div className="border-default bg-default dark:bg-muted sticky top-0 z-10 flex items-center justify-between border-b px-5 py-4 [grid-area:header] ltr:border-l rtl:border-r">
          <FormattedSelectedDateRange selectedDate={startDate} endDate={endDate} />
          <TimeFormatToggle />
        </div>
        <div className="sticky top-0 h-full w-full overflow-clip [grid-area:main]">
          <BookingsCalendarView />
        </div>
      </main>
    </Shell>
  );
}

BookingCalendarPage.PageWrapper = PageWrapper;
