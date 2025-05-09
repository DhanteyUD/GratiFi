import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Cog, Star, Users, CircleHelp } from "lucide-react";
import UseScreenSize from "@/hooks/UseScreenSize";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";

const menuItems = [
  { to: "how-it-works", label: "How It Works", icon: <Cog /> },
  { to: "features", label: "Features", icon: <Star /> },
  { to: "community", label: "Community", icon: <Users /> },
  { to: "faqs", label: "FAQs", icon: <CircleHelp /> },
];

export const DesktopNavMenu = ({
  canLogin = false,
  canSignup = false,
  animateNav = false,
}) => {
  const { lg } = UseScreenSize();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-10 z-[2] flex w-[85%] h-[60px] items-center justify-between gap-[10px] rounded-full bg-white px-[12px] scrollbar-hide ${
        animateNav ? "jello-horizontal" : ""
      }`}
    >
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
          <h1 className="text-[25px] font-normal text-main font-calSans">
            GratiFi
          </h1>
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-1 bg-[pink] px-2 text-main">
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={500}
            // className="hidden md:flex items-center gap-[15px] md:gap-[60px] bg-[pink] h-10 px-5 relative z-10 justify-center cursor-pointer"
            className="cursor-pointer"
          >
            <span className="group flex items-center gap-2 hover:bg-primaryHover rounded-full h-10 px-5 transition-all duration-300 ease-linear">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="transition-all duration-300 ease-in-out"
              >
                {item.icon}
              </motion.span>
              <span>{item.label}</span>
            </span>
          </Link>
        ))}
      </nav>

      {/* Buttons */}
      <div className="flex h-10 items-center">
        <div className="flex items-center justify-center gap-[10px]">
          {canLogin && (
            <button
              className="h-10 min-w-[100px] px-5 rounded-full border border-main bg-transparent font-calSans text-main transition-all duration-300 ease-in-out"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
          {canSignup && (
            <button className="h-10 min-w-[150px] px-5 rounded-full bg-primary hover:bg-primaryHover font-medium font-calSans text-main transition-all duration-300 ease-in-out">
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
