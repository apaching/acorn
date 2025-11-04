import ToggleTheme from "@/components/test";

export default function Home() {
  return (
    <div>
      <p className="text-4xl font-bold pb-8">
        Hello <span className="text-primary">World</span>
      </p>
      <ToggleTheme />
    </div>
  );
}
