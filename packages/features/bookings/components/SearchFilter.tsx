import React, { useEffect } from "react";

import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { useDebounce } from "@calcom/lib/hooks/useDebounce";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Icon, InputField } from "@calcom/ui";

export const SearchFilter = ({ input, setInput }: { input: string; setInput: (value: string) => void }) => {
  const { setQuery, data: query, removeByKey } = useFilterQuery();
  const debouncedSearchInput = useDebounce(input, 600);
  const { t } = useLocale();
  useEffect(() => {
    if (debouncedSearchInput) {
      setQuery("search", debouncedSearchInput);
    } else {
      removeByKey("search");
    }
  }, [debouncedSearchInput]);

  return (
    <InputField
      placeholder={t("search")}
      addOnLeading={<Icon name="search" className="text-subtle h-4 w-4" />}
      type="search"
      value={input}
      className="w-48"
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
  );
};
