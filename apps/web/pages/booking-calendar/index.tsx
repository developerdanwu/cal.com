import dayjs from "@calcom/dayjs";
import BookingsCalendarView from "@calcom/features/bookings/components/BookingsCalendarView";
import { useBookingsCalendarView } from "@calcom/features/bookings/components/BookingsCalendarView/store";
import { TimeFormatToggle } from "@calcom/features/bookings/components/TimeFormatToggle";
import { FormattedSelectedDateRange } from "@calcom/features/calendars/weeklyview/components/heading/SchedulerHeading";
import Shell from "@calcom/features/shell/Shell";
import { classNames } from "@calcom/lib";
import type { HorizontalTabItemProps } from "@calcom/ui";
import { Button, ButtonGroup, HorizontalTabs } from "@calcom/ui";

import PageWrapper from "@components/PageWrapper";

const test = `
      "header header header"
      "main main main"
      `;

const tabs: HorizontalTabItemProps[] = [
  {
    name: "bookings_list",
    href: "/bookings",
  },
  {
    name: "bookings_calendar",
    href: "/booking-calendar",
  },
];

export default function BookingCalendarPage() {
  const {
    selectedDate: startDate,
    endDate,
    addToSelectedDate,
  } = useBookingsCalendarView((state) => {
    return {
      selectedDate: state.selectedDate,
      endDate: state.getEndDate(),
      addToSelectedDate: state.addToSelectedDate,
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
          <div className="flex items-center gap-5 rtl:flex-grow">
            <FormattedSelectedDateRange selectedDate={dayjs(startDate)} endDate={dayjs(endDate)} />
            <ButtonGroup>
              <Button
                className="group rtl:ml-1 rtl:rotate-180"
                variant="icon"
                color="minimal"
                StartIcon="chevron-left"
                aria-label="Previous Day"
                onClick={() => addToSelectedDate(-7)}
              />
              <Button
                className="group rtl:mr-1 rtl:rotate-180"
                variant="icon"
                color="minimal"
                StartIcon="chevron-right"
                aria-label="Next Day"
                onClick={() => addToSelectedDate(7)}
              />
            </ButtonGroup>
          </div>
          <div className="flex items-center gap-2">
            <div className="lg:hidden [&_div]:mb-0">
              <HorizontalTabs tabs={tabs} />
            </div>
            <TimeFormatToggle />
          </div>
        </div>
        <div className="sticky top-0 h-full w-full overflow-clip [grid-area:main]">
          <BookingsCalendarView />
        </div>
      </main>
    </Shell>
  );
}

BookingCalendarPage.PageWrapper = PageWrapper;
