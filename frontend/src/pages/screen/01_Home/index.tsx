import { useEffect, useState } from "react";
import { Modal } from "@/components";
import { profiles } from "@/json";
import { CustomCreateProfileBtn, ScreenOverlay } from "@/components";
import { FetchUserProfile, FetchAllPosts } from "@/hooks/UseFetch";
import { UserTypeIcon } from "@/components";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import Tabs from "./components/Tabs";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";

type Post = {
  id: string;
  text: string;
  media: string[];
  audience: "everyone" | "communities" | string;
  scheduledAt: string | null;
  createdAt: string;
  isPublished: boolean;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
    picture: string;
    user_type: "GratiStar" | "GratiFan" | string;
    createdAt: string;
    updatedAt: string;
  };
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const { fetchingUserProfile, userProfile } = FetchUserProfile();
  const { fetchingAllPosts, allPosts } = FetchAllPosts();

  console.log({
    fetchingAllPosts,
    allPosts,
  });

  const [activeTab, setActiveTab] = useState("For you");

  useEffect(() => {
    if (!fetchingUserProfile && helperService.isEmptyObject(userProfile)) {
      setIsModalOpen(true);
    }
  }, [fetchingUserProfile, userProfile]);

  return (
    <>
      {fetchingUserProfile && (
        <ScreenOverlay message="we are fetching your profile" />
      )}
      <div className="flex h-[calc(100vh-120px)] overflow-hidden">
        {/* Left */}
        <div className="flex flex-col w-full md:w-[60%] h-full overflow-auto">
          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="bg-white/40 md:border-l md:border-r border-main-300">
            <CreatePost
              userAvatar={userProfile.picture}
              userType={userProfile?.user_type}
            />
            {allPosts.map((post: Post) => (
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
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:flex w-[40%] px-5">
          <p className="font-outfit">right</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select a Profile"
        className="slit-in-vertical !rounded-none"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              onClick={() => setSelectedProfile(profile.title)}
              className={clsx(
                "group relative w-full md:w-80 h-48 md:h-72 border border-b-[20px] border-main bg-white p-5 animated_cursor cursor-pointer flex flex-col justify-between transition-all duration-300 ease-in-out bg-to-top-main bg-[length:100%_0%] bg-bottom bg-no-repeat hover:bg-[length:100%_100%] hover:shadow-lg hover:shadow-black/50"
              )}
            >
              <div className="flex justify-between items-center">
                <profile.icon
                  className={clsx(
                    "text-main text-2xl transition-colors duration-500 group-hover:text-white",
                    profile.title === "GratiFan"
                      ? "group-hover:animate-spin"
                      : "group-hover:animate-bounce"
                  )}
                />
                <div className="relative">
                  <input
                    type="radio"
                    name="signup-type"
                    checked={selectedProfile === profile.title}
                    onChange={() => setSelectedProfile(profile.title)}
                    className={clsx(
                      "appearance-none w-7 h-7 border border-gray-300 rounded-full transition-colors duration-300 checked:bg-white checked:border-main"
                    )}
                  />
                  <div
                    className={clsx(
                      "absolute w-5 h-5 inset-0 m-1 rounded-full bg-secondary transition-all duration-300",
                      selectedProfile === profile.title
                        ? "scale-100"
                        : "scale-0"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-main transition-colors duration-300 group-hover:text-white text-lg">
                  {profile.title}
                </h3>
                <p className="text-main/70 transition-colors duration-300 group-hover:text-white text-sm">
                  {profile.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-5 items-center mt-4 justify-end h-[40px]">
          <button
            className="px-5 bg-compulsory/80 text-white font-calSans h-full transition-all duration-300 ease-in-out"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <CustomCreateProfileBtn
            disabled={!selectedProfile}
            selectedProfile={selectedProfile ?? undefined}
            className={clsx(
              "flex justify-center items-center gap-2 font-calSans font-medium text-main transition-all duration-300 h-full text-sm w-[220px] md:text-base",
              selectedProfile
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            )}
            setIsModalOpen={setIsModalOpen}
          >
            {selectedProfile ? `Continue as ${selectedProfile}` : "Select"}
            {selectedProfile && (
              <UserTypeIcon userType={selectedProfile} size={18} />
            )}
          </CustomCreateProfileBtn>
        </div>
      </Modal>
    </>
  );
}

export default Home;
