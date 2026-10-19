import { skillGroups } from "@/content/skills";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <SectionHeading
        index="04"
        label="Systems check"
        meta={
          <span className="flex items-center gap-2">
            <span className="rec-dot" /> All systems nominal
          </span>
        }
        id="skills-heading"
        heading="Tools on board."
        description="A categorized overview of my technical toolkit, from backend frameworks to software engineering principles."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <div
            key={group.title}
            className="border bg-[var(--color-background-elevated)] p-5 sm:p-6"
          >
            <div className="flex items-center justify-between border-b border-dashed pb-3 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
              <h3 className="text-[var(--color-text-primary)]">
                <span className="text-[var(--color-text-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                {group.title}
              </h3>
              <span className="text-[var(--color-accent)]">Go</span>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="border border-[var(--color-border-subtle)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.06em] text-[var(--color-text-secondary)]"
                >
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
