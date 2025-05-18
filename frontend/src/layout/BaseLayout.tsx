// import { getAnimatedCursor } from "@/animations";
// import UseScreenSize from "@/hooks/UseScreenSize";
import type { ReactNode } from "react";

function BaseLayout({ children }: { children: ReactNode }) {
  // const { md } = UseScreenSize();

  return (
    <>
      {/* {!md && getAnimatedCursor()} */}
      <div className="bg-background dark:bg-dark3 flex flex-col w-full h-auto transition-colors duration-300">
        <div className="relative overflow-hidden flex flex-col items-center w-full h-full">
          {children}
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
