function SubscribePremium() {
  return (
    <div className="flex flex-col items-start border border-gray-300 p-4 rounded-xl bg-white/50 h-auto gap-2">
      <h2 className="text-[20px] font-calSans font-[600] text-primary">
        Subscribe to Premium
      </h2>
      <p className="text-main text-[16px]">
        Enjoy exclusive features and tools with your Premium subscription.
      </p>

      <button className="mt-1 bg-main hover:bg-primary text-white font-semibold px-5 py-1.5 rounded-full transition-all duration-300 ease-in-out cursor-not-allowed">
        Subscribe
      </button>
    </div>
  );
}

export default SubscribePremium;
