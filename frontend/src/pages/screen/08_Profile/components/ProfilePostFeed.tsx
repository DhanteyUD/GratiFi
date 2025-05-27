import { useState, useMemo } from "react";
import { FetchPostsByUserId } from "@/hooks/UseFetch";
import type { Post, User } from "@/types";
import Users from "@/pages/screen/01_Home/components/Users";
import PostCardSkeleton from "@/pages/screen/01_Home/components/Posts/PostCardSkeleton";
import PostFeed from "@/pages/screen/01_Home/components/Posts/PostFeed";
import helperService from "@/services/helper.service";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface PostFeedProps {
  activeTab: string;
  loading: boolean;
  data: User;
}

const ProfilePostFeed = ({ activeTab, loading, data }: PostFeedProps) => {
  const { fetchingPostsByUser, postsByUser } = FetchPostsByUserId(data.id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openLightbox = (imgUrl: string) => {
    setActiveImage(imgUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
  };

  const allPostMedia = useMemo(() => {
    return postsByUser.flatMap((post: Post) => post.media || []);
  }, [postsByUser]);

  const renderPostFeed = () =>
    postsByUser.map((post: Post) => (
      <PostFeed
        key={post.id}
        id={post.id}
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
    ));

  const renderMediaGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-b border-gray-300 dark:border-gray-600">
      {allPostMedia.map((media: string) => {
        const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

        return isVideo ? (
          <video
            key={media}
            src={media}
            controls
            className="w-full h-[200px]"
          />
        ) : (
          <img
            key={media}
            src={media}
            alt="Post media"
            className="w-full h-[200px] object-cover cursor-pointer"
            onClick={() => openLightbox(media)}
          />
        );
      })}
    </div>
  );

  const renderNoData = () => (
    <div className="min-h-[200px] flex flex-col justify-center items-center text-gray-500 py-6 border-b border-gray-300 dark:border-gray-600">
      {activeTab === "Posts" && (
        <Users title="Who to follow" show={3} flatten minify={false} />
      )}
      {activeTab === "Replies" && (
        <Users title="Who to follow" show={3} flatten minify={false} />
      )}
      {activeTab === "Media" && (
        <div>
          <h1 className="text-[40px] font-calSans text-main dark:text-gray-400">
            Strike a pose... or drop a video!
          </h1>
          <p className="text-gray-500">
            When you post photos or videos, they will show up here.
          </p>
        </div>
      )}
      {activeTab === "Likes" && (
        <div>
          <h1 className="text-[40px] font-calSans text-main dark:text-gray-400">
            You don’t have any likes yet
          </h1>
          <p className="text-gray-500">
            Tap the heart on any post to show it some love. When you do, it’ll
            show up here.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div>
        {loading || fetchingPostsByUser ? (
          <PostCardSkeleton />
        ) : activeTab === "Posts" ? (
          postsByUser.length > 0 ? (
            renderPostFeed()
          ) : (
            renderNoData()
          )
        ) : activeTab === "Replies" ? (
          renderNoData()
        ) : activeTab === "Media" ? (
          allPostMedia.length > 0 ? (
            renderMediaGrid()
          ) : (
            renderNoData()
          )
        ) : activeTab === "Likes" ? (
          renderNoData()
        ) : null}
      </div>

      <Modal
        isOpen={lightboxOpen}
        onRequestClose={closeLightbox}
        className="fixed inset-0 flex items-center justify-center p-4 outline-none"
        overlayClassName="fixed inset-0 bg-main bg-opacity-75 z-[5]"
      >
        {activeImage && (
          <img
            alt="Preview"
            src={activeImage}
            onClick={closeLightbox}
            className="max-w-full max-h-full rounded-xl"
          />
        )}
      </Modal>
    </>
  );
};

export default ProfilePostFeed;
