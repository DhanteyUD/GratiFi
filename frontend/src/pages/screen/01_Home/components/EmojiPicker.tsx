import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

type EmojiPickerProps = {
  onSelect: (emoji: { id: string; name: string; native: string; unified: string }) => void;
};

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div className="absolute bg-white shadow-lg rounded-lg">
      <Picker data={data} onEmojiSelect={onSelect} theme="light" />
    </div>
  );
}
