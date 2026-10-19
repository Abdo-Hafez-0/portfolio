"use client";

import { useSyncExternalStore } from "react";

import { THEME_STORAGE_KEY } from "@/lib/theme";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerTheme(): Theme {
  return "dark";
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies.
  }
}

const OPTIONS: Theme[] = ["dark", "light"];

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  return (
    <div
      role="group"
      aria-label="Color theme"
      className="flex border border-[var(--color-border-subtle)]"
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={theme === option}
          onClick={() => setTheme(option)}
          className={[
            "px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.12em] uppercase transition-colors",
            theme === option
              ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
          ].join(" ")}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
