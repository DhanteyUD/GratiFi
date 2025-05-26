import { MoreHorizontal, Trash2, Share2, MailPlus } from "lucide-react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { configKeys } from "@/config";
import { FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "@/components";

type PostOptionsDropdownProps = {
  postId: string;
  authorName: string;
  authorUsername: string;
  currentUserEmail: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  onDelete?: () => void;
};

export default function PostOptionsDropdown({
  postId,
  authorName,
  authorUsername,
  currentUserEmail,
  content,
  isOpen,
  onToggle,
  onDelete,
}: PostOptionsDropdownProps) {
  const isAuthor = authorUsername === currentUserEmail;

  const handleShareToX = () => {
    const postUrl = `${configKeys.appURL}/${
      authorUsername.split("@")[0]
    }/${postId}`;
    const shareText = encodeURIComponent(
      `${content} - @${authorName} #GratiFi`
    );

    const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
      postUrl
    )}`;

    window.open(shareUrl, "_blank");
    onToggle();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    onToggle();
  };

  return (
    <div
      id={`post-dropdown-${postId}`}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onToggle}
        className="relative group text-gray-400 dark:text-primary/50"
      >
        <MoreHorizontal size={18} />

        <Tooltip label="More" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-44 w-auto rounded-md bg-white dark:bg-main shadow-[0_0_0px_#ab9ff2,_0_0_10px_#ab9ff2] ring-1 ring-black ring-opacity-5 z-50">
          <ul className="text-sm py-1">
            {isAuthor && (
              <li
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={16} /> Delete
              </li>
            )}
            {isAuthor && (
              <li
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primaryHover cursor-pointer"
                onClick={handleShareToX}
              >
                <Share2 size={16} />
                <span className="flex items-center gap-1">
                  Publish to <FaXTwitter />
                </span>
              </li>
            )}
            {!isAuthor && (
              <li
                className="flex items-center gap-[6px] px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primaryHover cursor-pointer"
                // onClick={handleFollow}
              >
                <HiMiniUserPlus size={18} />
                <div className="flex items-center gap-1">
                  Follow
                  <span className="font-calSans">
                    @{authorUsername.split("@")[0]}
                  </span>
                </div>
              </li>
            )}
            {!isAuthor && (
              <li
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-primaryHover cursor-pointer"
                // onClick={handleMessage}
              >
                <MailPlus size={16} />
                <div className="flex items-center gap-1">
                  Message
                  <span className="font-calSans">
                    @{authorUsername.split("@")[0]}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
