import { useRef, useState } from "react";
import { Smile, Calendar, ImageIcon, Loader2, Clock } from "lucide-react";
import EmojiPicker from "./EmojiPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

type CreatePostProps = {
  onPost: (newPost: {
    text: string;
    image: string | null;
    createdAt: Date;
  }) => void;
  userAvatar: string;
  userType: "GratiFan" | "GratiStar";
};

export default function CreatePost({
  onPost,
  userAvatar,
  userType,
}: CreatePostProps) {
  const [text, setText] = useState("");
  const characterLimit = userType === "GratiFan" ? 280 : 25000;
  const warningThreshold = userType === "GratiFan" ? 250 : 24980;
  const overLimit = text.length > characterLimit;
  const nearLimit = text.length > warningThreshold;

  const [media, setMedia] = useState<File[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const allowed = files.slice(0, 4 - media.length);
    setMedia((prev) => [...prev, ...allowed]);
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    setText((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handlePost = async () => {
    setIsPosting(true);

    // Simulate API post delay
    setTimeout(() => {
      onPost({
        text,
        image: media.length ? URL.createObjectURL(media[0]) : null,
        createdAt: scheduledDate ?? new Date(),
      });

      setText("");
      setMedia([]);
      setScheduledDate(null);
      setIsPosting(false);
    }, 1500);
  };

  return (
    <div className="flex p-4 border-b border-gray-300 bg-white">
      <img
        src={userAvatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover mr-4"
      />

      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
          className={clsx(
            "w-full resize-none border-none outline-none text-main placeholder-gray-400 bg-transparent",
            overLimit ? "text-red-500" : ""
          )}
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />
        <div
          className={clsx(
            "text-right text-sm mt-1",
            overLimit
              ? "text-red-600"
              : nearLimit
              ? "text-orange-500"
              : "text-gray-500"
          )}
        >
          {text.length}/{characterLimit}
        </div>

        {/* Media Preview */}
        {media.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-3 border border-[red]">
            {media.map((file, idx) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith("video/");
              return (
                <div
                  key={idx}
                  className="relative w-full h-40 bg-black rounded-lg overflow-hidden"
                >
                  {isVideo ? (
                    <video
                      src={url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={url}
                      alt={`media-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {scheduledDate && (
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <Clock size={16} /> Scheduled for: {scheduledDate.toLocaleString()}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {/* Image */}
            {media.length < 4 && (
              <button onClick={() => fileInputRef.current?.click()}>
                <ImageIcon
                  size={20}
                  className="text-primary hover:text-main transition-colors duration-300 ease-in-out"
                />
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaChange}
              multiple
            />

            {/* Emoji */}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile
                size={20}
                className="text-primary hover:text-main transition-colors duration-300 ease-in-out"
              />
            </button>

            {/* Schedule date */}
            <div className="flex pt-1">
              <DatePicker
                selected={scheduledDate}
                onChange={(date) => setScheduledDate(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <button>
                    <Calendar
                      size={20}
                      className="text-primary hover:text-main transition-colors duration-300 ease-in-out"
                    />
                  </button>
                }
              />
            </div>
          </div>

          <button
            disabled={!text || overLimit || isPosting}
            onClick={handlePost}
            className={clsx(
              "bg-primary text-main font-semibold px-5 py-1.5 rounded-full transition",
              !text || overLimit || isPosting
                ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            {isPosting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Post"
            )}
          </button>
        </div>

        {showEmojiPicker && (
          <div className="mt-2 relative z-10">
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
    </div>
  );
}
