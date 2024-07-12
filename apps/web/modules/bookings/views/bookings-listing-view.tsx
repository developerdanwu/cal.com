"use client";

import { useState } from "react";
import { z } from "zod";

import BookingsCalendarView from "@calcom/features/bookings/components/BookingsCalendarView";
import { BookingsCardView } from "@calcom/features/bookings/components/BookingsCardView";
import { FilterToggle } from "@calcom/features/bookings/components/FilterToggle";
import { FiltersContainer } from "@calcom/features/bookings/components/FiltersContainer";
import { NewBookingButton } from "@calcom/features/bookings/components/NewBookingButton";
import { useBookingState } from "@calcom/features/bookings/lib/useBookingState";
import Shell from "@calcom/features/shell/Shell";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { useParamsWithFallback } from "@calcom/lib/hooks/useParamsWithFallback";
import type { HorizontalTabItemProps, VerticalTabItemProps } from "@calcom/ui";
import { HorizontalTabs, Icon, ToggleGroup } from "@calcom/ui";

import { validStatuses } from "~/bookings/lib/validStatuses";

export const BOOKINGS_VIEW = {
  week_view: "week_view",
  card_view: "card_view",
} as const;

export type BookingState = (typeof BOOKINGS_VIEW)[keyof typeof BOOKINGS_VIEW];

const tabs: (VerticalTabItemProps | HorizontalTabItemProps)[] = [
  {
    name: "all",
    href: "/bookings/all",
  },
  {
    name: "upcoming",
    href: "/bookings/upcoming",
  },
  {
    name: "unconfirmed",
    href: "/bookings/unconfirmed",
  },
  {
    name: "recurring",
    href: "/bookings/recurring",
  },
  {
    name: "past",
    href: "/bookings/past",
  },
  {
    name: "cancelled",
    href: "/bookings/cancelled",
  },
];

const querySchema = z.object({
  status: z.enum(validStatuses),
});

export default function Bookings() {
  const params = useParamsWithFallback();
  const { status } = params ? querySchema.parse(params) : { status: "upcoming" as const };
  const { t } = useLocale();
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const { data: bookingState, setQuery } = useBookingState();
  // const [bookingState, setBookingState] = useState<BookingState>(BOOKINGS_VIEW.card_view);
  const layout = bookingState?.layout ?? BOOKINGS_VIEW.card_view;
  return (
    <Shell
      withoutMain={false}
      hideHeadingOnMobile
      CTA={
        <div className="flex items-center gap-2">
          <ToggleGroup
            defaultValue={layout}
            onValueChange={(value) => {
              if (!value) {
                return;
              }
              // setBookingState(value);
              setQuery("layout", value);
            }}
            options={[
              {
                value: BOOKINGS_VIEW.card_view,
                label: <Icon name="rows-3" width="16" height="16" />,
                tooltip: t("switch_cards"),
              },
              {
                value: BOOKINGS_VIEW.week_view,
                label: <Icon name="grid-3x3" width="16" height="16" />,
                tooltip: t("switch_weekly"),
              },
            ]}
          />
          <NewBookingButton />
        </div>
      }
      heading={t("bookings")}
      subtitle={t("bookings_description")}
      title="Bookings"
      description="Create events to share for people to book on your calendar.">
      <div className="flex flex-col overflow-hidden">
        {layout === BOOKINGS_VIEW.card_view ? (
          <>
            <div className="flex flex-row flex-wrap justify-between">
              <HorizontalTabs tabs={tabs} linkScroll={false} />
              <FilterToggle setIsFiltersVisible={setIsFiltersVisible} />
            </div>
            <FiltersContainer status={status} isFiltersVisible={isFiltersVisible} />
            <main className="grid w-full grid-rows-1">
              <BookingsCardView />
            </main>
          </>
        ) : null}
        {layout === BOOKINGS_VIEW.week_view ? (
          <main className="grid w-full grid-rows-1">
            <BookingsCalendarView />
          </main>
        ) : null}
      </div>
    </Shell>
  );
}
