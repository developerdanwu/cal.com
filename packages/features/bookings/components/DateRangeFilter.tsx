import { useEffect } from "react";

import dayjs from "@calcom/dayjs";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { DateRangePicker } from "@calcom/ui";

export const DateRangeFilter = ({
  startDate,
  endDate,
  setDateRange,
}: {
  startDate: Date;
  endDate?: Date;
  setDateRange: (dateRange: { startDate: Date | undefined; endDate: Date | undefined }) => void;
}) => {
  const { setQuery, removeByKey } = useFilterQuery();

  useEffect(() => {
    if (startDate && endDate) {
      setQuery(
        "dateRange",
        `${dayjs(startDate).format("YYYY-MM-DD")},${dayjs(endDate).format("YYYY-MM-DD")}`
      );
    } else {
      removeByKey("dateRange");
    }
  }, [startDate, endDate]);

  return (
    <div className="custom-date max-w-96 w-full sm:w-auto">
      <DateRangePicker
        dates={{ startDate, endDate }}
        onDatesChange={({ startDate, endDate }) => {
          setDateRange({ startDate, endDate });
        }}
      />
    </div>
  );
};
