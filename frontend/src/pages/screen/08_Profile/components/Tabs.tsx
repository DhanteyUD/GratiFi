interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const tabs = ["Posts", "Replies", "Media", "Likes"];

  return (
    <div className="flex border-b dark:border-1 dark:border-gray-600">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center p-3 font-medium ${
            activeTab === tab
              ? "border-b-4 border-primary text-primary transition-all duration-300 ease-linear"
              : "text-gray-500 border-b-4 border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
