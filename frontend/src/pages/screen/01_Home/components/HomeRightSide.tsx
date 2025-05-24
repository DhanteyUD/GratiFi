import SearchBar from "./SearchBar";
import SubscribePremium from "./SubscribePremium";
import NewsFeed from "@/pages/screen/01_Home/components/NewsFeed";
import Users from "@/pages/screen/01_Home/components/Users";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  showingSearchInput: boolean;
  toggleInput: () => void;
}

const HomeRightSide = ({
  searchTerm,
  setSearchTerm,
  showingSearchInput,
  toggleInput,
}: Props) => (
  <div className="hidden md:flex w-[40%] flex-col gap-4 overflow-auto pl-5 pr-1 mt-[45px]">
    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      showingSearchInput={showingSearchInput}
      toggleInput={toggleInput}
    />
    <SubscribePremium />
    <NewsFeed searchTerm={searchTerm} />
    <Users />
  </div>
);

export default HomeRightSide;
