import React, { useEffect, useRef, useState } from "react";
import { api } from "../../../services/axios";

type ValueType = string | number;

interface DropDownOptions {
  id: string | number;
  value?: string;
  title?: string;
  label?: string;
  [key: string]: unknown;
}

interface DropdownProps {
  options?: DropDownOptions[];
  apiUrl?: string;
  apiSearch?: boolean;
  labelKey: string;
  valueKey: string;
  searchKeys?: string[];
  placeholder?: string;
  multiple?: boolean;
  selectedValues: ValueType[];
  onChange: (values: ValueType[]) => void;
  pageSize?: number;
}

function Dropdown({
  options = [],
  apiUrl,
  apiSearch = false,
  labelKey,
  valueKey,
  searchKeys = [],
  placeholder = "Select...",
  multiple = false,
  selectedValues,
  pageSize = 10,
  onChange,
}: DropdownProps) {
  const isStatic = options.length > 0 && !apiUrl;
  console.log("apiUrl", apiUrl);

  const [items, setItems] = useState<any[]>(options);
  console.log("itemsitemsitemsitemsitemsitemsitemsitemsitems []", items);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ---------- STATIC OPTIONS ---------- */
  useEffect(() => {
    if (isStatic) setItems(options);
  }, [isStatic, options]);

  /* ---------- SEARCH DEBOUNCE ---------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  /* ---------- RESET ON SEARCH ---------- */
  useEffect(() => {
    if (!apiSearch) return;
    setPage(1);
    setHasNext(true);
    setItems([]);
  }, [debouncedSearch, apiSearch]);

  const fetchData = async (apiUrl: any) => {
    try {
      setIsLoading(true);
      const res = await api.get(apiUrl, {
        // params: {
        //   pageNumber: page,
        //   pageSize,
        //   // ...filterValue,
        //   ...(debouncedSearch ? { search: debouncedSearch } : {}),
        // },
      });

      const data = res.data;
      console.log("DDDDDDDDDDDDDDDDDD", data.result);
      let list: any[] = [];

      if (Array.isArray(data)) list = data;
      else if (Array.isArray(data?.data)) list = data.data;
      else if (Array.isArray(data?.results)) list = data.results;
      else if (Array.isArray(data.result.data)) list = data.result.data;

      setItems((prev) => (page === 1 ? list : [...prev, ...list]));
      setHasNext(list.length === pageSize);
    } catch (error) {
      setHasNext(false);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- API FETCH ---------- */
  useEffect(() => {
    if (!apiUrl || isLoading) return;
    console.log("dffdgSSSS");
    fetchData(apiUrl);
  }, [page, debouncedSearch, apiUrl, open, pageSize]);

  /* ---------- CLOSE ON OUTSIDE ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------- INFINITE SCROLL ---------- */
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 20 &&
      hasNext &&
      !isLoading
    ) {
      setPage((p) => p + 1);
    }
  };

  /* ---------- SELECT ---------- */
  const selectItem = (value: ValueType) => {
    if (multiple) onChange([...selectedValues, value]);
    else {
      onChange([value]);
      setOpen(false);
    }
    setSearch("");
  };

  const removeChip = (value: ValueType) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const displayItems = apiSearch
    ? items
    : items.filter((item) => {
        const keys = Array.from(new Set([labelKey, ...(searchKeys ?? [])]));
        return keys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
      });

  return (
    <div ref={ref} className="relative w-full">
      {/* INPUT */}
      <div
        onClick={() => setOpen(true)}
        className="
          min-h-[44px] w-full
          border border-slate-300
          rounded-xl
          px-3 py-2 pr-9
          flex flex-wrap gap-1.5 items-center
          bg-white cursor-text
          focus-within:ring-2 focus-within:ring-blue-500
        "
      >
        {/* MULTI SELECT CHIPS */}
        {multiple &&
          selectedValues.map((val) => {
            const item = items.find((i) => i[valueKey] === val);
            return (
              <span
                key={String(val)}
                className="bg-slate-100 px-2 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {String(item?.[labelKey])}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(val);
                  }}
                  className="cursor-pointer hover:text-red-600 font-semibold"
                >
                  ✕
                </span>
              </span>
            );
          })}

        {/* SINGLE SELECT TEXT */}
        {!multiple && selectedValues.length === 1 && search === "" && (
          <span className="text-sm text-slate-700">
            {String(
              items.find((i) => i[valueKey] === selectedValues[0])?.[labelKey],
            )}
          </span>
        )}

        {/* INPUT */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={selectedValues.length ? "" : placeholder}
          className="border-none outline-none flex-1 text-sm bg-transparent text-slate-700 placeholder-slate-400"
          onClick={() => setOpen(true)}
        />

        {/* CLEAR */}
        {selectedValues.length > 0 && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
              setSearch("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-red-600 font-semibold"
          >
            ✕
          </span>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          ref={dropdownRef}
          onScroll={handleScroll}
          className="
            absolute top-full mt-2 w-full
            max-h-56 overflow-y-auto
            border border-slate-200
            rounded-xl
            bg-white shadow-lg
            z-10
          "
        >
          {displayItems
            .filter(
              (item) => !selectedValues.includes(item[valueKey] as ValueType),
            )
            .map((item) => (
              <div
                key={String(item[valueKey])}
                onClick={() => selectItem(item[valueKey] as ValueType)}
                className="px-3 py-2.5 cursor-pointer hover:bg-slate-100 text-slate-800 transition-colors"
              >
                {String(item[labelKey])}
              </div>
            ))}

          {apiSearch && isLoading && (
            <div className="px-3 py-2.5 text-center text-slate-500">
              Loading...
            </div>
          )}

          {!isLoading && displayItems.length === 0 && (
            <div className="px-3 py-2.5 text-center text-slate-500">
              No data found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
