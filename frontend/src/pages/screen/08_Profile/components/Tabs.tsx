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
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
