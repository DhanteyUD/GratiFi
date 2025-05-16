import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Bell, ChevronDown, Wallet, User } from "lucide-react";
import { FetchUserProfile } from "@/hooks/UseFetch";
import { headerNavMenuItems } from "@/routes/path";
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
  const currentPage = location.pathname.split("/")[1];
  const [notificationCount] = useState(0);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { fetchingUserProfile, userProfile } = FetchUserProfile();

  const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleWalletAction = () => {
    // Wallet connection logic here
    // Next: if wallet is connected_
    // navigate("/wallet");
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
    if (helperService.isEmptyObject(civicUser)) {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    }
  }, [civicUser, navigate]);

  console.log({ userProfile });

  useEffect(() => {
    document.title = `GratiFi | ${helperService.capitalize(currentPage)}`;
  }, [currentPage]);

  return (
    <div className="sticky w-full h-auto flex top-2 md:top-0 items-center justify-start md:justify-between gap-0 md:gap-[10px] bg-transparent md:bg-background rounded-none md:rounded-r-[30px] z-[3]">
      <div className="flex items-center gap-5 pl-2 md:pl-4">
        <ChevronLeft
          className="hidden md:flex w-10 h-10 text-main hover:bg-primary p-1 hover:p-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer animated_cursor"
          onClick={() => (goBack ? goBack() : navigate(-1))}
        />

        <h1
          className={clsx(
            "hidden md:flex text-main font-calSans text-[20px] md:text-[25px] font-[700]"
          )}
        >
          {helperService.capitalize(currentPage)}
        </h1>
      </div>

      <div className="flex items-center pr-[20px] md:pr-0 rounded-[30px_10px_10px_30px] md:rounded-0 flex-row-reverse md:flex-row md:bg-background gap-3">
        <div className="relative flex items-start gap-3">
          <div
            className={clsx(
              "gap-2 justify-center items-center text-main font-calSans h-10 w-10 lg:w-auto lg:px-5 rounded-full border border-primary",
              helperService.getUserTypeBg(userProfile?.user_type),
              helperService.isEmptyObject(userProfile)
                ? "hidden"
                : "hidden md:flex"
            )}
          >
            <p className="hidden lg:block">{userProfile?.user_type}</p>
            <UserTypeIcon userType={userProfile?.user_type} size={18} />
          </div>
          <div
            onClick={handleWalletAction}
            className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-white hover:bg-primary transition-all duration-300 ease-in-out border border-primary"
          >
            <Wallet />
            <Tooltip label="Select wallet" />
          </div>
          <div
            onClick={() => navigate("/notifications")}
            className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-white hover:bg-primary transition-all duration-300 ease-in-out border border-primary"
          >
            <Bell />
            {notificationCount > 0 && (
              <div className="absolute min-w-[15px] h-[15px] bg-compulsory rounded-full flex items-center justify-center -top-1 right-0 p-1">
                <p className="text-white text-[9px] font-semibold">
                  {notificationCount}
                </p>
              </div>
            )}

            <Tooltip label="Notification" />
          </div>
        </div>

        <div className="relative">
          {fetchingUserProfile && (
            <div className="relative group flex justify-center items-center w-10 h-10 p-[10px] cursor-pointer rounded-full animated_cursor bg-primary transition-all duration-300 ease-in-out border border-primary">
              <User className="animate-pulse text-white" />
            </div>
          )}
          {!fetchingUserProfile && !helperService.isEmptyObject(userProfile) ? (
            <div
              onClick={() => setShowProfileDropdown((prev) => !prev)}
              className={clsx(
                "group bg-white text-main h-[50px] border flex items-center gap-5 text-sm font-medium px-3 py-2 cursor-pointer border-primary hover:bg-primary transition-colors duration-300 ease-in-out",
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
                  <span className="text-primary text-[12px] group-hover:text-white/50 transition-colors duration-300 ease-in-out">
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
            <div className="absolute flex bg-white border border-t-0 border-primary rounded-[0_0_10px_10px] shadow-md w-full py-2 text-main">
              <ul className="text-sm w-full">
                {headerNavMenuItems.map((option) => (
                  <li key={option.label}>
                    <button
                      onClick={() => handleProfileDropdown(option)}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-primaryHover/50"
                    >
                      <option.icon size={18} className="text-gray-500" />
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
