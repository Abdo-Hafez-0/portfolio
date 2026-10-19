import Image from "next/image";

import { profile } from "@/content/profile";
import { projects, universityProjects } from "@/content/projects";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { LinkButton } from "@/components/ui/link-button";
import { UtcClock } from "@/components/ui/utc-clock";

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

const stats = [
  {
    label: "Missions",
    value: String(projects.length + universityProjects.length).padStart(2, "0"),
    highlight: true,
  },
  { label: "GPA", value: "3.64" },
  { label: "Primary stack", value: ".NET" },
  { label: "Class of", value: "2026" },
];

const RANGE_TICKS = [
  "top-[30%] left-0 h-px w-3",
  "top-[30%] right-0 h-px w-3",
  "top-0 left-1/2 h-3 w-px",
  "bottom-0 left-1/2 h-3 w-px",
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative px-5 py-8 sm:px-10 sm:py-12">
          <CornerBrackets />

          {/* Telemetry bar */}
          <div
            aria-hidden="true"
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="rec-dot" /> Rec · sys online
            </span>
            <span className="hidden sm:inline">27.18°N 31.18°E · Assiut</span>
            <UtcClock />
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                {profile.role}
              </p>

              <h1
                id="hero-heading"
                className="display mt-5 text-[4.5rem] leading-[0.85] text-[var(--color-text-primary)] sm:text-[clamp(6rem,12vw,9.5rem)]"
              >
                <span aria-hidden="true">
                  A. HAFEZ<span className="signal-cursor">_</span>
                </span>
                <span className="sr-only">
                  {profile.name}, {profile.role}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-xl leading-snug text-[var(--color-text-primary)] sm:text-2xl">
                Building reliable systems, one API at a time.
              </p>
              <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
                {profile.summary} My focus is ASP.NET Core, SQL Server, Entity
                Framework Core, and clean, maintainable architecture.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <LinkButton href={`mailto:${profile.email}`}>
                  › Initiate contact
                </LinkButton>
                <LinkButton
                  href="/Abdulrahman_Hafez_Hasan_CV_2026.pdf"
                  download="Abdulrahman_Hafez_Hasan_CV_2026.pdf"
                  variant="secondary"
                >
                  Download CV
                </LinkButton>
                <LinkButton
                  href={profile.links.github}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  GitHub <ArrowUpRight />
                </LinkButton>
                <LinkButton
                  href={profile.links.linkedin}
                  rel="noreferrer"
                  target="_blank"
                  variant="secondary"
                >
                  LinkedIn <ArrowUpRight />
                </LinkButton>
              </div>
            </div>

            {/* Target-lock portrait */}
            <aside className="order-1 mx-auto w-full max-w-[18rem] lg:order-2 lg:max-w-none">
              <div className="border bg-[var(--color-background-elevated)] p-3">
                <div className="flex items-center justify-between font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  <span>Subject ID</span>
                  <span>01 / 01</span>
                </div>

                <div className="relative mt-3 aspect-[4/5] overflow-hidden border border-dashed">
                  <Image
                    src="/profile-picture.jpg"
                    alt={`Portrait of ${profile.name}`}
                    width={640}
                    height={962}
                    priority
                    className="h-full w-full object-cover grayscale"
                  />
                  {/* Range ticks on the frame edges, aligned to the face */}
                  {RANGE_TICKS.map((position) => (
                    <span
                      key={position}
                      aria-hidden="true"
                      className={`absolute bg-[var(--color-accent)] ${position}`}
                    />
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  <span>{profile.name}</span>
                  <span className="flex items-center gap-1.5">
                    Lock <span className="rec-dot" />
                  </span>
                </div>
              </div>
            </aside>
          </div>

          {/* Stat readouts */}
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={[
                  "border bg-[var(--color-background-elevated)] px-4 py-3",
                  stat.highlight ? "border-[var(--color-accent)]" : "",
                ].join(" ")}
              >
                <dt className="font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                  {stat.label}
                </dt>
                <dd
                  className={[
                    "display mt-1 text-4xl leading-none",
                    stat.highlight
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
