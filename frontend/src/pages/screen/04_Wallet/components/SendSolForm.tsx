import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSendSol } from "@/hooks/UseSendSol";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { UserTypeIcon } from "@/components";
import type { User } from "@/types";
import { showToastInfo } from "@/utils/notification.utils";
import helperService from "@/services/helper.service";
import clsx from "clsx";

type Props = {
  users: User[];
};

export const SendSolForm = ({ users: allUsers }: Props) => {
  const { userProfile } = FetchUserProfile();
  const { mutate: sendSol, isPending, isSuccess, error } = useSendSol();

  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const users = allUsers.filter(
    (user) => user.email !== (userProfile as User)?.email
  );

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0.01);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [showAllUsers, setShowAllUsers] = useState(false);
  const maxVisibleUsers = 2;
  const visibleUsers = showAllUsers ? users : users.slice(0, maxVisibleUsers);

  const [feedbackMessage, setFeedbackMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      if (user && user.Wallet.length > 0) {
        setRecipient(user.Wallet[0].publicKey);
      } else {
        showToastInfo(
          `${user?.name} has not set up a wallet`,
          "bottom-center",
          3000,
          true
        );
      }
    }
  }, [selectedUserId, users]);

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      if (user && user.Wallet.length > 0) {
        setRecipient(user.Wallet[0].publicKey);
        setTimeout(() => {
          amountInputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    }
  }, [selectedUserId, users]);

  const handleSend = () => {
    if (!recipient || !amount) return;
    sendSol({ destination: recipient, amount });
  };

  useEffect(() => {
    if (isSuccess) {
      setFeedbackMessage({ type: "success", text: "Transaction successful!" });
    } else if (error) {
      setFeedbackMessage({
        type: "error",
        text: `Error: ${(error as Error).message}`,
      });
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  return (
    <section className="bg-black text-white border border-gray-800 rounded-[10px] p-6 w-full shadow-lg transition-all duration-300 ease-linear">
      {/* Select User Grid */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {visibleUsers.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={clsx(
              "flex items-center gap-4 p-4 rounded-lg border border-transparent bg-[#1C1C20] hover:border-primary transition-all duration-200 text-left",
              selectedUserId === user.id && "border-primary bg-[#1A1A1D]"
            )}
          >
            <img
              src={user.picture}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-700"
            />
            <div className="flex-1">
              <div className="flex font-medium items-center text-sm gap-2">
                {user.name}
                <span
                  className={clsx(
                    "rounded-full p-1 text-dark",
                    helperService.getUserTypeBg(user.user_type)
                  )}
                >
                  <UserTypeIcon userType={user.user_type} size={8} />
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                @{user.email.split("@")[0]}
                {user.Wallet?.[0]?.publicKey && (
                  <span className="ml-2 text-primary">
                    ({user.Wallet[0].publicKey.slice(0, 4)}...
                    {user.Wallet[0].publicKey.slice(-4)})
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {users.length > maxVisibleUsers && (
        <div className="text-center mb-6">
          <button
            onClick={() => setShowAllUsers(!showAllUsers)}
            className="text-sm text-primary hover:underline font-medium"
          >
            {showAllUsers ? "Show Less" : `Show All (${users.length})`}
          </button>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Recipient Wallet Address
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Enter or select recipient"
          className="w-full p-3 rounded-lg bg-[#1C1C20] border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Amount (SOL)
        </label>
        <input
          ref={amountInputRef}
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={0}
          step={0.001}
          className="w-full p-3 rounded-lg bg-[#1C1C20] border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      {/* Send Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSend}
          disabled={isPending}
          className="px-6 py-2 rounded-lg bg-primary text-main font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={clsx(
              "mt-6 px-4 py-3 rounded-lg text-sm font-medium text-center",
              feedbackMessage.type === "success"
                ? "bg-green-600/20 text-green-400 border border-green-500"
                : "bg-red-600/20 text-red-400 border border-red-500"
            )}
          >
            {feedbackMessage.text}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
