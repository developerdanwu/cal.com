import { useEffect } from "react";

import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { DateRangePicker } from "@calcom/ui";

export const DateRangeFilter = ({ startDate, endDate, setDateRange }) => {
  const { setQuery, removeByKey } = useFilterQuery();

  useEffect(() => {
    if (startDate && endDate) {
      setQuery("dateRange", [startDate, endDate]);
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
