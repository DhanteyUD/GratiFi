import clsx from "clsx";

type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabOptions = ["For you", "Following"];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex w-full border-b border-gray-300 gap-5">
      {tabOptions.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={clsx(
            "p-1 text-center text-md font-medium transition-colors duration-300",
            activeTab === tab
              ? "border-b-4 border-primary text-main"
              : "border-b-4 border-transparent text-gray-400 hover:text-primary"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
