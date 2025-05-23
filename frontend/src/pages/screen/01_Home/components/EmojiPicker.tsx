import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { X } from "lucide-react";

interface Emoji {
  id: string;
  name: string;
  native: string;
  unified: string;
}

interface EmojiPickerProps {
  onSelect: (emoji: Emoji) => void;
  onClick: () => void;
}

export default function EmojiPicker({ onSelect, onClick }: EmojiPickerProps) {
  return (
    <div className="absolute shadow-lg rounded-lg">
      <div className="absolute rounded-full p-1 -top-8 right-0 border dark:border-primary bg-dark cursor-pointer">
        <X
          size={15}
          onClick={onClick}
          className="text-white dark:text-primary hover:text-primary transition-colors duration-300 ease-in-out"
        />
      </div>
      <Picker data={data} onEmojiSelect={onSelect} theme="dark" />
    </div>
  );
}
