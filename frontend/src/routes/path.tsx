import {
  Cog,
  Star,
  Users,
  UsersRound,
  CircleHelp,
  HomeIcon,
  Compass,
  MessageCircle,
  Wallet,
  Bell,
  Gift,
  UserRound,
  Settings,
  BarChart,
  Clock,
  UserCheck,
  Power,
  Bookmark,
  Briefcase,
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
  { name: "Explore", path: "explore", icon: Compass },
  { name: "Messages", path: "messages", icon: MessageCircle },
  { name: "Wallet", path: "wallet", icon: Wallet },
  { name: "Notifications", path: "notifications", icon: Bell },
  { name: "Bookmarks", path: "bookmarks", icon: Bookmark },
  { name: "Communities", path: "communities", icon: UsersRound },
  { name: "Profile", path: "profile", icon: UserRound },
];

const gratiStarExtras: MenuItem[] = [
  { name: "Tips Received", path: "tips", icon: Gift },
  { name: "My Supporters", path: "supporters", icon: Users },
  { name: "Analytics", path: "analytics", icon: BarChart },
];

const gratiFanExtras: MenuItem[] = [
  { name: "Support History", path: "support-history", icon: Clock },
  { name: "My Creators", path: "creators", icon: UserCheck },
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

export const moreMenuItems = [
  { name: "Jobs", path: "jobs", icon: Briefcase },
  { name: "Settings & Privacy", path: "settings", icon: Settings },
  {
    name: "Log out",
    icon: Power,
  },
];
