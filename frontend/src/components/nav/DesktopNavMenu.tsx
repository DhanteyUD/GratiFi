import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Sun, Moon } from "lucide-react";
import { UseThemeContext } from "@/hooks/UseThemeContext";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";

interface MenuItem {
  to: string;
  label?: string;
  icon?: React.ReactNode;
}

export const DesktopNavMenu = ({
  menu = [] as MenuItem[],
  canLogin = false,
  canSignup = false,
  animateNav = false,
}: {
  menu?: MenuItem[];
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = UseThemeContext();

  const iconVariants = {
    rest: { scale: 0, opacity: 0 },
    hover: { scale: 1, opacity: 1 },
  };

  const iconTransition = { type: "spring", stiffness: 300, damping: 20 };

  return (
    <div
      className={`fixed hidden md:flex top-10 z-20 w-[85%] h-[60px] items-center justify-between rounded-full bg-white dark:bg-dark px-4 transition-colors duration-300 ${
        animateNav ? "jello-horizontal" : ""
      }`}
    >
      {/* Logo */}
      <div
        className=" animated_cursor flex cursor-pointer items-center gap-2 h-10 px-2 "
        onClick={() => navigate("/")}
      >
        <img alt="GratiFi logo" src={GratiFiLogo} className="h-8 w-8" />
        <h1 className="hidden lg:block text-2xl font-normal text-main dark:text-primary font-calSans">
          GratiFi
        </h1>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-[5px]">
        {menu.map((item) => (
          <motion.div
            key={item.to}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative group"
          >
            <Link
              to={item.to}
              smooth
              duration={500}
              className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-primaryHover dark:bg-transparent border border-transparent dark:hover:border dark:hover:border-primary dark:hover:bg-gray-800 transition-colors duration-300 ease-linear"
            >
              <motion.span
                variants={iconVariants}
                transition={iconTransition}
                className="hidden xl:block text-main dark:text-primary"
              >
                {item.icon}
              </motion.span>
              <span className="block lg:hidden text-main dark:text-primary">
                {item.icon}
              </span>
              <span className="hidden lg:block text-main dark:text-primary">
                {item.label}
              </span>
            </Link>

            <div className="block lg:hidden absolute -bottom-10 left-1/2 z-10 w-max -translate-x-1/2 scale-0 transform rounded bg-main px-2 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 font-calSans">
              {item.label}
            </div>
          </motion.div>
        ))}
      </nav>

      {/* Buttons */}
      <div className="flex h-10 items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-main dark:border-primary hover:bg-main dark:hover:bg-gray-800 h-10 w-10 text-main dark:text-primary hover:text-white transition-colors duration-300 ease-linear"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        {canLogin && (
          <button
            className="h-10 min-w-[100px] px-4 rounded-full border border-main dark:border-primary bg-transparent font-calSans text-main dark:text-primary dark:hover:bg-gray-800 transition-colors hover:bg-main hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        {canSignup && (
          <button
            className="h-10 min-w-[150px] px-4 rounded-full bg-primary hover:bg-primaryHover font-medium font-calSans text-main transition-colors"
            onClick={() => navigate("/create-account")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};
