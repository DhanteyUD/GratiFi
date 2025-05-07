declare module "@/animations" {
  export function getAnimatedCursor(): JSX.Element;
}

declare module "*.lottie" {
  const value: string;
  export default value;
}
