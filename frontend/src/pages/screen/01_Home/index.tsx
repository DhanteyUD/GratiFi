import { useState } from "react";
import { FetchUserProfile, FetchAllPosts } from "@/hooks/UseFetch";
import { Search } from "lucide-react";
import { Tooltip } from "@/components";
import type { Post } from "@/types";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import Tabs from "./components/Tabs";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";
import SubscribePremium from "./components/SubscribePremium";
import NewsFeed from "./components/NewsFeed";
import User from "./components/Users";
import PostCardSkeleton from "./components/PostCardSkeleton";



function Home() {
  const [activeTab, setActiveTab] = useState("For you");
  const { userProfile } = FetchUserProfile();
  const { fetchingAllPosts, allPosts } = FetchAllPosts();

  const [searchTerm, setSearchTerm] = useState("");
  const [showingSearchInput, setShowingSearchInput] = useState(false);

  const handleShowSearchInput = () => {
    setShowingSearchInput(!showingSearchInput);
  };

  return (
    <div className="flex h-full md:h-[calc(100vh-115px)] overflow-hidden">
      {/* LEFT COLUMN */}
      <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="bg-white/60 md:border-l md:border-r border-gray-300">
          <CreatePost
            userAvatar={userProfile.picture}
            userType={userProfile?.user_type}
          />
          {fetchingAllPosts ? (
            <PostCardSkeleton />
          ) : (
            allPosts.map((post: Post) => (
              <PostCard
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
      <div className="hidden md:flex w-[40%] flex-col gap-4 overflow-auto pl-5 pr-1 mt-[35px]">
        <div
          className={clsx(
            "sticky top-0 flex justify-end z-[2]",
            showingSearchInput && "w-full bg-background rounded-[0_0_25px_25px]"
          )}
        >
          <div
            className={clsx(
              "relative group",
              !showingSearchInput && "bg-background rounded-[0_0_25px_0]"
            )}
          >
            <Search
              onClick={handleShowSearchInput}
              className={clsx(
                "w-10 h-10 p-[10px] cursor-pointer animated_cursor bg-white hover:bg-primary transition-all duration-300 ease-in-out border border-primary",
                showingSearchInput
                  ? "rounded-full md:border-r-0 md:rounded-[50px_0_0_50px] "
                  : "rounded-full "
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
              "w-full outline-none border text-main border-primary pl-2 pr-3 transition-all duration-300 ease-in-out",
              showingSearchInput
                ? "hidden md:flex border-l-0 rounded-[0_50px_50px_0]"
                : "hidden"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <SubscribePremium />
        <NewsFeed searchTerm={searchTerm} />
        <User />
      </div>
    </div>
  );
}

export default Home;
