declare module "@/animations" {
  export function AnimatedText(): JSX.Element;
  export function getAnimatedCursor(): JSX.Element;
  export function ScrollLinkedAnimation(): JSX.Element;
}

declare module "*.lottie" {
  const value: string;
  export default value;
}
