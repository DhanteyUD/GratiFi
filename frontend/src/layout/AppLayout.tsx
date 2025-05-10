import type { ReactNode } from "react";
import { DesktopNavMenu, MobileNavMenu } from "@/components";
import { ScrollLinkedAnimation } from "@/animations";
import ScreenLayout from "./ScreenLayout";

interface AppLayoutProps {
  menu: { to: string; label?: string; icon?: React.ReactNode }[];
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
  children: ReactNode;
}

function AppLayout({
  menu,
  canLogin = false,
  canSignup = false,
  animateNav = false,
  children,
}: AppLayoutProps) {
  return (
    <ScreenLayout>
      <MobileNavMenu menu={menu} canLogin={canLogin} canSignup={canSignup} />
      <DesktopNavMenu
        menu={menu}
        canLogin={canLogin}
        canSignup={canSignup}
        animateNav={animateNav}
      />
      {children}

      <ScrollLinkedAnimation />
    </ScreenLayout>
  );
}

export default AppLayout;
