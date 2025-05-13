import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MoveLeft, Search, Bell, Fan, Star } from "lucide-react";
import { UserButton } from "@civic/auth/react";
import { FetchProfile } from "@/lib";
import clsx from "clsx";
import helperService from "../../services/helper.service";

interface ScreenHeaderProps {
  goBack?: () => void;
  layoutPadding?: boolean;
}

function ScreenHeader({ goBack, layoutPadding }: ScreenHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.split("/")[1];
  const { profile } = FetchProfile();

  const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [notificationCount] = useState(0);
  // const [searchTerm, setSearchTerm] = useState("");
  const [showingSearchInput, setShowingSearchInput] = useState(false);

  const renderIcon = (userType: string) => {
    if (userType === "GratiFan") return <Fan size={18} />;
    if (userType === "GratiStar") return <Star size={18} />;
  };

  const handleShowSearchInput = () => {
    setShowingSearchInput(!showingSearchInput);
  };

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
    <div
      className={clsx(
        "w-full h-auto z-[2] sticky flex top-[10px] md:top-0 items-center justify-start md:justify-between gap-0 md:gap-[10px] bg-transparent md:bg-background rounded-none md:rounded-r-[30px]",
        !layoutPadding ? "px-5 pb-5 md:px-4" : "p-1"
      )}
    >
      <div className="flex items-center gap-5">
        <MoveLeft
          className="hidden md:flex w-10 h-10 text-main hover:bg-primary p-1 hover:p-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer animated_cursor"
          onClick={() => (goBack ? goBack() : navigate(-1))}
        />

        <h1 className="hidden md:flex text-main font-calSans text-[20px] md:text-[25px] font-[700]">
          {helperService.capitalize(currentPage)}
        </h1>
      </div>

      <div className="flex items-center pr-[20px] md:pr-0 rounded-[30px_10px_10px_30px] md:rounded-0 flex-row-reverse md:flex-row bg-background gap-3">
        <div className="relative flex items-start gap-3">
          <div
            className={clsx(
              "gap-2 justify-center items-center text-main font-calSans h-10 w-10 lg:w-auto lg:px-5 bg-secondary rounded-full border border-primary",
              helperService.isEmptyObject(profile) ? "hidden" : "hidden md:flex"
            )}
          >
            <p className="hidden lg:block">{profile?.user_type}</p>
            {renderIcon(profile?.user_type || "")}
          </div>
          <div className="h-full flex">
            <Search
              onClick={handleShowSearchInput}
              className={clsx(
                "w-10 h-10 p-[10px] cursor-pointer animated_cursor bg-white hover:bg-primary transition-all duration-300 ease-in-out border border-primary",
                showingSearchInput
                  ? "rounded-full md:border-r-0 md:rounded-[50px_0_0_50px] "
                  : "rounded-full "
              )}
            />
            <input
              type="search"
              className={clsx(
                "w-auto outline-none border text-main border-primary pl-2 pr-3 transition-all duration-300 ease-in-out",
                showingSearchInput
                  ? "hidden md:flex border-l-0 rounded-[0_50px_50px_0]"
                  : "hidden"
              )}
            />
          </div>
          <div className="relative">
            <Bell
              className="w-10 h-10 p-[10px] cursor-pointer animated_cursor bg-white hover:bg-primary rounded-full transition-all duration-300 ease-in-out border border-primary"
              onClick={() => navigate("/notifications")}
            />
            {notificationCount > 0 && (
              <div className="absolute min-w-[15px] h-[15px] bg-compulsory rounded-full flex items-center justify-center -top-1 right-0 p-1">
                <p className="text-white text-[9px] font-semibold">
                  {notificationCount}
                </p>
              </div>
            )}
          </div>
        </div>

        <UserButton className="!bg-white !text-main !border !border-primary !p-3 hover:!bg-primary !font-calSans" />
      </div>

      {showingSearchInput && (
        <input
          type="search"
          className={clsx(
            "flex md:hidden absolute left-0 top-16 w-full outline-none border border-primary px-5 transition-all duration-300 ease-in-out rounded-xl h-[45px] slit-in-horizontal"
          )}
        />
      )}
    </div>
  );
}

export default ScreenHeader;
