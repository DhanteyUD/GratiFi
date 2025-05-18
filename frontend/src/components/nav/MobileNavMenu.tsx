import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { Fade as Hamburger } from "hamburger-react";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";
import clsx from "clsx";

interface MenuItem {
  to: string;
  label?: string;
  icon?: React.ReactNode;
}

export const MobileNavMenu = ({
  menu = [] as MenuItem[],
  canLogin = false,
  canSignup = false,
}: {
  menu?: MenuItem[];
  canLogin?: boolean;
  canSignup?: boolean;
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top nav bar */}
      <div className="fixed flex md:hidden top-5 z-[2] w-[95%] items-center justify-between gap-2 px-2 py-2 scrollbar-hide">
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

        <div
          className={clsx(
            "flex items-center",
            menu.length ? " bg-dark dark:bg-main rounded-[10px]" : ""
          )}
        >
          {menu.length > 0 ? (
            <Hamburger
              toggle={setIsMenuOpen}
              toggled={isMenuOpen}
              direction="right"
              size={20}
              color="#ab9ff2"
            />
          ) : (
            <button
              className="h-10 min-w-[120px] px-5 bg-primary hover:bg-primaryHover text-sm font-medium font-calSans text-main rounded-full transition-all duration-300 ease-in-out"
              onClick={() => navigate("/create-account")}
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Slide-in menu */}
      {isMenuOpen && (
        <div className="slide-in-elliptic-top-fwd fixed top-[90px] z-[100] flex w-[95%] flex-col gap-6 rounded-[10px] bg-dark dark:bg-main p-5">
          <div className="flex flex-col items-start gap-2">
            {menu.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                className="flex h-10 cursor-pointer items-center justify-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-black transition-all duration-300 hover:text-outline"
              >
                <span className="text-primary">{item.icon}</span>
                <div className="nav_title text-primary">{item.label}</div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-[10px]">
            {canLogin && (
              <button
                className="h-10 min-w-[100px] px-5 border border-primary bg-transparent text-sm font-calSans text-primary rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
            {canSignup && (
              <button
                className="h-10 min-w-[120px] px-5 bg-primary hover:bg-primaryHover text-sm font-medium font-calSans text-main rounded-full transition-all duration-300 ease-in-out"
                onClick={() => navigate("/create-account")}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
