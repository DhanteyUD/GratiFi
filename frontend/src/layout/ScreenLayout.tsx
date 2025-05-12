import { useNavigate } from "react-router-dom";
import {
  ScreenHeader,
  SideNavMenu,
  MobileActionNMenu,
  HamburgerToggle,
} from "@/components";
import { sharedMenuItems } from "@/routes/path";
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

  return (
    <>
      {/* {!md && getAnimatedCursor()} */}
      <div className="bg-background w-full h-screen flex p-0 md:p-5 gap-4">
        {/* {md && <HamburgerToggle menu={sharedMenuItems} />} */}
        {!md && (
          <div className="bg-primary w-[20%] h-full border border-b-[20px] border-main py-8 px-[1.5rem] text-white flex flex-col items-center gap-16">
            <div
              className="flex justify-center items-center animated_cursor cursor-pointer gap-[10px"
              onClick={() => navigate("/")}
            >
              <img
                alt="GratiFi logo"
                src={GratiFiLogo}
                className="w-[40px] h-[40px]"
              />
              <h1 className="text-white font-pacifico text-2xl font-normal">
                GratiFi
              </h1>
            </div>

            {/* <SideNavMenu menu={sharedMenuItems} /> */}
          </div>
        )}

        <div
          className={clsx(
            "relative gap-[2.5rem] flex flex-col overflow-auto w-full md:w-[80%] mb-[83px] md:mb-0 p-0",
            layoutPadding ? "pt-0 pb-5 px-5" : "px-4"
          )}
        >
          <ScreenHeader goBack={goBack} layoutPadding={layoutPadding} />
          <div className="p-2 h-auto">{children}</div>
        </div>

        {/* {md && <MobileActionNMenu menu={sharedMenuItems} />} */}
      </div>
    </>
  );
}

export default ScreenLayout;
