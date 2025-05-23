import { SendSolForm } from "./SendSolForm";
import { X } from "lucide-react";
import type { User } from "@/types";

type Props = {
  users: User[];
  isVisible: boolean;
  onClose: () => void;
};

export const SendSolSection = ({ users, isVisible, onClose }: Props) => {
  if (!isVisible) return null;

  return (
    <div className="bg-white dark:bg-main/50 border border-gray-300 dark:border-gray-600 rounded-[10px] p-4 mx-2 md:mx-0 mt-2 md:mt-0 mb-2 md:mb-4 transition-all duration-300 slit-in-horizontal">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-primary text-2xl font-bold font-calSans">
          Send SOL
        </h1>
        <button
          className="text-sm flex justify-center items-center text-gray-500 hover:text-red-500 transition bg-dark p-1 rounded-md h-[40px] w-[40px]"
          onClick={onClose}
        >
          <X size={18} className="text-primary" />
        </button>
      </div>

      <SendSolForm users={users} />
    </div>
  );
};
