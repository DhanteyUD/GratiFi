import clsx from "clsx";

type TabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

const tabOptions = ["For you", "Following"];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="sticky -top-[1px] md:top-0 flex w-full border-b border-gray-300 dark:border-gray-600 gap-5 bg-background dark:bg-backgroundDark z-[2]">
      {tabOptions.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className="flex group justify-center md:hover:bg-primaryHover/50 md:dark:hover:bg-main/50 w-full"
        >
          <p
            className={clsx(
              "p-1 md:pt-3 text-[14px] md:text-base font-medium transition-colors duration-300",
              activeTab === tab
                ? "border-b-4 border-primary text-main dark:text-primary w-full md:w-auto font-calSans"
                : "border-b-4 border-transparent text-gray-400 dark:text-gray-600 md:group-hover:text-primary"
            )}
          >
            {tab}
          </p>
        </button>
      ))}
    </div>
  );
}
