import { Search } from "lucide-react";
import { useSearchHandler } from "../hooks/useSearchHandler";

interface SearchInputProps {
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const SearchInput = ({
  placeholder,
  value,
  onChange,
  onSearch,
}: SearchInputProps) => {

  const {
    currentValue,
    handleInputChange,
    handleKeyDown,
    handleSearch,
  } = useSearchHandler({ value, onChange, onSearch });

  return (
    <div className="relative flex justify-between">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[56px] border-4 rounded-[28px] placeholder:text-[#242424] 
        border-[#E8E8E8] text-lg outline-none pl-5"
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleSearch}
        aria-label="Buscador">
        <Search size={18} />
      </button>
    </div>
  );
};
