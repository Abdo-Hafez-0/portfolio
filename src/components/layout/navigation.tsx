import { profile } from "@/content/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#timeline", label: "Timeline" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-[var(--color-background)]/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10"
      >
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-[0.12em] text-[var(--color-text-primary)] uppercase transition-colors hover:text-[var(--color-accent)]"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-secondary)] uppercase transition-colors hover:text-[var(--color-accent)]"
                href={link.href}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          className="hidden font-mono text-xs tracking-[0.1em] text-[var(--color-accent)] uppercase sm:inline-flex"
          href={`mailto:${profile.email}`}
        >
          Contact
        </a>
      </nav>
    </header>
  );
}