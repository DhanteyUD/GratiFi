import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { moreMenuItems } from "@/routes/path";
import { Fan, Star } from "lucide-react";
import { FetchUserProfile } from "@/hooks/UseFetch";
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
  const { profile } = FetchUserProfile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAction = (action: string): void => {
    if (action === "Log out") {
      localStorage.clear();
      sessionStorage.clear();

      navigate("/");
    }
  };

  const renderIcon = (userType: string) => {
    if (userType === "GratiFan") return <Fan size={18} />;
    if (userType === "GratiStar") return <Star size={18} />;
  };

  return (
    <>
      <div className="fixed top-[15px] right-[1.25rem] h-12 bg-[#2a2a2a] rounded-[10px] z-[999] flex items-center justify-center">
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
        <div className="fixed items-start top-[75px] left-[1.25rem] w-[90%] max-h-[80vh] bg-[#2a2a2a] p-5 rounded-[10px] z-[100] flex flex-col gap-4 slide-in-elliptic-top-fwd overflow-auto">
          <div className="flex justify-end w-full">
            <div
              className={clsx(
                "gap-2 justify-center items-center text-main font-calSans h-10 w-auto px-5 bg-secondary rounded-full",
                helperService.isEmptyObject(profile) ? "hidden" : "flex"
              )}
            >
              <p>{profile?.user_type}</p>
              {renderIcon(profile?.user_type || "")}
            </div>
          </div>

          {menu.slice(5).map((item, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-5 rounded-[10px] px-5 py-2 cursor-pointer hover:bg-[#414141] justify-center"
              )}
              onClick={() => handleAction(item.name)}
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
                "flex items-center gap-5 rounded-[10px] px-5 py-2 cursor-pointer hover:bg-[#414141] justify-center"
              )}
              onClick={() => handleAction(item.name)}
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
