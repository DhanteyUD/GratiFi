import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { moreMenuItems } from "@/routes/path";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { Wallet } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
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
  const { userProfile } = FetchUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { publicKey, disconnect, connected } = useWallet();

  const handleWalletAction = async () => {
    try {
      if (!connected) {
        navigate("/wallet");
      } else {
        await disconnect();
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const handleMenuAction = (name: string, path?: string): void => {
    if (name === "Log out") {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    } else if (path) {
      navigate(`/${path}`);
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
          <div className="flex justify-end w-full gap-4 mb-5">
            <div
              onClick={handleWalletAction}
              className={clsx(
                "relative group justify-center items-center h-10 cursor-pointer w-full rounded-full animated_cursor bg-white border border-primary",
                publicKey?.toString().length
                  ? "flex md:hidden gap-3 px-[5px] py-[10x]"
                  : "hidden"
              )}
            >
              <Wallet size={publicKey?.toString().length ? 18 : undefined} />

              {publicKey?.toString().length && (
                <p className="text-sm font-jetBrains text-gray-600 group-hover:text-main truncate w-auto">
                  {helperService.shortWalletAddress(publicKey.toString(), 10)}
                </p>
              )}
            </div>
            <div
              className={clsx(
                "gap-2 justify-center items-center text-main font-calSans h-10 w-auto px-5 rounded-full",
                helperService.getUserTypeBg(userProfile?.user_type),
                helperService.isEmptyObject(userProfile) ? "hidden" : "flex"
              )}
            >
              <p>{userProfile?.user_type}</p>
              <UserTypeIcon userType={userProfile?.user_type} size={18} />
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
