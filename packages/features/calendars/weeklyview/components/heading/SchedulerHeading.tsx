import type { Dayjs } from "@calcom/dayjs";
import dayjs from "@calcom/dayjs";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Button, ButtonGroup } from "@calcom/ui";

import { useCalendarStore } from "../../state/store";

export const FormattedSelectedDateRange = ({
  selectedDate,
  endDate,
}: {
  selectedDate: Dayjs;
  endDate: Dayjs;
}) => {
  const { i18n } = useLocale();
  const isSameMonth = () => {
    return selectedDate.format("MMM") === endDate.format("MMM");
  };

  const isSameYear = () => {
    return selectedDate.format("YYYY") === endDate.format("YYYY");
  };
  const formattedMonth = new Intl.DateTimeFormat(i18n.language ?? "en", { month: "short" });

  return (
    <h3 className="min-w-[150px] text-base font-semibold leading-4">
      {formattedMonth.format(selectedDate.toDate())} {selectedDate.format("D")}
      {!isSameYear() && <span className="text-subtle">, {selectedDate.format("YYYY")} </span>}-{" "}
      {!isSameMonth() && formattedMonth.format(endDate.toDate())} {endDate.format("D")},{" "}
      <span className="text-subtle">
        {isSameYear() ? selectedDate.format("YYYY") : endDate.format("YYYY")}
      </span>
    </h3>
  );
};

export function SchedulerHeading() {
  const { startDate, endDate, handleDateChange } = useCalendarStore((state) => ({
    startDate: dayjs(state.startDate),
    endDate: dayjs(state.endDate),
    handleDateChange: state.handleDateChange,
  }));

  return (
    <header className="flex flex-none flex-col justify-between py-4 sm:flex-row sm:items-center">
      <FormattedSelectedDateRange selectedDate={startDate} endDate={endDate} />
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* TODO: Renable when we have daily/mobile support */}
        {/* <ToggleGroup
          options={[
            { label: "Daily", value: "day", disabled: false },
            { label: "Weekly", value: "week", disabled: isSm },
          ]}
          defaultValue={view === "day" ? "day" : "week"}
        /> */}

        <ButtonGroup combined>
          {/* TODO: i18n label with correct view */}
          <Button
            StartIcon="chevron-left"
            variant="icon"
            color="secondary"
            aria-label="Previous Week"
            onClick={() => {
              handleDateChange("DECREMENT");
            }}
          />
          <Button
            StartIcon="chevron-right"
            variant="icon"
            color="secondary"
            aria-label="Next Week"
            onClick={() => {
              handleDateChange("INCREMENT");
            }}
          />
        </ButtonGroup>
      </div>
    </header>
  );
}
