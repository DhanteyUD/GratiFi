import type { ReactNode } from "react";
import UseScreenSize from "@/hooks/UseScreenSize";
import ScreenLayout from "./ScreenLayout";
import { DesktopNavMenu, MobileNavMenu } from "@/components";

function AppLayout({
  canLogin = false,
  canSignup = false,
  animateNav = false,
  children,
}: {
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
  children: ReactNode;
}) {
  const { md } = UseScreenSize();

  return (
    <ScreenLayout>
      {md ? (
        <MobileNavMenu canLogin={canLogin} canSignup={canSignup} />
      ) : (
        <DesktopNavMenu
          canLogin={canLogin}
          canSignup={canSignup}
          animateNav={animateNav}
        />
      )}
      {children}
    </ScreenLayout>
  );
}

export default AppLayout;
