import React, { useEffect, useState } from "react";

import { useFilterQuery } from "@calcom/features/bookings/lib/useFilterQuery";
import { useDebounce } from "@calcom/lib/hooks/useDebounce";
import { Icon, InputField } from "@calcom/ui";

export const SearchFilter = () => {
  const { setQuery, data: query, removeByKey } = useFilterQuery();
  const [input, setInput] = useState("");
  const debouncedSearchInput = useDebounce(input, 600);

  useEffect(() => {
    if (debouncedSearchInput) {
      setQuery("search", debouncedSearchInput);
    } else {
      removeByKey("search");
    }
  }, [debouncedSearchInput]);

  return (
    <InputField
      addOnLeading={<Icon name="search" className="text-subtle h-4 w-4" />}
      defaultValue={query?.search}
      type="search"
      className="w-48"
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
  );
};
