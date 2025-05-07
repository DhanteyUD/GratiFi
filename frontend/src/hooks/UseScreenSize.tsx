import { useWindowSize } from "react-hooks-window-size";

function UseScreenSize() {
  const { width } = useWindowSize();

  return {
    sm: width < 640,
    md: width < 768,
    lg: width < 980,
    xl: width < 1024,
    xxl: width > 1280,
  };
}

export default UseScreenSize;
