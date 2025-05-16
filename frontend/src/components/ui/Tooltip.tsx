import clsx from "clsx";

interface TooltipProps {
  label: string;
  className?: string;
}

function Tooltip({ label, className }: TooltipProps) {
  return (
    <div
      className={clsx(
        "absolute -bottom-10 left-1/2 z-[2] w-max -translate-x-1/2 scale-0 transform rounded bg-main px-2 py-1 text-xs text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 font-calSans",
        className
      )}
    >
      {label}
    </div>
  );
}

export default Tooltip;
