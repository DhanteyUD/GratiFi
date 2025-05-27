import { Dialog } from "@headlessui/react";
import { Fragment } from "react";

type ConfirmationModalProps = {
  header: string;
  message: string;
  isLoading?: boolean;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmationModal({
  header,
  message,
  isLoading,
  isOpen,
  onConfirm,
  onClose,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-main/50">
        <Dialog.Panel className="bg-white dark:bg-dark2 p-6 rounded-xl max-w-xs w-full shadow-lg">
          <h1 className="text-xl font-bold font-calSans text-main dark:text-white">
            {header}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {message}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-transparent dark:border dark:border-primary/50 dark:hover:bg-primary/50 text-main dark:text-white font-semibold py-3 rounded-full transition-colors"
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
