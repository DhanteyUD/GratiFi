import { useState } from "react";
import { FetchMyPosts } from "@/hooks/UseFetch";
import type { Post } from "@/types";
import PostCardSkeleton from "@/pages/screen/01_Home/components/PostCardSkeleton";
import PostFeed from "@/pages/screen/01_Home/components/PostFeed";
import helperService from "@/services/helper.service";
import Modal from "react-modal";

Modal.setAppElement("#root");

interface PostFeedProps {
  activeTab: string;
}

const ProfilePostFeed = ({ activeTab }: PostFeedProps) => {
  const { fetchingMyPosts, myPosts } = FetchMyPosts();
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

  const allPostMedia = myPosts.reduce((acc: string[], post: Post) => {
    if (post.media && post.media.length > 0) {
      acc.push(...post.media);
    }
    return acc;
  }, []);

  console.log(allPostMedia);

  return (
    <>
      <div>
        {fetchingMyPosts ? (
          <PostCardSkeleton />
        ) : activeTab === "Posts" ? (
          myPosts.map((post: Post) => (
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
        ) : activeTab === "Media" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-b border-gray-300 dark:border-gray-600">
            {allPostMedia.map((media: string) => {
              const isVideo = /\.(mp4|webm|ogg)$/i.test(media);

              if (isVideo) {
                return (
                  <video
                    key={media}
                    src={media}
                    controls
                    className="w-full h-[200px]"
                  />
                );
              }

              return (
                <img
                  key={media}
                  src={media}
                  alt="Post media"
                  className="w-full h-[200px] object-cover"
                  onClick={() => openLightbox(media)}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
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
