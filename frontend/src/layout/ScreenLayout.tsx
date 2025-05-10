// import { getAnimatedCursor } from "@/animations";
// import useScreenSize from "@/hooks/UseScreenSize";
import type { ReactNode } from "react";

function ScreenLayout({ children }: { children: ReactNode }) {
  // const { md } = useScreenSize();

  return (
    <>
      {/* {!md && getAnimatedCursor()} */}
      <div className="bg-background flex flex-col w-full h-auto">
        <div className="relative overflow-hidden flex flex-col items-center w-full h-full">
          {children}
        </div>
      </div>
    </>
  );
}

export default ScreenLayout;
