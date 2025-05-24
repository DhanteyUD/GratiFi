import {
  Cog,
  Star,
  Users,
  // UsersRound,
  CircleHelp,
  HomeIcon,
  // Compass,
  MessageCircle,
  Wallet,
  // Bell,
  // Gift,
  UserRound,
  Settings,
  // BarChart,
  // Clock,
  Power,
  // Bookmark,
  // Briefcase,
  // Sparkles,
  // HeartPlus,
  User,
  LogOut,
} from "lucide-react";

export const landingPageMenuItems = [
  { to: "how-it-works", label: "How It Works", icon: <Cog size={18} /> },
  { to: "features", label: "Features", icon: <Star size={18} /> },
  { to: "community", label: "Community", icon: <Users size={18} /> },
  { to: "faqs", label: "FAQs", icon: <CircleHelp size={18} /> },
];

export interface MenuItem {
  path: string;
  name: string;
  icon: React.ElementType;
  children?: MenuItem[];
}

const generatePath = (base: string, items: MenuItem[]): MenuItem[] => {
  return items.map((item) => ({
    path: `${base}/${item.path}`,
    name: item.name,
    icon: item.icon,
    children: item.children || [],
  }));
};

const sharedMenuItems: MenuItem[] = [
  { name: "Home", path: "home", icon: HomeIcon },
  // { name: "Explore", path: "explore", icon: Compass },
  // { name: "Notifications", path: "notifications", icon: Bell },
  { name: "Wallet", path: "wallet", icon: Wallet },
  { name: "Messages", path: "messages", icon: MessageCircle },
  // { name: "Bookmarks", path: "bookmarks", icon: Bookmark },
  // { name: "Communities", path: "communities", icon: UsersRound },
  { name: "Profile", path: "profile", icon: UserRound },
];

const gratiStarExtras: MenuItem[] = [
  // { name: "Tips Received", path: "tips", icon: Gift },
  // { name: "My GratiFans", path: "supporters", icon: HeartPlus },
  // { name: "Analytics", path: "analytics", icon: BarChart },
];

const gratiFanExtras: MenuItem[] = [
  // { name: "Support History", path: "history", icon: Clock },
  // { name: "My GratiStars", path: "creators", icon: Sparkles },
];

export const getScreenMenuItems = (userType: "GratiStar" | "GratiFan") => {
  const roleExtras =
    userType === "GratiStar"
      ? gratiStarExtras
      : userType === "GratiFan"
      ? gratiFanExtras
      : [];
  return generatePath("", [...sharedMenuItems, ...roleExtras]);
};

export const headerNavMenuItems = [
  { label: "Your Profile", path: "profile", icon: User },
  { label: "Settings", path: "settings", icon: Settings },
  {
    label: "Sign out",
    path: "",
    icon: LogOut,
  },
];

export const moreMenuItems = [
  // { name: "Jobs", path: "jobs", icon: Briefcase },
  { name: "Settings & Privacy", path: "settings", icon: Settings },
  {
    name: "Log out",
    icon: Power,
  },
];
