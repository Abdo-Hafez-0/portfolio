"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/ui/theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--color-background)]/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8 lg:px-10"
      >
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2.5 font-mono text-sm font-medium whitespace-nowrap tracking-[0.12em] text-[var(--color-text-primary)] uppercase transition-colors hover:text-[var(--color-accent)]"
        >
          <Image
            src="/Logo.png"
            alt=""
            width={42}
            height={28}
            className="size-7 object-contain"
          />
          <span>
            A.Hafez
            <span className="hidden text-[var(--color-text-muted)] xl:inline">
              {" "}
              {"//"} mission control
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-5 md:flex lg:gap-6">
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                className="font-mono text-xs tracking-[0.1em] whitespace-nowrap text-[var(--color-text-secondary)] uppercase transition-colors hover:text-[var(--color-accent)]"
                href={link.href}
              >
                <span className="text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="flex size-9 items-center justify-center border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
              {open ? (
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <ul
          id="mobile-menu"
          className="border-t border-dashed px-6 py-2 sm:px-8 md:hidden"
        >
          {links.map((link, index) => (
            <li key={link.href}>
              <a
                className="flex items-center gap-3 py-3 font-mono text-sm tracking-[0.1em] text-[var(--color-text-primary)] uppercase"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <span className="text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
