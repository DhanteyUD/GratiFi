import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScreenHeader,
  SideNavMenu,
  MobileActionNMenu,
  HamburgerToggle,
} from "@/components";
import { getScreenMenuItems } from "@/routes/path";
import { CivicAuthProvider } from "@civic/auth/react";
import { configKeys } from "@/config";
import { PanelLeftClose } from "lucide-react";
import { FetchProfile } from "@/lib";
import UseScreenSize from "@/hooks/UseScreenSize";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";
import clsx from "clsx";

function ScreenLayout({
  children,
  goBack,
  layoutPadding = true,
}: {
  children: React.ReactNode;
  goBack?: () => void;
  layoutPadding?: boolean;
}) {
  const { md } = UseScreenSize();
  const navigate = useNavigate();
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const { profile } = FetchProfile();

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

  return (
    <CivicAuthProvider clientId={configKeys.clientId}>
      {/* {!md && getAnimatedCursor()} */}
      <div className="bg-background w-full h-screen flex p-0 md:p-5 gap-4">
        {md && (
          <HamburgerToggle
            menu={getScreenMenuItems(profile?.user_type || "")}
          />
        )}
        {!md && (
          <div
            className={clsx(
              "relative bg-white h-full border border-b-[20px] border-main py-5 px-3 text-white flex flex-col items-center gap-5 transition-all duration-300 ease-in-out",
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
              menu={getScreenMenuItems(profile?.user_type || "")}
              isSideNavCollapsed={isSideNavCollapsed}
            />
            <PanelLeftClose
              size={20}
              onClick={handleToggleSidebar}
              className={clsx(
                "absolute -top-[3px] -right-[18px] text-primary hover:text-main cursor-pointer",
                isSideNavCollapsed && "scale-x-[-1]"
              )}
            />
            <span className="absolute top-2 left-2 w-[10px] h-[10px] rounded-full bg-background border border-main" />
          </div>
        )}

        <div
          className={clsx(
            "relative gap-[2rem] flex flex-col overflow-auto mb-[83px] w-full md:mb-0 p-0",
            layoutPadding ? "pt-0 px-5" : "px-4"
          )}
        >
          <ScreenHeader goBack={goBack} layoutPadding={layoutPadding} />
          <div className="p-1 h-auto">{children}</div>
        </div>

        {md && (
          <MobileActionNMenu
            menu={getScreenMenuItems(profile?.user_type || "")}
          />
        )}
      </div>
    </CivicAuthProvider>
  );
}

export default ScreenLayout;
