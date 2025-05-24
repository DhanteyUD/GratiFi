import { useState } from "react";
import { FetchUserProfile, FetchAllPosts } from "@/hooks/UseFetch";
import type { Post } from "@/types";
import helperService from "@/services/helper.service";
import Tabs from "./components/Tabs";
import CreatePost from "./components/CreatePost";
import PostFeed from "./components/PostFeed";
import PostCardSkeleton from "./components/PostCardSkeleton";
import HomeRightSide from "./components/HomeRightSide";

function Home() {
  const [activeTab, setActiveTab] = useState("For you");
  const { userProfile } = FetchUserProfile();
  const { fetchingAllPosts, allPosts } = FetchAllPosts();

  const [searchTerm, setSearchTerm] = useState("");
  const [showingSearchInput, setShowingSearchInput] = useState(false);
  const toggleInput = () => setShowingSearchInput(!showingSearchInput);

  return (
    <div className="flex h-full md:h-[calc(100vh-115px)] overflow-hidden">
      {/* LEFT COLUMN */}
      <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="bg-white/60 dark:bg-dark2 md:border-l md:border-r border-gray-300 dark:border-gray-600">
          <CreatePost
            userAvatar={userProfile.picture}
            userType={userProfile?.user_type}
          />
          {fetchingAllPosts ? (
            <PostCardSkeleton />
          ) : (
            allPosts.map((post: Post) => (
              <PostFeed
                key={post.id}
                authorImage={post.author.picture}
                authorName={post.author.name}
                authorUsername={post.author.email.split("@")[0]}
                userType={post.author.user_type}
                timeStamp={helperService.formatTimeWithMoment(post.createdAt)}
                content={post.text}
                media={post.media}
                comments={0}
                reposts={0}
                likes={0}
              />
            ))
          )}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <HomeRightSide
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showingSearchInput={showingSearchInput}
        toggleInput={toggleInput}
      />
    </div>
  );
}

export default Home;
