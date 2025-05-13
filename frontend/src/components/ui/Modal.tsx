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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={clsx(
          "relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

        {children}
      </div>
    </div>
  );
};

export default Modal;
