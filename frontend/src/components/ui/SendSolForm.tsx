import { useEffect, useState } from "react";
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
  users: User[];
};

export const SendSolForm = ({ users: allUsers }: Props) => {
  const { userProfile } = FetchUserProfile();
  const { mutate: sendSol, isPending, isSuccess, error } = useSendSol();

  const users = allUsers.filter(
    (user: User) => user.email !== (userProfile as User)?.email
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
    sendSol({ destination: recipient, amount });
  };

  return (
    <section className="bg-white border border-gray-300 rounded-[10px] p-6 max-w-xl w-full">
      <h1 className="text-xl font-semibold mb-4 text-primary font-calSans">
        Send SOL
      </h1>

      {/* User Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-main">
          Select User
        </label>
        <select
          className="w-full p-2 border rounded text-main"
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

      {/* Recipient Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-main">
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-main">
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

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleSend}
          disabled={isPending}
          className="px-6 py-2 rounded bg-primary text-main font-calSans hover:bg-primaryHover transition-all duration-300 ease-in-out"
        >
          {isPending ? "Sending..." : "Send"}
        </button>
      </div>

      {/* Messages */}
      {isSuccess && (
        <p className="text-green-600 text-sm mt-2">
          Transaction sent successfully!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-sm mt-2">
          Error: {(error as Error).message}
        </p>
      )}
    </section>
  );
};
