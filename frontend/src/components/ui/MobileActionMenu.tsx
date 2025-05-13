import { NavLink } from "react-router-dom";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface MobileActionMenuProps {
  menu?: MenuItem[];
}

function MobileActionMenu({ menu = [] }: MobileActionMenuProps) {
  const swappedMenu = [...menu];
  [swappedMenu[2], swappedMenu[4]] = [swappedMenu[4], swappedMenu[2]];

  return (
    <nav className="fixed bottom-0 w-full h-[83px] bg-[#2a2a2a] border-t border-[rgba(134,146,166,0.1)] z-[100] flex justify-around items-center px-[10px] shadow-md">
      <div className="flex items-center justify-center w-full h-full py-2">
        {swappedMenu.slice(0, 5).map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full gap-2 text-white text-[10px] font-normal leading-[12.1px] tracking-[-0.24px] py-[5px] ${
                isActive ? "font-semibold rounded-[10px] bg-[#414141]" : ""
              }`
            }
          >
            <item.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default MobileActionMenu;
