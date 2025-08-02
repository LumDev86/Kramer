import { useState } from "react";
import { FilterState, PriceRangeId } from "../interfaces/product";

export const useProductFilters = (
  filters: FilterState,
  onFiltersChange: (filters: FilterState) => void
) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePriceRangeChange = (rangeId: PriceRangeId) => {
    const newPriceRange = filters.priceRange === rangeId ? null : rangeId;
    onFiltersChange({
      ...filters,
      priceRange: newPriceRange,
    });
  };

  const handleSortChange = (sortId: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortId,
    });
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    handlePriceRangeChange,
    handleSortChange,
    toggleDropdown,
  };
};
