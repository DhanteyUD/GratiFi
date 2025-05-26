import { useState, useEffect } from "react";
import {
  MessageCircle,
  Repeat2,
  Heart,
  Bookmark,
  Share2,
  Dot,
} from "lucide-react";
import { UserTypeIcon, Tooltip } from "@/components";
import { UseAppContext } from "@/hooks/UseAppContext";
import { useNavigate } from "react-router-dom";
import PostOptionsDropdown from "./PostOptionsDropdown";
import UserFeedHoverCard from "./UserFeedHoverCard";
import gratifiIcon from "@/assets/image/gratifi-logo.png";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import Modal from "react-modal";
import moment from "moment";

Modal.setAppElement("#root");

type PostProps = {
  id: string;
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
  id,
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
  const navigate = useNavigate();
  const { userProfile } = UseAppContext();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const [hovering, setHovering] = useState(false);
  let hoverTimeout: ReturnType<typeof setTimeout>;

  const openLightbox = (imgUrl: string) => {
    setActiveImage(imgUrl);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setActiveImage(null);
  };

  const showHoverCard = () => {
    clearTimeout(hoverTimeout);
    setHovering(true);
  };

  const hideHoverCard = () => {
    hoverTimeout = setTimeout(() => setHovering(false), 200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById(`post-dropdown-${id}`);
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId === id) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownId, id]);

  return (
    <>
      <div
        onClick={() => navigate(`/${authorUsername.split("@")[0]}/${id}`)}
        className="p-4 border-b border-gray-300 dark:border-gray-600 hover:bg-primaryHover/50 dark:hover:bg-main/50 cursor-pointer transition-colors duration-300 ease-linear"
      >
        <div className="flex gap-3">
          <div
            className="relative"
            onMouseEnter={showHoverCard}
            onMouseLeave={hideHoverCard}
          >
            <img
              onClick={(e) => {
                e.stopPropagation();
                // handleViewProfile();
              }}
              src={authorImage || gratifiIcon}
              className="w-10 h-10 rounded-full"
              alt="Author"
            />
            {hovering && (
              <UserFeedHoverCard
                image={authorImage}
                name={authorName}
                username={authorUsername.split("@")[0]}
                userType={userType}
                status="Building the next big thing 🚀"
                followers={0}
                following={0}
              />
            )}
          </div>

          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between text-[12px] md:text-[14px]">
              <div className="flex items-center gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleViewProfile();
                  }}
                  className="relative"
                  onMouseEnter={showHoverCard}
                  onMouseLeave={hideHoverCard}
                >
                  <span className="flex items-center gap-1">
                    <span className="font-bold text-main dark:text-primary hover:underline">
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
                      {helperService.formatTimeWithMoment(timeStamp)}
                    </span>
                  </span>
                  <span className="flex md:hidden text-gray-500 dark:text-primary/50">
                    @{authorUsername.split("@")[0]}
                  </span>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleViewProfile();
                  }}
                  className={clsx(
                    "hidden md:flex rounded-full p-1",
                    helperService.getUserTypeBg(userType)
                  )}
                >
                  <UserTypeIcon userType={userType} size={8} />
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleViewProfile();
                  }}
                  className="flex text-gray-500 dark:text-primary/50 items-center"
                >
                  <span
                    className="hidden md:flex"
                    onMouseEnter={showHoverCard}
                    onMouseLeave={hideHoverCard}
                  >
                    @{authorUsername.split("@")[0]}
                  </span>
                  <span className="hidden md:flex">
                    <Dot size={15} />
                  </span>
                  <span className="relative group hidden md:flex">
                    {helperService.formatTimeWithMoment(timeStamp)}
                    <Tooltip
                      label={moment(timeStamp).format(
                        "h:mm A [・] MMMM DD, YYYY"
                      )}
                    />
                  </span>
                </span>
              </div>
              <PostOptionsDropdown
                postId={id}
                authorName={authorName}
                authorUsername={authorUsername}
                currentUserEmail={(userProfile as { email: string }).email}
                content={content}
                isOpen={openDropdownId === id}
                onToggle={() =>
                  setOpenDropdownId((prev) => (prev === id ? null : id))
                }
              />
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleComment();
                  }}
                  className="flex items-center gap-1 cursor-not-allowed text-gray-400"
                >
                  <MessageCircle size={16} /> {comments}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleRepost();
                  }}
                  className="flex items-center gap-1 cursor-not-allowed text-gray-400"
                >
                  <Repeat2 size={16} /> {reposts}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleLike();
                  }}
                  className="flex items-center gap-1 cursor-not-allowed text-gray-400"
                >
                  <Heart size={16} /> {likes}
                </button>
              </div>
              <div className="flex gap-3 justify-between items-center text-gray-500 text-sm max-w-md w-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleBookmark();
                  }}
                >
                  <Bookmark
                    size={16}
                    className="cursor-not-allowed text-gray-400"
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleShare();
                  }}
                >
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
}
