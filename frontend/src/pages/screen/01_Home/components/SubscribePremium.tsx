import { Crown } from "lucide-react";

function SubscribePremium() {
  return (
    <div className="flex flex-col items-start border border-gray-300 dark:border-gray-600 p-4 rounded-xl bg-white/50 dark:bg-dark3/50 h-auto gap-2">
      <h2 className="text-[20px] font-calSans font-[600] text-primary flex gap-2 items-center">
        Subscribe to Premium
        <Crown size={18} className="animate-pulse" />
      </h2>
      <p className="text-main dark:text-gray-400 text-[16px]">
        Enjoy exclusive features and tools with your Premium subscription.
      </p>

      <button className="mt-1 bg-main dark:bg-main/50 hover:bg-primary dark:hover:bg-main/50 text-white dark:text-primary font-semibold px-5 py-1.5 rounded-full transition-all duration-300 ease-in-out cursor-not-allowed">
        Subscribe
      </button>
    </div>
  );
}

export default SubscribePremium;
