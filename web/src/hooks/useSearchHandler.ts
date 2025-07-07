import { useState } from "react";

interface UseSearchHandlerProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const useSearchHandler = ({
  value,
  onChange,
  onSearch,
}: UseSearchHandlerProps) => {
  
  const [internalValue, setInternalValue] = useState("");
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(currentValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return {
    currentValue,
    handleInputChange,
    handleKeyDown,
    handleSearch,
  };
};
