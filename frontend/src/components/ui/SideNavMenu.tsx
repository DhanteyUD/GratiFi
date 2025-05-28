import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { moreMenuItems } from "@/routes/path";
import { UseAppContext } from "@/hooks/UseAppContext";
import Tooltip from "./Tooltip";
import clsx from "clsx";

interface MenuItem {
  path: string;
  name: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

interface SideNavMenuProps {
  menu: MenuItem[];
  isSideNavCollapsed: boolean;
}

export const SideNavMenu: React.FC<SideNavMenuProps> = ({
  menu = [],
  isSideNavCollapsed,
}) => {
  const { user } = UseAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const username = user.app_user.email.split("@")[0];

  const [parentIndex, setParentIndex] = useState<number | null>(null);
  const [parentPath, setParentPath] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const [showMore, setShowMore] = useState<boolean>(true);

  useEffect(() => {
    menu.forEach((item, index) => {
      if (item.children) {
        item.children.forEach((child) => {
          const childPath = `${item.path}${child.path}`;
          if (path === childPath) {
            setParentIndex(index);
            setParentPath(item.path);
            setOpenMenus((prev) => ({ ...prev, [index]: true }));
          }
        });
      }
    });
  }, [path, menu]);

  const handleToggle = useCallback((index: number): void => {
    setOpenMenus((prev: Record<number, boolean>) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }, []);

  const handleNavigation = (
    index: number,
    itemPath: string,
    hasChildren: boolean
  ): void => {
    if (hasChildren) return handleToggle(index);

    if (itemPath === "/profile" && user?.app_user?.email) {
      navigate(`/${username}`, {
        state: { name: user.app_user.name, email: user.app_user.email },
      });

      return;
    }

    navigate(itemPath);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full overflow-auto gap-8">
      <div className="flex flex-col items-center gap-2 w-full">
        {menu.length > 0 &&
          menu.map((item, index) => {
            const isProfileMatch =
              item.path === "/profile" && location.pathname === `/${username}`;
            const isChildMatch =
              parentIndex === index && path.includes(parentPath || "");

            const isActive =
              path === item.path || isProfileMatch || isChildMatch;

            const hasChildren = !!(item.children && item.children.length > 0);
            const isOpen = openMenus[index];

            const handleClick = () => {
              setParentIndex(index);
              setParentPath(item.path);
              handleNavigation(index, item.path, hasChildren);
            };

            return (
              <React.Fragment key={item.path}>
                <div
                  className={clsx(
                    "relative group flex items-center justify-center gap-5 w-full h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main dark:text-primary hover:bg-primaryHover/50 dark:hover:bg-darkHover/50 hover:text-main",
                    isActive &&
                      "font-[700] bg-primaryHover dark:bg-main text-main hover:!bg-primaryHover dark:hover:!bg-main hover:text-main"
                  )}
                  onClick={handleClick}
                >
                  <item.icon className="w-5 h-5" />
                  <div
                    className={clsx(
                      "hidden lg:block truncate min-w-[130px] lg:min-w-[100px] xl:min-w-[130px]",
                      isSideNavCollapsed && "!hidden"
                    )}
                  >
                    {item.name}
                  </div>

                  <Tooltip
                    label={item.name}
                    className={isSideNavCollapsed ? "flex" : "flex lg:hidden"}
                  />

                  {hasChildren && (
                    <ChevronDown
                      className={clsx(
                        "hidden md:flex absolute right-4 transition-transform",
                        isOpen ? "rotate-0" : "-rotate-90"
                      )}
                    />
                  )}
                </div>

                {hasChildren && isOpen && (
                  <div className="flex flex-col pr-2 w-full ml-14 mt-1 transition-all">
                    {item.children?.map((child) => {
                      const childPath = `${item.path}${child.path}`;
                      const isChildActive = path === childPath;

                      return (
                        <div
                          key={childPath}
                          className="relative h-[45px] text-sm text-white cursor-pointer transition-all border-l border-b border-[#717171]"
                          onClick={() => navigate(childPath)}
                        >
                          <div
                            className={clsx(
                              "absolute bottom-[-22.5px] right-0 flex items-center h-[49px] px-4 w-[140px] bg-[#2a2a2a] text-ellipsis whitespace-nowrap overflow-hidden rounded-[10px] border-4 border-[#2a2a2a]",
                              isChildActive &&
                                "bg-[#414141] font-medium static w-full justify-center border-none"
                            )}
                          >
                            {child.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>

      <div className="bg-white dark:bg-dark3 sticky bottom-0 flex flex-col gap-4 p-2 border-t border-primary dark:border-primary/50">
        <div
          className="flex items-center justify-center gap-3 w-full !h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main dark:text-primary hover:bg-primaryHover/50 dark:hover:bg-main/50 hover:text-main dark:hover:text-primary"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <ChevronDown
            className={clsx(
              "w-5 h-5 transition-transform",
              showMore ? "rotate-0" : "-rotate-90"
            )}
          />
          <div
            className={clsx(
              "hidden lg:block truncate min-w-[130px] lg:min-w-[100px] xl:min-w-[120px]",
              isSideNavCollapsed && "!hidden"
            )}
          >
            More
          </div>
        </div>

        {showMore && (
          <div className="flex flex-col items-center gap-2 w-full">
            {moreMenuItems.map((item, index) => {
              const handleAction = (action: string): void => {
                if (action === "Log out") {
                  localStorage.clear();
                  sessionStorage.clear();

                  navigate("/");
                } else {
                  if ("path" in item && item.path) {
                    if (item.path) {
                      navigate(`/${item.path}`);
                    }
                  }
                }
              };

              return (
                <div
                  key={index}
                  className="relative group flex items-center justify-center gap-3 w-full h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main dark:text-primary hover:bg-primaryHover/50 dark:hover:bg-main/50 hover:text-main dark:hover:text-primary"
                  onClick={() => handleAction(item.name)}
                >
                  <item.icon
                    className={clsx(
                      "w-5 h-5",
                      item.name === "Log out" && "text-compulsory"
                    )}
                  />
                  <p
                    className={clsx(
                      "hidden lg:block truncate min-w-[130px] lg:min-w-[100px] xl:min-w-[130px]",
                      item.name === "Log out" && "text-compulsory",
                      isSideNavCollapsed && "!hidden"
                    )}
                  >
                    {item.name}
                  </p>

                  <Tooltip
                    label={item.name}
                    className={isSideNavCollapsed ? "flex" : "flex lg:hidden"}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
