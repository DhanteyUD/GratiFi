import type { ReactNode } from "react";
import { DesktopNavMenu, MobileNavMenu } from "@/components";
import { ScrollLinkedAnimation } from "@/animations";
import BaseLayout from "./BaseLayout";

interface OnboardingLayoutProps {
  menu: { to: string; label?: string; icon?: React.ReactNode }[];
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
  children: ReactNode;
}

function OnboardingLayout({
  menu,
  canLogin = false,
  canSignup = false,
  animateNav = false,
  children,
}: OnboardingLayoutProps) {
  return (
    <BaseLayout>
      <MobileNavMenu menu={menu} canLogin={canLogin} canSignup={canSignup} />
      <DesktopNavMenu
        menu={menu}
        canLogin={canLogin}
        canSignup={canSignup}
        animateNav={animateNav}
      />
      {children}

      <ScrollLinkedAnimation />
    </BaseLayout>
  );
}

export default OnboardingLayout;
