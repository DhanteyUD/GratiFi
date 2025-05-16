import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScreenHeader,
  SideNavMenu,
  MobileActionNMenu,
  HamburgerToggle,
  UserTypeIcon,
  Modal,
  CustomCreateProfileBtn,
  ScreenOverlay,
} from "@/components";
import { getScreenMenuItems } from "@/routes/path";
import { CivicAuthProvider } from "@civic/auth/react";
import { configKeys } from "@/config";
import { PanelLeftClose } from "lucide-react";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { profiles } from "@/json";
import helperService from "@/services/helper.service";
import UseScreenSize from "@/hooks/UseScreenSize";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";
import clsx from "clsx";

function ScreenLayout({
  children,
  goBack,
}: {
  children: React.ReactNode;
  goBack?: () => void;
}) {
  const { md } = UseScreenSize();
  const navigate = useNavigate();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const { fetchingUserProfile, userProfile } = FetchUserProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleToggleSidebar = () => {
    setIsSideNavCollapsed((prev) => !prev);
    setUserToggled(true);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setCurrentWidth(screenWidth);

      if (!userToggled) {
        setIsSideNavCollapsed(screenWidth <= 1000);
      }

      if (
        (screenWidth > 1000 && currentWidth <= 1000) ||
        (screenWidth <= 1000 && currentWidth > 1000)
      ) {
        setUserToggled(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [userToggled, currentWidth]);

  useEffect(() => {
    if (!fetchingUserProfile && helperService.isEmptyObject(userProfile)) {
      setIsModalOpen(true);
    }
  }, [fetchingUserProfile, userProfile]);

  return (
    <CivicAuthProvider clientId={configKeys.clientId}>
      {/* {!md && getAnimatedCursor()} */}

      {/* Loading Overlay */}
      {fetchingUserProfile && (
        <ScreenOverlay message="Fetching your GratiFi profile — spoiler: you’re the good guy." />
      )}

      {/* Screen */}
      <div className="bg-background w-full h-screen flex p-0 md:p-5 gap-4">
        {/* Sidebar and Mobile header */}
        {md ? (
          <HamburgerToggle
            menu={getScreenMenuItems(userProfile?.user_type || "")}
          />
        ) : (
          <div
            className={clsx(
              "relative bg-white h-full rounded-[20px_0_20px_20px] border border-primary py-5 px-3 text-white flex flex-col items-center gap-5 transition-all duration-300 ease-in-out",
              isSideNavCollapsed ? "w-[10%]" : "w-[20%]"
            )}
          >
            <div
              className="flex justify-center items-center animated_cursor cursor-pointer gap-[10px]"
              onClick={() => navigate("/")}
            >
              <img alt="GratiFi logo" src={GratiFiLogo} className="h-10 w-10" />
              <h1
                className={clsx(
                  "hidden lg:block text-main font-calSans text-[30px] transition-all duration-300 ease-in-out",
                  isSideNavCollapsed && "!hidden"
                )}
              >
                GratiFi
              </h1>
            </div>

            <SideNavMenu
              menu={getScreenMenuItems(userProfile?.user_type || "")}
              isSideNavCollapsed={isSideNavCollapsed}
            />
            <PanelLeftClose
              size={20}
              onClick={handleToggleSidebar}
              className={clsx(
                "absolute -top-[3px] -right-[18px] text-primary/50 hover:text-primary cursor-pointer",
                isSideNavCollapsed && "scale-x-[-1]"
              )}
            />
            <span className="absolute top-3 left-3 w-[10px] h-[10px] rounded-full bg-background border border-main" />
          </div>
        )}

        {/* Main Content */}
        <div className="relative gap-8 md:gap-4 flex flex-col overflow-auto mb-[83px] md:mb-0 w-full">
          <ScreenHeader goBack={goBack} />
          <div className="md:p-1 h-auto">{children}</div>
        </div>

        {/* Mobile action bar */}
        {md && (
          <MobileActionNMenu
            menu={getScreenMenuItems(userProfile?.user_type || "")}
          />
        )}
      </div>

      {/* Profile Modal */}
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

        <div className="flex gap-5 items-center mt-4 justify-end h-[40px]">
          <button
            className="px-5 bg-compulsory/80 text-white font-calSans h-full transition-all duration-300 ease-in-out"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <CustomCreateProfileBtn
            disabled={!selectedProfile}
            selectedProfile={selectedProfile ?? undefined}
            className={clsx(
              "flex justify-center items-center gap-2 font-calSans font-medium text-main transition-all duration-300 h-full text-sm w-[220px] md:text-base",
              selectedProfile
                ? "bg-primary cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            )}
            setIsModalOpen={setIsModalOpen}
          >
            {selectedProfile ? `Continue as ${selectedProfile}` : "Select"}
            {selectedProfile && (
              <UserTypeIcon userType={selectedProfile} size={18} />
            )}
          </CustomCreateProfileBtn>
        </div>
      </Modal>
    </CivicAuthProvider>
  );
}

export default ScreenLayout;
