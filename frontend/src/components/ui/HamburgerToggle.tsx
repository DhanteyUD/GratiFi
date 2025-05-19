import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { moreMenuItems } from "@/routes/path";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { Wallet, Sun, Moon } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { UseThemeContext } from "@/hooks/UseThemeContext";
import UserTypeIcon from "./UserTypeIcon";
import helperService from "@/services/helper.service";
import clsx from "clsx";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface HamburgerToggleProps {
  menu?: MenuItem[];
}

export const HamburgerToggle = ({ menu = [] }: HamburgerToggleProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = UseThemeContext();
  const { userProfile } = FetchUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { publicKey } = useWallet();

  const handleWalletAction = async () => {
    navigate("/wallet");
  };

  const handleMenuAction = (name: string, path?: string): void => {
    if (name === "Log out") {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <>
      <div className="fixed top-2 right-2 h-[50px] w-[50px] bg-[#2a2a2a] rounded-[10px] z-[999] flex items-center justify-center">
        {menu.length > 0 && (
          <Hamburger
            toggle={setIsMenuOpen}
            toggled={isMenuOpen}
            direction="left"
            color="#ffffff"
            size={20}
          />
        )}
      </div>

      {isMenuOpen && (
        <div className="fixed items-start top-[70px] left-[0.5rem] w-[96%] max-h-[80vh] bg-[#2a2a2a] p-5 rounded-[10px] z-[100] flex flex-col gap-4 slide-in-elliptic-top-fwd overflow-auto">
          <div className="flex justify-end w-full gap-3 mb-5 b">
            <div
              onClick={handleWalletAction}
              className={clsx(
                "relative group justify-center items-center cursor-pointer rounded-full animated_cursor bg-white border border-primary",
                publicKey?.toString().length
                  ? "flex md:hidden gap-3 px-[20px]"
                  : "hidden"
              )}
            >
              <Wallet size={publicKey?.toString().length ? 18 : undefined} />

              {publicKey?.toString().length && (
                <p className="text-[12px] font-jetBrains text-gray-600 group-hover:text-main truncate w-auto">
                  {helperService.shortWalletAddress(publicKey.toString(), 10)}
                </p>
              )}
            </div>
            <div
              className={clsx(
                "justify-center items-center text-main rounded-full h-10 w-10",
                helperService.getUserTypeBg(userProfile?.user_type),
                helperService.isEmptyObject(userProfile) ? "hidden" : "flex"
              )}
            >
              <UserTypeIcon userType={userProfile?.user_type} size={18} />
            </div>
            <div
              onClick={toggleTheme}
              className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-white hover:bg-primaryHover transition-all duration-300 ease-in-out border border-gray-300 md:border-primary"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-main" />
              ) : (
                <Moon className="w-5 h-5 text-main" />
              )}
            </div>
          </div>

          {menu.slice(5).map((item, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-5 rounded-[10px] w-full px-5 py-2 cursor-pointer hover:bg-[#414141] justify-start"
              )}
              onClick={() => handleMenuAction(item.name, item.path)}
            >
              <item.icon className="text-white" />
              <p className="text-white text-[16px] leading-[20.16px] font-normal truncate">
                {item.name}
              </p>
            </div>
          ))}

          <div className="h-[40px] flex justify-start items-center w-full p-5 mt-5">
            <p className="text-white">More</p>
          </div>

          {moreMenuItems.map((item, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-5 rounded-[10px] w-full px-5 py-2 cursor-pointer hover:bg-[#414141] justify-start"
              )}
              onClick={() => handleMenuAction(item.name, item.path)}
            >
              <item.icon className="text-white" />
              <p className="text-white text-[16px] leading-[20.16px] font-normal truncate">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
