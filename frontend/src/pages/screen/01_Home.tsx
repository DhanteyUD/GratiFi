// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { UseAppContext } from "@/hooks/UseAppContext";
import { Modal } from "@/components";
import { profiles } from "@/json";
import { Fan, Star } from "lucide-react";
import { CustomCreateProfileBtn } from "@/components";
import clsx from "clsx";

function Home() {
  const { user } = UseAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const renderIcon = () => {
    if (selectedProfile === "GratiFan") return <Fan size={18} />;
    if (selectedProfile === "GratiStar") return <Star size={18} />;
  };

  useEffect(() => {
    if (!user?.app_user?.user_type.length) {
      setIsModalOpen(true);
    }
  }, [user?.app_user?.user_type.length]);

  return (
    <>
      <div className="text-gray-800 text-xl font-semibold border border-[orange] p-4">
        Welcome to GratiFi!
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select a Profile"
        className="slit-in-vertical !rounded-none"
      >
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 w-full">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              onClick={() => setSelectedProfile(profile.title)}
              className={clsx(
                "group relative w-full md:w-80 h-48 md:h-72 border border-b-[20px] border-main bg-white p-5 animated_cursor cursor-pointer flex flex-col justify-between transition-all duration-300 ease-in-out bg-to-top-main bg-[length:100%_0%] bg-bottom bg-no-repeat hover:bg-[length:100%_100%] hover:shadow-lg hover:shadow-black/50"
              )}
            >
              <div className="flex justify-between items-center">
                <profile.icon
                  className={clsx(
                    "text-main text-2xl transition-colors duration-500 group-hover:text-white",
                    profile.title === "GratiFan"
                      ? "group-hover:animate-spin"
                      : "group-hover:animate-bounce"
                  )}
                />
                <div className="relative">
                  <input
                    type="radio"
                    name="signup-type"
                    checked={selectedProfile === profile.title}
                    onChange={() => setSelectedProfile(profile.title)}
                    className={clsx(
                      "appearance-none w-7 h-7 border border-gray-300 rounded-full transition-colors duration-300 checked:bg-white checked:border-main"
                    )}
                  />
                  <div
                    className={clsx(
                      "absolute w-5 h-5 inset-0 m-1 rounded-full bg-secondary transition-all duration-300",
                      selectedProfile === profile.title
                        ? "scale-100"
                        : "scale-0"
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-main transition-colors duration-300 group-hover:text-white text-lg">
                  {profile.title}
                </h3>
                <p className="text-main/70 transition-colors duration-300 group-hover:text-white text-sm">
                  {profile.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-5 items-center mt-4 justify-end">
          <button
            className="px-5 py-3 bg-primary text-main hover:bg-primaryHover font-calSans"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <CustomCreateProfileBtn
            disabled={!selectedProfile}
            selectedProfile={selectedProfile ?? undefined}
            className={clsx(
              "flex justify-center items-center gap-2 font-calSans font-medium text-main transition-all duration-300 w-full py-3 text-sm md:w-[220px] md:text-base",
              selectedProfile
                ? "bg-primary hover:bg-primaryHover cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            )}
            setIsModalOpen={setIsModalOpen}
          >
            {selectedProfile ? `Continue as ${selectedProfile}` : "Select"}
            {selectedProfile && renderIcon()}
          </CustomCreateProfileBtn>
        </div>
      </Modal>
    </>
  );
}

export default Home;
