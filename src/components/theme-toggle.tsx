"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        size="icon-sm"
        variant="outline"
        className="border-primary text-primary hover:text-primary"
        aria-label="Toggle theme"
      />
    );
  }

  return (
    <Button
      size="icon-sm"
      variant="outline"
      className="border-primary text-primary hover:text-primary"
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </Button>
  );
}
