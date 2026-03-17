"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    setTheme(isDark ? "light" : "dark");
  };
  if (!mounted) return null;

  return (
    <Button variant="default" size="icon" onClick={toggleDarkMode}>
      {isDark ? <Moon /> : <Sun />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
