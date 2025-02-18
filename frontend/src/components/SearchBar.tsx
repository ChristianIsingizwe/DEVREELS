import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="rounded-[100px] flex px-3 py-3 text-[#E0E0E0] bg-[#1F1F1F] w-[300px]">
      <Search size={24} />
      <input
        type="search"
        className="outline-none ml-5 bg-transparent"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
