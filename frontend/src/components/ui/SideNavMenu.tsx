import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { moreMenuItems } from "@/routes/path";
import clsx from "clsx";
import storageService from "@/services/storage.service";

interface MenuItem {
  path: string;
  name: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

interface SideNavMenuProps {
  menu: MenuItem[];
}

export const SideNavMenu: React.FC<SideNavMenuProps> = ({ menu = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

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
    if (hasChildren) {
      handleToggle(index);
    } else {
      navigate(itemPath);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full overflow-auto gap-8">
      <div className="flex flex-col items-center gap-2 w-full">
        {menu.length
          ? menu.map((item, index) => {
              const isActive =
                path === item.path ||
                (parentIndex === index && path.includes(parentPath || ""));
              const hasChildren = item.children && item.children.length > 0;

              return (
                <React.Fragment key={index}>
                  <div
                    className={clsx(
                      "relative flex items-center justify-center gap-5 w-full h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main hover:bg-primaryHover/50 hover:text-main",
                      isActive &&
                        "font-[700] bg-primaryHover text-main hover:!bg-primaryHover hover:text-main"
                    )}
                    onClick={() => {
                      setParentIndex(index);
                      setParentPath(item.path);
                      handleNavigation(index, item.path, !!hasChildren);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="hidden md:flex truncate min-w-[130px]">
                      {item.name}
                    </div>

                    {hasChildren && (
                      <ChevronDown
                        className={`hidden md:flex absolute right-4 transition-transform ${
                          openMenus[index] ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    )}
                  </div>

                  {hasChildren && openMenus[index] && (
                    <div
                      className={clsx(
                        "flex flex-col pr-2 w-full ml-14 mt-1 transition-all"
                      )}
                    >
                      {item.children?.map((child, childIndex) => {
                        const childPath = `${item.path}${child.path}`;
                        const isChildActive = path === childPath;

                        return (
                          <div
                            key={childIndex}
                            className={clsx(
                              "relative h-[45px] text-sm text-white cursor-pointer transition-all border-l border-b border-[#717171]"
                            )}
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
            })
          : null}
      </div>

      <div className="bg-white sticky bottom-0 flex flex-col gap-4 p-2 border-t-4 border-primary">
        <div
          className="flex items-center justify-center gap-3 w-full !h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main hover:bg-primaryHover/50 hover:text-main"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <ChevronDown
            className={clsx(
              "w-5 h-5 transition-transform",
              showMore ? "rotate-0" : "-rotate-90"
            )}
          />
          <p className="hidden md:flex truncate min-w-[120px]">More</p>
        </div>

        {showMore && (
          <div className="flex flex-col items-center gap-2 w-full">
            {moreMenuItems.map((item, index) => {
              const handleAction = (action: string): void => {
                if (action === "Log out") {
                  sessionStorage.clear();
                  storageService.clearStorage();

                  navigate("/");
                }
              };

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center gap-3 w-full h-[45px] cursor-pointer animated_cursor transition-all duration-300 ease-in-out rounded-full text-main hover:bg-primaryHover/50 hover:text-main"
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
                      "hidden md:flex truncate min-w-[120px]",
                      item.name === "Log out" && "text-compulsory"
                    )}
                  >
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
