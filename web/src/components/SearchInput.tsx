import { Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";

interface SearchProps {
  placeholder: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

export const SearchInput = ({
  placeholder,
  search,
  setSearch
}: SearchProps) => {
  return (
    <div className="relative flex justify-between">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-5 py-4 pr-20 border-4 rounded-2xl placeholder:text-[#1D1D1F] 
        text-[#1D1D1F] border-[#E8E8E8] outline-none text-lg font-[400] outline outline-1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 
        rounded-md inline-flex">
        <Search size={32} color="#242424" />
      </div>
    </div>
  );
};
 