import { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "./components/Tabs";
import PostFeed from "./components/ProfilePostFeed";
import ProfileRightSide from "./components/ProfileRightSide";

function Profile() {
  const [activeTab, setActiveTab] = useState("Posts");

  const [searchTerm, setSearchTerm] = useState("");
  const [showingSearchInput, setShowingSearchInput] = useState(false);
  const toggleInput = () => setShowingSearchInput(!showingSearchInput);

  return (
    <div className="flex h-full md:h-[calc(100vh-115px)] overflow-hidden">
      {/* LEFT COLUMN */}
      <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto">
        <div className="bg-white/60 dark:bg-dark2 md:border-l md:border-r border-gray-300 dark:border-gray-600">
          <ProfileHeader />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <PostFeed activeTab={activeTab} />
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <ProfileRightSide
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showingSearchInput={showingSearchInput}
        toggleInput={toggleInput}
      />
    </div>
  );
}

export default Profile;
