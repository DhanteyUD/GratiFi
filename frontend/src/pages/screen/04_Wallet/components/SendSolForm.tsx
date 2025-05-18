import { useEffect, useState } from "react";
import { useSendSol } from "@/hooks/UseSendSol";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { UserTypeIcon } from "@/components";
import type { User } from "@/types";
import helperService from "@/services/helper.service";
import clsx from "clsx";

type Props = {
  users: User[];
};

export const SendSolForm = ({ users: allUsers }: Props) => {
  const { userProfile } = FetchUserProfile();
  const { mutate: sendSol, isPending, isSuccess, error } = useSendSol();

  const users = allUsers.filter(
    (user) => user.email !== (userProfile as User)?.email
  );

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0.01);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [showAllUsers, setShowAllUsers] = useState(false);
  const maxVisibleUsers = 2;
  const visibleUsers = showAllUsers ? users : users.slice(0, maxVisibleUsers);

  useEffect(() => {
    if (selectedUserId) {
      const user = users.find((u) => u.id === selectedUserId);
      if (user && user.Wallet.length > 0) {
        setRecipient(user.Wallet[0].publicKey);
      }
    }
  }, [selectedUserId, users]);

  const handleSend = () => {
    if (!recipient || !amount) return;
    sendSol({ destination: recipient, amount });
  };

  return (
    <section className="bg-black text-white border border-gray-800 rounded-[10px] p-6 max-w-xl w-full shadow-lg">
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
              <div className="font-medium text-sm">{user.name}</div>
              <div className="text-xs text-gray-400">
                @{user.email.split("@")[0]}
                {user.Wallet?.[0]?.publicKey && (
                  <span className="ml-2 text-primary">
                    ({user.Wallet[0].publicKey.slice(0, 4)}...
                    {user.Wallet[0].publicKey.slice(-4)})
                  </span>
                )}
              </div>
            </div>
            <span
              className={clsx(
                "text-[12px] px-2 py-1 text-dark font-calSans rounded flex gap-1 items-center",
                helperService.getUserTypeBg(user.user_type)
              )}
            >
              {user.user_type}
              <UserTypeIcon userType={user.user_type} size={13} />
            </span>
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

      {/* Recipient (read-only if selected from list) */}
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
      {isSuccess && (
        <p className="text-green-500 text-sm mt-4">Transaction successful!</p>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-4">
          Error: {(error as Error).message}
        </p>
      )}
    </section>
  );
};
