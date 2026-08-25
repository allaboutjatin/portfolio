import React, { useCallback, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "./switch";
import { useTheme } from "next-themes";
import { cn } from "../../lib/utils";

export const ThemeSwitch = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => setChecked(resolvedTheme === "dark"), [resolvedTheme]);

  const handleCheckedChange = useCallback(
    (isChecked: boolean) => {
      setChecked(isChecked);
      setTheme(isChecked ? "dark" : "light");
    },
    [setTheme],
  );

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center", // center the whole control
        "h-9 w-20", // track sized to hug the icons
        className
      )}
      {...props}
    >
      {/* The real shadcn Switch (full-size, same structure) */}
      <Switch
        checked={checked}
        onCheckedChange={handleCheckedChange}
        aria-label="Theme switch"
        className={cn(
          // root (track)
          "peer absolute inset-0 h-full w-full rounded-full bg-neutral-800/80 border border-white/20 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // tune the default thumb size & z-index so it slides over icons
          "[&>span]:h-7 [&>span]:w-7 [&>span]:rounded-full [&>span]:bg-white [&>span]:shadow-md [&>span]:z-10",
          // override default translate distances so the thumb moves across 20px track padding + icon spacing
          "data-[state=unchecked]:[&>span]:translate-x-1",
          "data-[state=checked]:[&>span]:translate-x-[44px]" // 44 ≈ w-20(80) - padding - thumb(28)
        )}
      />

      {/* Icons overlaid inside the track, perfectly centered left/right */}
      <span
        className={cn(
          "pointer-events-none absolute left-2.5 inset-y-0 z-0",
          "flex items-center justify-center"
        )}
      >
        <SunIcon
          size={16}
          className={cn(
            "transition-all duration-200 ease-out",
            checked ? "text-neutral-400 opacity-60" : "text-amber-500 scale-110"
          )}
        />
      </span>

      <span
        className={cn(
          "pointer-events-none absolute right-2.5 inset-y-0 z-0",
          "flex items-center justify-center"
        )}
      >
        <MoonIcon
          size={16}
          className={cn(
            "transition-all duration-200 ease-out",
            checked ? "text-sky-300 scale-110" : "text-neutral-400 opacity-60"
          )}
        />
      </span>
    </div>
  );
};

export default ThemeSwitch;
