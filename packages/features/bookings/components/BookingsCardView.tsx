import { useAutoAnimate } from "@formkit/auto-animate/react";
import { WipeMyCalActionButton } from "WipeMyCal/components";
import { Fragment } from "react";
import { z } from "zod";

import dayjs from "@calcom/dayjs";
import type { filterQuerySchema } from "@calcom/features/bookings/lib/useFilterQuery";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { useParamsWithFallback } from "@calcom/lib/hooks/useParamsWithFallback";
import type { RouterOutputs } from "@calcom/trpc";
import { trpc } from "@calcom/trpc";
import { Alert, Button, EmptyScreen } from "@calcom/ui";
import BookingListItem from "@calcom/web/components/booking/BookingListItem";
import SkeletonLoader from "@calcom/web/components/booking/SkeletonLoader";
import { useInViewObserver } from "@calcom/web/lib/hooks/useInViewObserver";
import useMeQuery from "@calcom/web/lib/hooks/useMeQuery";
import { validStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

type BookingOutput = RouterOutputs["viewer"]["bookings"]["get"]["bookings"][0];
type BookingListingStatus = z.infer<NonNullable<typeof filterQuerySchema>>["status"];

type RecurringInfo = {
  recurringEventId: string | null;
  count: number;
  firstDate: Date | null;
  bookings: { [key: string]: Date[] };
};

const querySchema = z.object({
  status: z.enum(validStatuses),
});

const descriptionByStatus: Record<NonNullable<BookingListingStatus>, string> = {
  all: "all_bookings",
  upcoming: "upcoming_bookings",
  recurring: "recurring_bookings",
  past: "past_bookings",
  cancelled: "cancelled_bookings",
  unconfirmed: "unconfirmed_bookings",
};

export function BookingsCardView() {
  const { data: filterQuery } = useFilterQuery();
  const user = useMeQuery().data;
  const { t } = useLocale();
  const params = useParamsWithFallback();
  const { status } = params ? querySchema.parse(params) : { status: "upcoming" as const };
  const query = trpc.viewer.bookings.get.useInfiniteQuery(
    {
      limit: 10,
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

  // Animate page (tab) transitions to look smoothing
  const buttonInView = useInViewObserver(() => {
    if (!query.isFetching && query.hasNextPage && query.status === "success") {
      query.fetchNextPage();
    }
  });

  const isEmpty = !query.data?.pages[0]?.bookings.length;

  const shownBookings: Record<string, BookingOutput[]> = {};
  const filterBookings = (booking: BookingOutput) => {
    if (status === "recurring" || status == "unconfirmed" || status === "cancelled") {
      if (!booking.recurringEventId) {
        return true;
      }
      if (
        shownBookings[booking.recurringEventId] !== undefined &&
        shownBookings[booking.recurringEventId].length > 0
      ) {
        shownBookings[booking.recurringEventId].push(booking);
        return false;
      }
      shownBookings[booking.recurringEventId] = [booking];
    } else if (status === "upcoming") {
      return (
        dayjs(booking.startTime).tz(user?.timeZone).format("YYYY-MM-DD") !==
        dayjs().tz(user?.timeZone).format("YYYY-MM-DD")
      );
    }
    return true;
  };

  let recurringInfoToday: RecurringInfo | undefined;

  const bookingsToday =
    query.data?.pages.map((page) =>
      page.bookings.filter((booking: BookingOutput) => {
        recurringInfoToday = page.recurringInfo.find(
          (info) => info.recurringEventId === booking.recurringEventId
        );

        return (
          dayjs(booking.startTime).tz(user?.timeZone).format("YYYY-MM-DD") ===
          dayjs().tz(user?.timeZone).format("YYYY-MM-DD")
        );
      })
    )[0] || [];

  const [animationParentRef] = useAutoAnimate<HTMLDivElement>();

  return (
    <div className="flex w-full flex-col" ref={animationParentRef}>
      {query.status === "error" && (
        <Alert severity="error" title={t("something_went_wrong")} message={query.error.message} />
      )}
      {(query.status === "pending" || query.isPaused) && <SkeletonLoader />}
      {query.status === "success" && !isEmpty && (
        <>
          {!!bookingsToday.length && status === "upcoming" && (
            <div className="mb-6 pt-2 xl:pt-0">
              <WipeMyCalActionButton bookingStatus={status} bookingsEmpty={isEmpty} />
              <p className="text-subtle mb-2 text-xs font-medium uppercase leading-4">{t("today")}</p>
              <div className="border-subtle overflow-hidden rounded-md border">
                <table className="w-full max-w-full table-fixed">
                  <tbody className="bg-default divide-subtle divide-y" data-testid="today-bookings">
                    <Fragment>
                      {bookingsToday.map((booking: BookingOutput) => (
                        <BookingListItem
                          key={booking.id}
                          loggedInUser={{
                            userId: user?.id,
                            userTimeZone: user?.timeZone,
                            userTimeFormat: user?.timeFormat,
                            userEmail: user?.email,
                          }}
                          listingStatus={status}
                          recurringInfo={recurringInfoToday}
                          {...booking}
                        />
                      ))}
                    </Fragment>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <div className="pt-2 xl:pt-0">
            <div className="border-subtle overflow-hidden rounded-md border">
              <table data-testid={`${status}-bookings`} className="w-full max-w-full table-fixed">
                <tbody className="bg-default divide-subtle divide-y" data-testid="bookings">
                  {query.data.pages.map((page, index) => (
                    <Fragment key={index}>
                      {page.bookings.filter(filterBookings).map((booking: BookingOutput) => {
                        const recurringInfo = page.recurringInfo.find(
                          (info) => info.recurringEventId === booking.recurringEventId
                        );
                        return (
                          <BookingListItem
                            key={booking.id}
                            loggedInUser={{
                              userId: user?.id,
                              userTimeZone: user?.timeZone,
                              userTimeFormat: user?.timeFormat,
                              userEmail: user?.email,
                            }}
                            listingStatus={status}
                            recurringInfo={recurringInfo}
                            {...booking}
                          />
                        );
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-default p-4 text-center" ref={buttonInView.ref}>
              <Button
                color="minimal"
                loading={query.isFetchingNextPage}
                disabled={!query.hasNextPage}
                onClick={() => query.fetchNextPage()}>
                {query.hasNextPage ? t("load_more_results") : t("no_more_results")}
              </Button>
            </div>
          </div>
        </>
      )}
      {query.status === "success" && isEmpty && (
        <div className="flex items-center justify-center pt-2 xl:pt-0">
          <EmptyScreen
            Icon="calendar"
            headline={t("no_status_bookings_yet", { status: t(status).toLowerCase() })}
            description={t("no_status_bookings_yet_description", {
              status: t(status).toLowerCase(),
              description: t(descriptionByStatus[status]),
            })}
          />
        </div>
      )}
    </div>
  );
}
