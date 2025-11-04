"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      Light
    </Button>
  );
}
