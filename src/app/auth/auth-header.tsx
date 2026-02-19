import { Nut } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

export default function AuthHeader() {
  return (
    <header className="flex w-full flex-row justify-between p-10">
      <div className="flex flex-row gap-2">
        <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
          <Nut className="text-primary-foreground size-4" />
        </div>
        <p className="font-medium">Acorn</p>
      </div>
    </header>
  );
}
