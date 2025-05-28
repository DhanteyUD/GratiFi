import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAppContext } from "@/hooks/UseAppContext";
import clsx from "clsx";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MobileActionMenuProps {
  menu?: MenuItem[];
}

function MobileActionMenu({ menu = [] }: MobileActionMenuProps) {
  const { user } = UseAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const username = user?.app_user?.email?.split("@")[0];

  const handleNavigation = (itemPath: string) => {
    if (itemPath === "/profile" && user?.app_user?.email) {
      navigate(`/${username}`, {
        state: { name: user.app_user.name, email: user.app_user.email },
      });
    } else {
      navigate(itemPath);
    }
  };

  return (
    <nav className="fixed bottom-0 w-full h-[83px] bg-[#2a2a2a] border-t border-[rgba(134,146,166,0.1)] z-[100] flex justify-around items-center px-[10px] shadow-md">
      <div className="flex items-center justify-center w-full h-full py-0">
        {menu.slice(0, 5).map((item, index) => {
          const isProfileMatch =
            item.path === "/profile" && location.pathname === `/${username}`;

          const isActive = path === item.path || isProfileMatch;

          return (
            <div
              key={index}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full gap-2 text-white text-[10px] font-normal leading-[12.1px] tracking-[-0.24px] py-[5px] cursor-pointer",
                isActive
                  ? "font-semibold border-t-[6px] border-primary"
                  : "border-t-[6px] border-transparent"
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon
                className={clsx(
                  "w-6 h-6",
                  isActive && "jello-horizontal text-primary"
                )}
              />
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileActionMenu;
