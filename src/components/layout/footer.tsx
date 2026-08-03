import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <nav aria-label="Footer" className="flex gap-5">
          <a
            className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-secondary)] uppercase transition-colors hover:text-[var(--color-accent)]"
            href={profile.links.github}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-secondary)] uppercase transition-colors hover:text-[var(--color-accent)]"
            href={profile.links.linkedin}
            rel="noreferrer"
            target="_blank"
          >
            LinkedIn
          </a>
          <a
            className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-secondary)] uppercase transition-colors hover:text-[var(--color-accent)]"
            href={`mailto:${profile.email}`}
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}