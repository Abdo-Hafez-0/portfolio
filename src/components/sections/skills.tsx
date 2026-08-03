import { skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <SectionHeading
        eyebrow="04 / Skills"
        heading="Technologies and practices I work with."
        description="A categorized overview of my technical toolkit, from backend frameworks to software engineering principles."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <div
            key={group.title}
            className="border bg-[var(--color-background-elevated)] p-6 sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-dashed pb-4">
              <h3 className="font-mono text-xs tracking-[0.12em] text-[var(--color-text-primary)] uppercase">
                {group.title}
              </h3>
              <span className="font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-5 space-y-2.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex gap-2.5 text-sm leading-6 text-[var(--color-text-secondary)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1 shrink-0 bg-[var(--color-accent)]"
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}