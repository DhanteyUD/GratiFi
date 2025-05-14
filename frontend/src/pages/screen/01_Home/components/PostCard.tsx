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
                  helperService.getUserTypeBg(userType)
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
                  media.length === 2 && "grid-cols-2 h-[400px]",
                  media.length === 3 && "grid-cols-2 grid-rows-2",
                  media.length >= 4 && "grid-cols-2 grid-rows-2"
                )}
                style={{
                  ...(media.length === 3 && {
                    gridTemplateAreas: `"media1 media2" "media1 media3"`,
                  }),
                  ...(media.length > 2 && {
                    maxHeight: "300px",
                  }),
                }}
              >
                {media.map((m, idx) => {
                  let gridArea = undefined;

                  if (media.length === 3) {
                    if (idx === 0) gridArea = "media1";
                    if (idx === 1) gridArea = "media2";
                    if (idx === 2) gridArea = "media3";
                  }

                  return (
                    <img
                      key={idx}
                      src={m}
                      alt={`media-${idx}`}
                      className={clsx(
                        "object-cover w-full h-full",
                        media.length === 1 && "rounded-2xl aspect-square",
                        media.length === 2 && "aspect-video",
                        media.length > 2 && "rounded-none"
                      )}
                      style={gridArea ? { gridArea } : {}}
                    />
                  );
                })}
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
