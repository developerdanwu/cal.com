import { useAutoAnimate } from "@formkit/auto-animate/react";
import React, { useState } from "react";

import { PeopleFilter } from "@calcom/features/bookings/components/PeopleFilter";
import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { TeamsFilter } from "@calcom/features/filters/components/TeamsFilter";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button, Tooltip } from "@calcom/ui";
import type { ValidStatuses } from "@calcom/web/modules/bookings/lib/validStatuses";

import { DateRangeFilter } from "./DateRangeFilter";
import { EventTypeFilter } from "./EventTypeFilter";
import { SearchFilter } from "./SearchFilter";

export interface FiltersContainerProps {
  isFiltersVisible: boolean;
  status: ValidStatuses;
}

export function FiltersContainer({ isFiltersVisible, status }: FiltersContainerProps) {
  const [animationParentRef] = useAutoAnimate<HTMLDivElement>();
  const { removeAllQueryParams, data: query } = useFilterQuery();
  const [input, setInput] = useState(() => query.search || "");
  const [{ startDate, endDate }, setDateRange] = useState<{ startDate: Date; endDate: Date }>(() => {
    if (query?.dateRange) {
      const [startDate, endDate] = filter.dateRange;
      return {
        startDate,
        endDate,
      };
    }

    return {
      startDate: null,
      endDate: null,
    };
  });
  const { t } = useLocale();
  return (
    <div ref={animationParentRef}>
      {isFiltersVisible ? (
        <div className="no-scrollbar flex w-full space-x-2 overflow-x-scroll p-2 rtl:space-x-reverse">
          <SearchFilter input={input} setInput={setInput} />
          <PeopleFilter />
          <EventTypeFilter />
          <TeamsFilter />
          {status === "all" ? (
            <DateRangeFilter startDate={startDate} endDate={endDate} setDateRange={setDateRange} />
          ) : null}
          <Tooltip content={t("remove_filters")}>
            <Button
              color="secondary"
              type="button"
              onClick={() => {
                removeAllQueryParams();
                setInput("");
                setDateRange({ startDate: null, endDate: null });
              }}>
              {t("remove_filters")}
            </Button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
}
