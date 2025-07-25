"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useBookFilters } from "../../hooks/use-book-filters";
import { PriceFilter } from "./price-filter";
import { TagsFilter } from "./tags-filter";

interface BookFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const BookFilter = ({ title, className, children }: BookFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      <div
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

export const BookFilters = () => {
  const [filters, setFilters] = useBookFilters();
  const hasAnyFilters = Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false;
    if (typeof value === "string") {
      return value !== "";
    }

    return value !== null;
  });

  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      tags: [],
    });
  };

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        {hasAnyFilters && (
          <button
            className="underline cursor-pointer"
            onClick={() => onClear()}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      <BookFilter title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value: string) => onChange("minPrice", value)}
          onMaxPriceChange={(value: string) => onChange("maxPrice", value)}
        />
      </BookFilter>
      <BookFilter title="Tags" className="border-b-0">
        <TagsFilter
          value={filters.tags}
          onChange={(value) => onChange("tags", value)}
        />
      </BookFilter>
    </div>
  );
};
