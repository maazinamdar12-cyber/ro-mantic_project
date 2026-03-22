"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  // 🔴 prevents hydration mismatch
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded bg-[var(--accent)] text-white"
    >
      Toggle Theme
    </button>
  );
}