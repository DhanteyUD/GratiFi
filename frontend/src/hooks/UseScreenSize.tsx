import { useMemo } from "react";
import { useWindowSize } from "react-hooks-window-size";

function useScreenSize() {
  const { width } = useWindowSize();

  return useMemo(() => {
    return {
      sm: width <= 640,
      md: width <= 768,
      lg: width <= 1024,
      xl: width <= 1280,
      "2xl": width >= 1536,
    };
  }, [width]);
}

export default useScreenSize;
