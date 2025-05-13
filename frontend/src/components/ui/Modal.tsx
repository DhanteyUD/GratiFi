// src/components/Modal.tsx
import React from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">
      <div
        className={clsx(
          "bg-white rounded-xl w-auto p-6 relative shadow-xl",
          className
        )}
      >
        <div className="flex items-center mb-4">
          {title && (
            <h1 className="text-lg font-semibold font-calSans bg-secondary text-main">
              {title}
            </h1>
          )}
          <button
            onClick={onClose}
            className="z-[2] absolute group top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full hover:bg-primaryHover cursor_pointer transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
