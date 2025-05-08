import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";

interface MenuItem {
  name: string;
  path: string;
}

export const MobileNavMenu = ({
  menu = [] as MenuItem[],
  canLogin = false,
  canSignup = false,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top nav bar */}
      <div className="fixed top-5 z-[100] flex w-[95%] items-center justify-between gap-2 px-2 py-2 scrollbar-hide">
        <div
          className="logo animated_cursor flex cursor-pointer items-center gap-[10px]"
          onClick={() => navigate("/")}
        >
          <img
            alt="GratiFi logo"
            src={GratiFiLogo}
            className="h-[50px] w-[50px]"
          />
        </div>

        <div className="flex h-10 items-center">
          {menu.length > 0 && (
            <Hamburger
              toggle={setIsMenuOpen}
              toggled={isMenuOpen}
              direction="right"
              size={24}
            />
          )}
        </div>
      </div>

      {/* Slide-in menu */}
      {!isMenuOpen && (
        <div className="slide-in-elliptic-top-fwd-no-delay fixed top-[90px] z-[100] flex w-[95%] flex-col gap-6 rounded-[10px] bg-white p-5">
          <div className="flex flex-col items-start gap-2">
            {menu.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-black transition-all duration-300 hover:text-outline"
              >
                <div className="nav_title">{item.name}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-[10px]">
            {canLogin && (
              <button
                className="h-10 w-[95px] border border-main bg-transparent text-sm font-calSans text-main rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            {canSignup && (
              <button className="h-10 w-[98px] bg-primary hover:bg-primaryHover text-sm font-medium font-calSans text-main rounded-full transition-all duration-300 ease-in-out">
                Download
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
