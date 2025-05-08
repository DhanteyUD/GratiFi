import type { ReactNode } from "react";
import UseScreenSize from "@/hooks/UseScreenSize";
import ScreenLayout from "./ScreenLayout";
import { DesktopNavMenu, MobileNavMenu } from "@/components";

function AppLayout({
  path = [],
  canLogin = false,
  canSignup = false,
  animateNav = false,
  children,
}: {
  path?: string[];
  canLogin?: boolean;
  canSignup?: boolean;
  animateNav?: boolean;
  children: ReactNode;
}) {
  const { md } = UseScreenSize();

  return (
    <ScreenLayout>
      {md ? (
        <MobileNavMenu
          menu={path.map((item) => ({
            label: item,
            value: item,
            name: item,
            path: `/${item}`,
          }))}
          canLogin={canLogin}
          canSignup={canSignup}
        />
      ) : (
        <DesktopNavMenu
          menu={path.map((item) => ({
            label: item,
            value: item,
            path: `/${item}`,
          }))}
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
