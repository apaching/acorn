import { Nut } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export default function AuthHeader() {
  return (
    <header className="flex justify-between flex-row w-full p-6">
      <div className="bg-primary items-center justify-center flex h-6 w-6 rounded-full">
        <Nut className="size-4 text-primary-foreground" />
      </div>
      <ThemeToggle />
    </header>
  );
}
