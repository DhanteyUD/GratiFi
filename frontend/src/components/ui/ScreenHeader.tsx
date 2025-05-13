import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MoveLeft, Search, Bell, Fan, Star } from "lucide-react";
import { UseAppContext } from "@/hooks/UseAppContext.js";
import { UserButton } from "@civic/auth/react";
import clsx from "clsx";
import helperService from "../../services/helper.service";

interface ScreenHeaderProps {
  goBack?: () => void;
  layoutPadding?: boolean;
}

function ScreenHeader({ goBack, layoutPadding }: ScreenHeaderProps) {
  const { user }: { user: { app_user?: string | { user_type?: string } | null } } = UseAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.split("/")[1];
  const civicUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [notificationCount] = useState(0);

  console.log("from ScreenHeader:", user);

  useEffect(() => {
    if (helperService.isEmptyObject(civicUser)) {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/login");
    }
  }, [civicUser, navigate]);

  return (
    <div
      className={clsx(
        "border border-[red] w-full h-auto z-[2] sticky flex top-[10px] md:top-0 items-center justify-start md:justify-between gap-0 md:gap-[10px] bg-transparent md:bg-background rounded-none md:rounded-r-[30px]",
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

      <div>
        {typeof user?.app_user === "string"
          ? user.app_user
          : user?.app_user?.user_type || "Unknown User Type"}
      </div>

      <div className="flex items-center pr-[20px] md:pr-0 rounded-[30px_10px_10px_30px] md:rounded-0 flex-row-reverse md:flex-row bg-background gap-3">
        <div className="relative flex items-start gap-3">
          <div className="h-full">
            <Search className="w-10 h-10 p-[10px] cursor-pointer animated_cursor bg-white hover:bg-primary rounded-full transition-all duration-300 ease-in-out border border-primary" />
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
    </div>
  );
}

export default ScreenHeader;
