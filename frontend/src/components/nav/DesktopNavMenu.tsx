import { useNavigate } from "react-router-dom";
import UseScreenSize from "@/hooks/UseScreenSize";
import GratiFiLogo from "@/assets/gratifi-logo.png";

interface MenuItem {
  path: string;
  name?: string;
  icon?: React.ReactNode;
}

export const DesktopNavMenu = ({
  menu = [] as MenuItem[],
  canLogin = false,
  canSignup = false,
}) => {
  const { lg } = UseScreenSize();
  const navigate = useNavigate();

  return (
    <div className="fixed top-10 z-[100] flex w-[85%] h-[60px] items-center justify-between gap-[10px] rounded-full bg-white px-[12px] scrollbar-hide">
      <div
        className={`flex h-10 items-center pl-2 ${
          lg ? "justify-start gap-[100px]" : "justify-between gap-2"
        } w-auto`}
      >
        {/* Logo */}
        <div
          className="logo animated_cursor flex cursor-pointer items-center gap-[10px]"
          onClick={() => navigate("/")}
        >
          <img
            alt="GratiFi logo"
            src={GratiFiLogo}
            className="h-[30px] w-[30px]"
          />
          {!lg && (
            <h1 className="text-[25px] font-normal text-black font-calSans">
              GratiFi
            </h1>
          )}
        </div>

        {/* Menu */}
        <div className={`flex items-center ${lg ? "gap-[25px]" : "gap-2"}`}>
          {menu.map((item, index) => (
            <div
              key={index}
              className="flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap px-2 text-sm font-normal text-black transition-all duration-300 hover:text-primary"
              onClick={() => navigate(item.path)}
            >
              {lg ? (
                <div className="nav_icons">{item.icon}</div>
              ) : (
                <div className="nav_title">{item.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex h-10 items-center">
        <div className="flex items-center justify-center gap-[10px]">
          {canLogin && (
            <button
              className="h-10 w-[100px] rounded-full border border-main bg-transparent text-main transition-all duration-300 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {canSignup && (
            <button className="h-10 w-[130px] rounded-full bg-primary hover:bg-primaryHover font-medium text-main transition-all duration-300 ease-in-out">
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
