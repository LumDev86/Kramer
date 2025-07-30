import { FC, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { FilterState, PriceRangeId } from "../interfaces/product";
import { PRICE_RANGES_TAGS, SORT_OPTIONS } from "../constants/productFilters";

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

const useProductFilters = (
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

export const ProductFilters: FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  resultsCount,
}) => {
  const {
    isDropdownOpen,
    handlePriceRangeChange,
    handleSortChange,
    toggleDropdown,
  } = useProductFilters(filters, onFiltersChange);

  return (
    <section className="w-full bg-white font-outfit">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-gray-900">
          {resultsCount} resultado{resultsCount !== 1 ? "s" : ""}
        </h2>

        <article className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between min-w-[160px] px-4 py-2 bg-[#6EC3F61A]
            border border-[#6EC3F680] rounded-[5px] text-gray-700 hover:bg-[#6EC3F680] transition-colors"
          >
            <span>
              {SORT_OPTIONS.find((opt) => opt.id === filters.sortBy)?.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#6EC3F680]
            rounded-[5px] shadow-lg z-10"
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSortChange(option.id)}
                  className={`w-full px-4 py-2 text-left hover:bg-[#6EC3F680]
                  first:rounded-t-[5px] last:rounded-b-[5px] transition-colors ${
                    filters.sortBy === option.id
                      ? "bg-[#6EC3F680] text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </article>
      </header>

      <article className="flex gap-3 mb-2">
        {PRICE_RANGES_TAGS.map((range) => (
          <button
            key={range.id}
            onClick={() => handlePriceRangeChange(range.id)}
            className={`flex items-center gap-1 px-4 py-2 rounded-[5px] border transition-all border-[#6EC3F680] ${
              filters.priceRange === range.id
                ? "bg-[#b5defa]"
                : "bg-white hover:border-blue-300 hover:bg-[#6EC3F61A]"
            }`}
          >
            {filters.priceRange === range.id && <Check size={20} />}
            {range.label}
          </button>
        ))}
      </article>
    </section>
  );
};
