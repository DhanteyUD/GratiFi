import AnimatedCursor from "react-animated-cursor";

export const getAnimatedCursor = () => {
  return (
    <AnimatedCursor
      innerSize={10}
      outerSize={30}
      color="6, 234, 138"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      clickables={[
        "a",
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="search"]',
        'input[type="submit"]',
        'input[type="image"]',
        'input[type="url"]',
        'input[type="radio"]',
        'input[type="checkbox"]',
        "label[for]",
        "select",
        "textarea",
        "button",
        ".link",
        ".animated_cursor",
      ]}
    />
  );
};
