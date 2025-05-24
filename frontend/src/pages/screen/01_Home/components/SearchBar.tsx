import { Search } from "lucide-react";
import { Tooltip } from "@/components";
import clsx from "clsx";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  showingSearchInput: boolean;
  toggleInput: () => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  showingSearchInput,
  toggleInput,
}: SearchBarProps) => (
  <div
    className={clsx(
      "sticky top-0 flex justify-end z-[2]",
      showingSearchInput &&
        "w-full bg-background dark:bg-backgroundDark rounded-[0_0_25px_25px]"
    )}
  >
    <div
      className={clsx(
        "relative group",
        !showingSearchInput &&
          "bg-background dark:bg-backgroundDark rounded-[25px_0_25px_25px]"
      )}
    >
      <Search
        onClick={toggleInput}
        className={clsx(
          "w-10 h-10 p-[10px] cursor-pointer animated_cursor dark:text-primary bg-white dark:bg-main/50 hover:bg-primary transition-all duration-300 ease-in-out border border-primary dark:border-main",
          showingSearchInput
            ? "rounded-full md:border-r-0 md:rounded-[50px_0_0_50px]"
            : "rounded-full"
        )}
      />
      <Tooltip
        label="Search"
        className={`${!showingSearchInput && "left-[10px]"}`}
      />
    </div>
    <input
      type="search"
      className={clsx(
        "w-full outline-none border text-main dark:text-gray-300 border-primary dark:border-main dark:bg-main/50 pl-2 pr-3 transition-all duration-300 ease-in-out",
        showingSearchInput
          ? "hidden md:flex border-l-0 rounded-[0_50px_50px_0]"
          : "hidden"
      )}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

export default SearchBar;
