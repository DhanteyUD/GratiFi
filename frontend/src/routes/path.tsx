import { Cog, Star, Users, CircleHelp, HomeIcon } from "lucide-react";

export const landingPageMenuItems = [
  { to: "how-it-works", label: "How It Works", icon: <Cog size={18} /> },
  { to: "features", label: "Features", icon: <Star size={18} /> },
  { to: "community", label: "Community", icon: <Users size={18} /> },
  { to: "faqs", label: "FAQs", icon: <CircleHelp size={18} /> },
];

interface MenuItem {
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

export const screenMenuItems = generatePath("", [
  {
    name: "Home",
    path: "home",
    icon: HomeIcon,
  },
]);
