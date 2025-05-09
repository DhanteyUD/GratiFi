import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Cog, Star, Users, CircleHelp } from "lucide-react";
import UseScreenSize from "@/hooks/UseScreenSize";
import GratiFiLogo from "@/assets/image/gratifi-logo.png";

const menuItems = [
  { to: "how-it-works", label: "How It Works", icon: <Cog size={18} /> },
  { to: "features", label: "Features", icon: <Star size={18} /> },
  { to: "community", label: "Community", icon: <Users size={18} /> },
  { to: "faqs", label: "FAQs", icon: <CircleHelp size={18} /> },
];

// Framer Motion variants for icon scale/fade
const iconVariants = {
  rest: { scale: 0, opacity: 0 },
  hover: { scale: 1, opacity: 1 },
};
const iconTransition = { type: "spring", stiffness: 300, damping: 20 };

export const DesktopNavMenu = ({
  canLogin = false,
  canSignup = false,
  animateNav = false,
}: {
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
}) => {
  const { lg } = UseScreenSize();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-10 z-20 flex w-[85%] h-[60px] items-center justify-between rounded-full bg-white px-4 ${
        animateNav ? "jello-horizontal" : ""
      }`}
    >
      {/* Logo */}
      <div
        className={`flex h-10 items-center pl-2 ${
          lg ? "justify-start gap-[100px]" : "justify-between gap-2"
        } w-auto`}
      >
        <div
          className="logo animated_cursor flex cursor-pointer items-center gap-2"
          onClick={() => navigate("/")}
        >
          <img alt="GratiFi logo" src={GratiFiLogo} className="h-8 w-8" />
          <h1 className="text-2xl font-normal text-main font-calSans">
            GratiFi
          </h1>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-[5px]">
        {menuItems.map((item) => (
          <motion.div
            key={item.to}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative"
          >
            <Link
              to={item.to}
              smooth
              duration={500}
              className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer hover:bg-primaryHover transition-colors duration-300 ease-linear"
            >
              <motion.span
                variants={iconVariants}
                transition={iconTransition}
                className="text-main"
              >
                {item.icon}
              </motion.span>
              <span className="text-main">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Buttons */}
      <div className="flex h-10 items-center gap-4">
        {canLogin && (
          <button
            className="h-10 min-w-[100px] px-4 rounded-full border border-main bg-transparent font-calSans text-main transition-colors hover:bg-main hover:text-white"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        {canSignup && (
          <button
            className="h-10 min-w-[150px] px-4 rounded-full bg-primary hover:bg-primaryHover font-medium font-calSans text-main transition-colors"
            onClick={() => navigate("/select-user-type")}
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};
