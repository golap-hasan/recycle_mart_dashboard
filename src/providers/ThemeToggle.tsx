"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {mounted ? (
          isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
        ) : (
          <div className="w-5 h-5" />
        )}
      </Button>
    </>
  );
};

export default ThemeToggle;
