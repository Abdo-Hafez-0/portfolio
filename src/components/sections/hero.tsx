import { profile } from "@/content/profile";
import { LinkButton } from "@/components/ui/link-button";

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-1px)] items-center overflow-hidden border-b"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] lg:items-center lg:gap-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
            Available for opportunities
          </p>

          <p className="mt-9 font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
            {profile.role}
          </p>
          <h1
            id="hero-heading"
            className="display mt-4 max-w-3xl text-balance text-[3.5rem] leading-[0.96] text-[var(--color-text-primary)] sm:text-[clamp(4.5rem,9vw,7.5rem)]"
          >
            Building reliable systems, one API at a time.
          </h1>
          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg sm:leading-8">
            {profile.summary} My focus is ASP.NET Core, SQL Server, Entity
            Framework Core, and clean, maintainable architecture.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={`mailto:${profile.email}`}>
              Start a conversation <ArrowUpRight />
            </LinkButton>
            <LinkButton
              href={profile.links.github}
              rel="noreferrer"
              target="_blank"
              variant="secondary"
            >
              View GitHub <ArrowUpRight />
            </LinkButton>
            <LinkButton
              href="/Abdulrahman_Hafez_Hasan_CV_2026.pdf"
              download="Abdulrahman_Hafez_Hasan_CV_2026.pdf"
              variant="secondary"
            >
              Download CV
            </LinkButton>
          </div>

          <nav aria-label="Professional links" className="mt-11 flex gap-5">
            <a
              className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
              href={profile.links.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            <a
              className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
              href={profile.links.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
              href={`mailto:${profile.email}`}
            >
              Email
            </a>
          </nav>
        </div>

        <aside className="relative mx-auto w-full max-w-md lg:ml-auto">
          <div className="absolute -inset-px bg-[var(--color-accent)] opacity-20 blur-2xl" />
          <div className="relative aspect-[4/5] border bg-[var(--color-background-elevated)] p-6 sm:p-8">
            <div className="flex h-full flex-col justify-between border border-dashed p-5 sm:p-6">
              <div className="flex items-center justify-between font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                <span>Identity panel</span>
                <span>01 / 01</span>
              </div>

              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)] uppercase">
                  Portrait pending
                </p>
                <p className="mt-3 max-w-52 text-xl font-medium tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-2xl">
                  {profile.name}
                </p>
              </div>

              <div className="border-t pt-4 font-mono text-[0.625rem] leading-5 tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                <p>System / portfolio</p>
                <p>Focus / backend engineering</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
