declare module "@/animations" {
  export function getAnimatedCursor(): JSX.Element;
  export function ScrollLinkedAnimation(): JSX.Element;
}

declare module "*.lottie" {
  const value: string;
  export default value;
}
