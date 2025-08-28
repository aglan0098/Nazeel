import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "h-4 w-full rounded-md bg-gray-100 dark:bg-gray-300 animate-pulse border-none",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
