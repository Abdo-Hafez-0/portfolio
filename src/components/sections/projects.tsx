import { projects } from "@/content/projects";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Projects() {
  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <SectionHeading
        eyebrow="02 / Projects"
        heading="Systems I've designed and built."
        description="A selection of projects where I focused on backend architecture, scalable APIs, and reliable data access."
      />

      <div className="mt-14 space-y-6">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="border bg-[var(--color-background-elevated)]"
          >
            <div className="flex items-center justify-between border-b border-dashed px-6 py-4 font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase sm:px-8">
              <span>
                {String(index + 1).padStart(2, "0")} / {project.name}
              </span>
              {project.role ? <span>{project.role}</span> : null}
            </div>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-4 text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[var(--color-border-subtle)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--color-text-secondary)] uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)] uppercase">
                  Problems solved
                </p>
                <ul className="mt-4 space-y-3">
                  {project.problemsSolved.map((problem) => (
                    <li
                      key={problem}
                      className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 bg-[var(--color-accent)]"
                      />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}