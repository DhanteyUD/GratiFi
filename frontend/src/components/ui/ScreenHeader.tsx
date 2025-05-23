import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  Bell,
  ChevronDown,
  Wallet,
  User,
  LoaderCircle,
  Sun,
  Moon,
} from "lucide-react";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { headerNavMenuItems } from "@/routes/path";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { UseThemeContext } from "@/hooks/UseThemeContext";
import gratifiIcon from "@/assets/image/gratifi-logo.png";
import axiosInstance from "@/services/api.service";
import WalletInfo from "@/pages/screen/04_Wallet/components/WalletInfo";
import clsx from "clsx";
import helperService from "@/services/helper.service";
import UserTypeIcon from "./UserTypeIcon";
import Tooltip from "./Tooltip";

interface ScreenHeaderProps {
  goBack?: () => void;
}
interface ProfileDropdownOption {
  label: string;
  path: string;
  icon: React.ComponentType<{ size: number }>;
}

function ScreenHeader({ goBack }: ScreenHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = UseThemeContext();

  const currentPage = location.pathname.split("/")[1];
  const [notificationCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { fetchingUserProfile, userProfile } = FetchUserProfile();

  const { setVisible } = useWalletModal();
  const { publicKey, connected, wallet, connecting } = useWallet();

  const civicUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  }, []);

  const handleWalletAction = async () => {
    if (connecting) return;

    try {
      if (connected) {
        navigate("/wallet");
      } else {
        setVisible(true);
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const handleProfileDropdown = (option: ProfileDropdownOption): void => {
    if (option.label === "Sign out") {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    } else {
      navigate(`/${option.path}`);
    }

    setShowProfileDropdown(false);
  };

  useEffect(() => {
    if (connected && publicKey && userProfile?.email) {
      const saveWallet = async () => {
        try {
          const res = await axiosInstance.post("/wallet/create-wallet", {
            publicKey: publicKey.toString(),
            email: userProfile.email,
          });
          console.log("Wallet saved:", res.data);
        } catch (err) {
          console.error("Error saving wallet:", err);
        }
      };

      if (!userProfile.Wallet) {
        saveWallet();
      }
    }
  }, [connected, publicKey, userProfile.Wallet, userProfile.email]);

  useEffect(() => {
    if (helperService.isEmptyObject(civicUser)) {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    }
  }, [civicUser, navigate]);

  useEffect(() => {
    document.title = `GratiFi | ${helperService.capitalize(currentPage)}`;
  }, [currentPage]);

  return (
    <div className="relative md:sticky w-full h-auto flex top-2 md:top-0 items-center justify-between gap-0 md:gap-[10px] bg-transparent md:bg-background md:dark:bg-dark3 rounded-none md:rounded-r-[30px] z-[3] pl-2 md:pl-0 flex-row-reverse md:flex-row">
      <div className="hidden md:flex items-center gap-5 pl-2 md:pl-4">
        <ChevronLeft
          className="flex w-10 h-10 text-main dark:text-primary hover:bg-primary dark:hover:bg-main/50 p-1 hover:p-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer animated_cursor"
          onClick={() => (goBack ? goBack() : navigate(-1))}
        />

        <h1
          className={clsx(
            "flex text-main dark:text-primary font-calSans text-[20px] md:text-[25px] font-[700]"
          )}
        >
          {helperService.capitalize(currentPage)}
        </h1>
      </div>

      {/* Mobile Only! */}
      <div className="flex md:hidden justify-between items-center w-full">
        {!fetchingUserProfile && !helperService.isEmptyObject(userProfile) ? (
          <div onClick={() => navigate("/profile")} className="w-[50px]">
            <img
              src={userProfile.picture}
              alt={userProfile.name}
              className="w-[40px] h-[40px] rounded-full"
            />
          </div>
        ) : null}

        <div className="flex-1 flex justify-center">
          <img src={gratifiIcon} alt="GratiFi" className="w-[50px] h-[50px]" />
        </div>

        <div className="w-[50px]" />
      </div>

      <div className="hidden md:flex items-center pr-[20px] md:pr-0 rounded-[30px_10px_10px_30px] md:rounded-0 flex-row-reverse md:flex-row md:bg-background md:dark:bg-dark3 gap-2 md:gap-3">
        <div className="relative flex items-start gap-2 md:gap-3">
          {/* User profile */}
          <div
            className={clsx(
              "gap-2 justify-center items-center text-main font-calSans h-10 w-10 lg:w-auto lg:px-5 rounded-full border border-primary dark:border-main",
              helperService.getUserTypeBg(userProfile?.user_type),
              helperService.isEmptyObject(userProfile)
                ? "hidden"
                : "hidden md:flex"
            )}
          >
            <p className="hidden lg:block">{userProfile?.user_type}</p>
            <UserTypeIcon userType={userProfile?.user_type} size={18} />
          </div>

          {/* Wallet */}
          <div
            onClick={handleWalletAction}
            className={clsx(
              "relative group flex justify-center items-center h-10 p-[10px] cursor-pointer rounded-full animated_cursor border border-primary dark:border-main hover:bg-primaryHover dark:hover:bg-main/50 transition-all duration-300",
              publicKey?.toString().length
                ? "hidden md:flex gap-3 bg-primary dark:bg-main/50"
                : "w-10 bg-white dark:bg-main/50"
            )}
          >
            {connecting ? (
              <LoaderCircle size={18} className="animate-spin text-main" />
            ) : wallet ? (
              <WalletInfo publicKey={publicKey} wallet={wallet} />
            ) : (
              <Wallet
                size={publicKey?.toString().length ? 18 : undefined}
                className="text-main dark:text-primary"
              />
            )}

            <Tooltip
              label={
                connecting
                  ? "Connecting Wallet... Please Wait"
                  : publicKey?.toString().length
                  ? `${publicKey}`
                  : "Connect Wallet"
              }
              className="font-jetBrains"
            />
          </div>

          {/* Notification */}
          <div
            onClick={() => navigate("/notifications")}
            className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-white dark:bg-main/50 hover:bg-primaryHover dark:hover:bg-main/50 transition-all duration-300 ease-in-out border border-primary dark:border-main"
          >
            <Bell className="text-main dark:text-primary" />
            {notificationCount > 0 && (
              <div className="absolute min-w-[15px] h-[15px] bg-compulsory rounded-full flex items-center justify-center -top-1 right-0 p-1">
                <p className="text-white dark:text-primary text-[9px] font-semibold">
                  {notificationCount}
                </p>
              </div>
            )}

            <Tooltip label="Notification" />
          </div>

          {/* Dark/Light Mode */}
          <div
            onClick={toggleTheme}
            className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-white dark:bg-main/50 hover:bg-primaryHover dark:hover:bg-main/50 transition-all duration-300 ease-in-out border border-gray-300 dark:border-main md:border-primary md:dark:border-main"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-main dark:text-primary" />
            ) : (
              <Moon className="w-5 h-5 text-main dark:text-primary" />
            )}
          </div>
        </div>

        <div className="relative">
          {fetchingUserProfile && (
            <div className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-primary dark:bg-main/50 transition-all duration-300 ease-in-out border border-primary dark:border-main">
              <User className="animate-pulse text-white dark:text-primary" />
            </div>
          )}
          {!fetchingUserProfile && !helperService.isEmptyObject(userProfile) ? (
            <div
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              className={clsx(
                "group bg-white dark:bg-main/50 text-main dark:text-primary h-[50px] border hidden md:flex items-center gap-5 text-sm font-medium px-3 py-2 cursor-pointer border-gray-300 dark:border-main md:border-primary md:dark:border-main hover:bg-primaryHover dark:hover:bg-main/50 transition-colors duration-300 ease-in-out",
                showProfileDropdown
                  ? "rounded-[10px_25px_0_0] md:rounded-[25px_10px_0_0]"
                  : "rounded-full"
              )}
            >
              <div className="flex items-center gap-2">
                <img
                  src={userProfile.picture}
                  alt={userProfile.name}
                  className="w-[30px] h-[30px] rounded-full"
                />
                <div className="flex flex-col items-start leading-4">
                  <p className="text-[15px] font-calSans">{userProfile.name}</p>
                  <span className="text-primary dark:text-primaryHover/50 text-[12px] group-hover:text-main/50 dark:group-hover:text-primaryHover/50  transition-colors duration-300 ease-in-out">
                    @{userProfile.name}
                  </span>
                </div>
              </div>
              <ChevronDown
                size={25}
                className={clsx(
                  "cursor-pointer",
                  showProfileDropdown ? "-scale-y-[1]" : ""
                )}
              />
            </div>
          ) : null}

          {showProfileDropdown && (
            <div className="absolute flex bg-white dark:bg-main border border-t-0 border-primary dark:border-main rounded-[0_0_10px_10px] shadow-md w-full py-2 text-main dark:text-primary">
              <ul className="text-sm w-full">
                {headerNavMenuItems.map((option) => (
                  <li key={option.label}>
                    <button
                      onClick={() => handleProfileDropdown(option)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-primaryHover/50 dark:hover:bg-dark3/40"
                    >
                      <option.icon size={18} className="text-gray-500 dark:text-primaryHover/50" />
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenHeader;
