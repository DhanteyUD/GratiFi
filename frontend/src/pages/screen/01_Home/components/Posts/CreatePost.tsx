import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/hooks/UseCreatePost";
import {
  Smile,
  Calendar,
  ImageIcon,
  Loader2,
  Clock,
  ChevronDown,
  X,
} from "lucide-react";
import { audienceOptions } from "@/json";
import { showToastSuccess } from "@/utils/notification.utils";
import EmojiPicker from "./EmojiPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import moment from "moment";

type CreatePostProps = {
  userAvatar: string;
  userType: "GratiFan" | "GratiStar";
};

export default function CreatePost({ userAvatar, userType }: CreatePostProps) {
  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const characterLimit = userType === "GratiFan" ? 280 : 25000;
  const overLimit = text.length > characterLimit;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [media, setMedia] = useState<File[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [schedule, setSchedule] = useState<Date | null>(null);

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
  };

  const { isPending: creatingPost, mutate: createPostMutation } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-posts"] });
      showToastSuccess(data?.message, "bottom-center", 3000, true);

      setText("");
      setMedia([]);
      setSchedule(null);
    },
    onError: (error) => {
      console.error("Post submission failed:", error);
    },
  });

  const handlePost = async () => {
    if (overLimit || creatingPost || (!text && media.length === 0)) return;

    createPostMutation({
      audience: selectedAudience.value,
      text,
      media,
      schedule,
    });
  };

  return (
    <div className="flex px-2 py-4 md:px-4 md:py-4 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-dark/20">
      <img
        src={userAvatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover mr-4"
      />

      <div className="relative flex-1">
        {/* Audience Dropdown */}
        <div className="relative mb-5">
          <button
            onClick={() => setShowAudienceMenu((prev) => !prev)}
            className="flex items-center gap-1 text-[12px] md:text-[14px] text-primary font-medium px-3 py-1 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-main/50 transition"
          >
            {selectedAudience.label}
            <ChevronDown
              size={16}
              className={clsx(
                showAudienceMenu ? "-scale-y-[1] transition-all" : ""
              )}
            />
          </button>

          {showAudienceMenu && (
            <div className="absolute mt-1 bg-white dark:bg-dark3 border border-gray-200 dark:border-gray-600 rounded-md shadow-md z-10 w-48 py-2 text-main dark:text-primary">
              <ul className="text-[12px] md:text-[14px]">
                {audienceOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      onClick={() => {
                        setSelectedAudience(option);
                        setShowAudienceMenu(false);
                      }}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-main/50"
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
        <div className="relative w-full overflow-auto border-b border-gray-300 dark:border-gray-600">
          <div
            className="absolute top-0 left-0 w-full text-[13px] md:text-base font-normal break-words whitespace-pre-wrap z-0"
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
            className="relative z-[1] text-[13px] md:text-base w-full resize-none outline-none text-main dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
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

          {/* Media Preview */}
          <div className="my-2 grid grid-cols-2 gap-3">
            {media.map((file, idx) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith("video/");
              return (
                <div
                  key={idx}
                  className="relative w-full h-40 bg-black rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setMedia((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/80 p-1 transition-all duration-300 ease-in-out"
                  >
                    <X />
                  </button>

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
        </div>

        <div
          className={clsx(
            "text-right text-[12px] md:text-sm mt-1",
            overLimit ? "text-red-600" : "text-gray-500"
          )}
        >
          {text.length}/{characterLimit}
        </div>

        {schedule && (
          <p className="text-[12px] md:text-sm text-gray-500 mt-1 flex items-center gap-1">
            <Clock size={16} /> Will send on{" "}
            {moment(schedule.toLocaleString(), "DD/MM/YYYY, HH:mm:ss").format(
              "ddd, MMM D, YYYY [at] h:mm A"
            )}
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
                  className="text-primary dark:text-primary/50 hover:text-main transition-colors duration-300 ease-in-out"
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
                className="text-primary dark:text-primary/50 hover:text-main transition-colors duration-300 ease-in-out"
              />
            </button>

            {/* Date Picker */}
            <div className="flex pt-1">
              <DatePicker
                selected={schedule}
                onChange={(date) => setSchedule(date)}
                showTimeSelect
                dateFormat="Pp"
                customInput={
                  <button>
                    <Calendar
                      size={20}
                      className="text-primary dark:text-primary/50 hover:text-main transition-colors duration-300 ease-in-out"
                    />
                  </button>
                }
              />
            </div>
          </div>

          <button
            disabled={
              (text.trim() === "" && media.length === 0) ||
              overLimit ||
              creatingPost
            }
            onClick={handlePost}
            className={clsx(
              "bg-primary  dark:bg-main/50 text-[12px] md:text-base text-main dark:text-primary font-semibold px-5 py-1.5 rounded-full transition",
              (text.trim() === "" && media.length === 0) ||
                overLimit ||
                creatingPost
                ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            {creatingPost ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Post"
            )}
          </button>
        </div>

        {showEmojiPicker && (
          <div className="absolute mt-2 z-10 bottom-0 rounded shadow-lg">
            <EmojiPicker
              onSelect={handleEmojiSelect}
              onClick={() => setShowEmojiPicker(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
