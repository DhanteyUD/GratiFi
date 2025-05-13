import { UseAppContext } from "@/hooks/UseAppContext";

function Home() {
  const { user } = UseAppContext();

  console.log("from 01_Home:", user);

  return (
    <>
      <div className="text-gray-800 text-xl font-semibold border border-[orange]">
        Welcome to GratiFi!
      </div>
    </>
  );
}

export default Home;
