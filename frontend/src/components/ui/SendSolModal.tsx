import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useSendSol } from "@/hooks/UseSendSol";
import { FetchUserProfile } from "@/hooks/UseFetch";

type Wallet = {
  id: string;
  publicKey: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  picture: string;
  user_type: string;
  createdAt: string;
  updatedAt: string;
  Wallet: Wallet[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
};

export const SendSolModal = ({ isOpen, onClose, users: allUsers }: Props) => {
  const { userProfile } = FetchUserProfile();
  const { mutate: sendSol, isPending, isSuccess, error } = useSendSol();

  const users = allUsers.filter(
    (user: User) => user.email !== (userProfile as User).email
  );

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0.01);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
    sendSol({ destination: recipient, amount }, { onSuccess: onClose });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white max-w-md w-full rounded-2xl p-6 space-y-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold">
            Send SOL
          </Dialog.Title>

          {/* User Select */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select User
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedUserId ?? ""}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          {/* Address Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter wallet address"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount (SOL)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min={0}
              step={0.001}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSend}
              disabled={isPending}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              {isPending ? "Sending..." : "Send"}
            </button>
          </div>

          {isSuccess && (
            <p className="text-green-600 text-sm">
              Transaction sent successfully!
            </p>
          )}
          {error && (
            <p className="text-red-600 text-sm">
              Error: {(error as Error).message}
            </p>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
