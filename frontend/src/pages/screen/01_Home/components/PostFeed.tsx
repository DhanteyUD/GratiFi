import { useState } from "react";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share2,
  MoreHorizontal,
  Dot,
} from "lucide-react";
import { UserTypeIcon } from "@/components";
import gratifiIcon from "@/assets/image/gratifi-logo.png";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import Modal from "react-modal";

Modal.setAppElement("#root");

type PostProps = {
  authorImage: string;
  authorName: string;
  authorUsername: string;
  userType: string;
  timeStamp: string;
  content: string;
  media: string[];
  comments: number;
  reposts: number;
  likes: number;
};

export default function PostFeed({
  authorImage,
  authorName,
  authorUsername,
  userType,
  timeStamp,
  content,
  media,
  comments,
  reposts,
  likes,
}: PostProps) {
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

  return (
    <>
      <div className="p-4 border-b border-gray-300 dark:border-gray-600 hover:bg-primaryHover/50 dark:hover:bg-main/50 cursor-pointer transition-colors duration-300 ease-linear">
        <div className="flex gap-3">
          <img
            src={authorImage || gratifiIcon}
            className="w-10 h-10 rounded-full"
            alt="Author image"
          />
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between text-[12px] md:text-[14px]">
              <div className="flex items-center gap-2">
                <span>
                  <span className="flex items-center gap-1">
                    <span className=" font-bold text-main dark:text-primary">
                      {authorName}
                    </span>
                    <span
                      className={clsx(
                        "flex md:hidden ml-1 rounded-full p-1",
                        helperService.getUserTypeBg(userType)
                      )}
                    >
                      <UserTypeIcon userType={userType} size={8} />
                    </span>
                    <span className="flex md:hidden text-gray-500 dark:text-primary/50">
                      <Dot size={15} />
                    </span>
                    <span className="flex md:hidden text-gray-500 dark:text-primary/50 text-[11px]">
                      {timeStamp}
                    </span>
                  </span>
                  <span className="flex md:hidden text-gray-500 dark:text-primary/50">
                    @{authorUsername}
                  </span>
                </span>
                <span
                  className={clsx(
                    "hidden md:flex rounded-full p-1",
                    helperService.getUserTypeBg(userType)
                  )}
                >
                  <UserTypeIcon userType={userType} size={8} />
                </span>
                <span className="flex text-gray-500 dark:text-primary/50 items-center">
                  <span className="hidden md:flex">@{authorUsername}</span>
                  <span className="hidden md:flex">
                    <Dot size={15} />
                  </span>
                  <span className="hidden md:flex">{timeStamp}</span>
                </span>
              </div>
              <button className="cursor-not-allowed text-gray-400 dark:text-primary/50">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Content */}
            <p className="text-[12px] md:text-sm mt-5 md:mt-3 mb-2 text-main dark:text-gray-400">
              {content}
            </p>

            {/* Media Grid */}
            {media.length > 0 && (
              <div className="rounded-[20px] overflow-hidden">
                <div
                  className={clsx(
                    "mt-2 grid gap-[2px] rounded-[20px] overflow-hidden",
                    media.length === 1 && "grid-cols-1",
                    media.length === 2 && "grid-cols-2 h-[200px] md:h-[350px]",
                    media.length === 3 && "grid-cols-2 grid-rows-2",
                    media.length >= 4 && "grid-cols-2 grid-rows-2"
                  )}
                  style={{
                    ...(media.length === 3 && {
                      gridTemplateAreas: `"media1 media2" "media1 media3"`,
                    }),
                    ...(media.length > 2 && { maxHeight: "300px" }),
                  }}
                >
                  {media.map((m, idx) => {
                    const isVideo = /\.(mp4|webm|ogg)$/i.test(m);

                    let gridArea: string | undefined;

                    if (media.length === 3) {
                      gridArea = ["media1", "media2", "media3"][idx];
                    }

                    // Video: inline, no lightbox
                    if (isVideo) {
                      return (
                        <video
                          key={idx}
                          src={m}
                          controls
                          className={clsx(
                            "w-full h-full object-cover",
                            media.length === 1 && "rounded-2xl aspect-video",
                            media.length === 2 && "aspect-video",
                            media.length > 2 && "rounded-none"
                          )}
                          style={gridArea ? { gridArea } : undefined}
                        />
                      );
                    }

                    // Image: click to open lightbox
                    return (
                      <div
                        key={idx}
                        className={clsx(
                          "relative cursor-pointer w-full h-full",
                          media.length === 1 && "aspect-square",
                          media.length === 2 && "aspect-video",
                          media.length > 2 && "h-full"
                        )}
                        style={gridArea ? { gridArea } : undefined}
                        onClick={() => openLightbox(m)}
                      >
                        <img
                          src={m}
                          alt={`media-${idx}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between mt-3">
              <div className="flex justify-between items-center text-gray-500 text-sm max-w-md w-[50%]">
                <button className="flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <MessageCircle size={16} /> {comments}
                </button>
                <button className="flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <Repeat2 size={16} /> {reposts}
                </button>
                <button className="flex items-center gap-1 cursor-not-allowed text-gray-400">
                  <Heart size={16} /> {likes}
                </button>
              </div>
              <div className="flex gap-3 justify-between items-center text-gray-500 text-sm max-w-md w-auto">
                <button>
                  <Bookmark
                    size={16}
                    className="cursor-not-allowed text-gray-400"
                  />
                </button>
                <button>
                  <Share2
                    size={16}
                    className="cursor-not-allowed text-gray-400"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Images */}
      <Modal
        isOpen={lightboxOpen}
        onRequestClose={closeLightbox}
        className="fixed inset-0 flex items-center justify-center p-4 outline-none"
        overlayClassName="fixed inset-0 bg-main bg-opacity-75 z-[5]"
      >
        <button
          className="absolute top-4 left-4 md:right-4 text-white text-3xl"
          onClick={closeLightbox}
        >
          &times;
        </button>
        {activeImage && (
          <img
            src={activeImage}
            alt="Preview"
            className="max-w-full max-h-full rounded-xl"
          />
        )}
      </Modal>
    </>
  );
}
