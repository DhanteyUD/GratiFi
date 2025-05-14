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

export default function PostCard({
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
  return (
    <div className="p-4 border-b border-gray-300">
      <div className="flex gap-3">
        <img
          src={authorImage || gratifiIcon}
          className="w-10 h-10 rounded-full"
          alt="Author image"
        />
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2 w-auto">
              <span className="font-bold text-main">{authorName}</span>
              <span
                className={clsx(
                  "rounded-full p-1",
                  userType === "GratiStar" ? "bg-secondary" : "bg-primary"
                )}
              >
                <UserTypeIcon userType={userType} size={8} />
              </span>
              <span className="text-gray-500 flex items-center">
                @{authorUsername} <Dot size={15} /> {timeStamp}
              </span>
            </div>
            <button>
              <MoreHorizontal size={18} />
            </button>
          </div>

          <p className="text-sm mt-1 mb-2 text-main">{content}</p>

          <div className="rounded-[20px] overflow-hidden">
            {media.length > 0 && (
              <div
                className={clsx(
                  "mt-2 grid gap-1 rounded-[20px] overflow-hidden",
                  media.length === 1 && "grid-cols-1",
                  media.length === 2 && "grid-cols-2",
                  media.length === 3 && "grid-cols-3 grid-rows-2",
                  media.length >= 4 && "grid-cols-2 grid-rows-2"
                )}
                style={
                  media.length === 3
                    ? {
                        gridTemplateAreas: `"a b" "a c"`,
                      }
                    : undefined
                }
              >
                {media.map((m, idx) => (
                  <img
                    key={idx}
                    src={m}
                    alt={`media-${idx}`}
                    className={clsx(
                      "object-cover w-full",
                      media.length > 2 && "h-40",
                      media.length === 3 &&
                        (idx === 0
                          ? "col-span-1 row-span-2"
                          : "row-span-1 col-span-1")
                    )}
                    style={
                      media.length === 3
                        ? {
                            gridArea: idx === 0 ? "a" : idx === 1 ? "b" : "c",
                          }
                        : {}
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between text-gray-500 text-sm mt-3 max-w-md">
            <button className="flex items-center gap-1">
              <MessageCircle size={16} /> {comments}
            </button>
            <button className="flex items-center gap-1">
              <Repeat2 size={16} /> {reposts}
            </button>
            <button className="flex items-center gap-1">
              <Heart size={16} /> {likes}
            </button>
            <button>
              <Bookmark size={16} />
            </button>
            <button>
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
