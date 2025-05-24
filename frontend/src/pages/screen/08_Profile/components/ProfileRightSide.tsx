import SearchBar from "@/pages/screen/01_Home/components/SearchBar";
import Users from "@/pages/screen/01_Home/components/Users";
import NewsFeed from "@/pages/screen/01_Home/components/NewsFeed";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  showingSearchInput: boolean;
  toggleInput: () => void;
}

const ProfileRightSide = ({
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
    <Users title="You might like" searchTerm={searchTerm} show={3} />
    <NewsFeed searchTerm={searchTerm} show={2} />
  </div>
);

export default ProfileRightSide;
