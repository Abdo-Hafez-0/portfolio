import { timeline } from "@/content/timeline";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Timeline() {
  return (
    <Section id="timeline" aria-labelledby="timeline-heading">
      <SectionHeading
        eyebrow="03 / Timeline"
        heading="Education and project history."
        description="A chronological record of my academic background and the systems I've built."
      />

      <ol className="mt-14 space-y-0">
        {timeline.map((entry, index) => (
          <li
            key={`${entry.title}-${index}`}
            className="relative grid gap-4 border-l border-[var(--color-border-subtle)] pb-12 pl-8 last:pb-0 sm:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] sm:gap-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[5px] size-2.5 bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)]"
            />

            <div>
              <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)] uppercase">
                {entry.period}
              </p>
              {entry.subtitle ? (
                <p className="mt-2 font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                  {entry.subtitle}
                </p>
              ) : null}
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-2xl">
                {entry.title}
              </h3>
              <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
                {entry.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}