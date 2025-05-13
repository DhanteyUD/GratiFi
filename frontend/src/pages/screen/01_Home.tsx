// import SidebarLayout from "@/layout/SidebarLayout";
import ScreenLayout from "@/layout/ScreenLayout";

function Home() {
  return (
    <ScreenLayout goBack={() => window.history.go(-1)}>
      <div className="text-gray-800 text-xl font-semibold border border-[orange]">Welcome to GratiFi!</div>
    </ScreenLayout>
  );
}

export default Home;
