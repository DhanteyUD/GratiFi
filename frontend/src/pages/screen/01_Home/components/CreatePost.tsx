import { useRef, useState } from "react";
import { Smile, Calendar, ImageIcon, Loader2, Clock } from "lucide-react";
import EmojiPicker from "./EmojiPicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const [image, setImage] = useState<File | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
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
        image: image ? URL.createObjectURL(image) : null,
        createdAt: scheduledDate ?? new Date(),
      });

      setText("");
      setImage(null);
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
          onChange={(e) => {
            if (e.target.value.length <= characterLimit) {
              setText(e.target.value);
            }
          }}
          placeholder="What's happening?"
          className="w-full resize-none border-none outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {text.length}/{characterLimit}
        </div>

        {image && (
          <div className="mt-2">
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-40 rounded-lg"
            />
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
            <button onClick={() => fileInputRef.current?.click()}>
              <ImageIcon size={20} className="text-primary hover:text-main transition-colors duration-300 ease-in-out" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Emoji */}
            <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile size={20} className="text-primary hover:text-main transition-colors duration-300 ease-in-out" />
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
                    <Calendar size={20} className="text-primary hover:text-main transition-colors duration-300 ease-in-out" />
                  </button>
                }
              />
            </div>
          </div>

          <button
            disabled={!text || isPosting}
            onClick={handlePost}
            className={`bg-primary text-main font-semibold px-5 py-1.5 rounded-full transition ${
              !text || isPosting
                ? "bg-gray-400 text-white opacity-50 cursor-not-allowed"
                : ""
            }`}
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
