import { useRef, useState } from "react";
import {
  Smile,
  Calendar,
  ImageIcon,
  Loader2,
  Clock,
  ChevronDown,
} from "lucide-react";
import { audienceOptions } from "@/json";
import EmojiPicker from "./EmojiPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

type CreatePostProps = {
  onPost: (newPost: {
    text: string;
    image: string | null;
    createdAt: Date;
    audience: string;
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
  const overLimit = text.length > characterLimit;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [media, setMedia] = useState<File[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const [selectedAudience, setSelectedAudience] = useState(audienceOptions[0]);
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);

  const getFormattedText = () => {
    const allowed = text.slice(0, characterLimit);
    const excess = text.slice(characterLimit);

    return (
      <>
        <span className="text-black whitespace-pre-wrap">{allowed}</span>
        {excess && (
          <span className="bg-compulsory/50 whitespace-pre-wrap">{excess}</span>
        )}
      </>
    );
  };

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

    setTimeout(() => {
      onPost({
        text,
        image: media.length ? URL.createObjectURL(media[0]) : null,
        createdAt: scheduledDate ?? new Date(),
        audience: selectedAudience.value,
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
        {/* Audience Dropdown */}
        <div className="relative mb-5">
          <button
            onClick={() => setShowAudienceMenu((prev) => !prev)}
            className="flex items-center gap-1 text-sm text-primary font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            {selectedAudience.label}
            <ChevronDown size={16} />
          </button>

          {showAudienceMenu && (
            <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 w-48 py-2 text-main">
              <ul className="text-sm">
                {audienceOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        setSelectedAudience(option);
                        setShowAudienceMenu(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      <option.icon size={20} />
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Textarea Overlay */}
        <div className="relative w-full overflow-auto border-b border-gray-300">
          <div
            className="absolute top-0 left-0 w-full text-base font-normal break-words whitespace-pre-wrap z-0"
            aria-hidden="true"
            style={{
              minHeight: "3.5rem",
              pointerEvents: "none",
            }}
          >
            {getFormattedText()}
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="relative z-[1] text-base w-full resize-none outline-none text-main placeholder-gray-400 bg-transparent"
            style={{
              lineHeight: "1.5",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
            rows={1}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </div>

        <div
          className={clsx(
            "text-right text-sm mt-1",
            overLimit ? "text-red-600" : "text-gray-500"
          )}
        >
          {text.length}/{characterLimit}
        </div>

        {/* Media Preview */}
        {media.length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-3">
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

        {/* Image, Emoji, and Scheduled data actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {/* Image Upload */}
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

            {/* Emoji Picker */}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile
                size={20}
                className="text-primary hover:text-main transition-colors duration-300 ease-in-out"
              />
            </button>

            {/* Date Picker */}
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
