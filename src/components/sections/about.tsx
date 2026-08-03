import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <Section id="about" aria-labelledby="about-heading">
      <SectionHeading
        eyebrow="01 / About"
        heading="Backend engineering, built on clean architecture."
        description="I'm a Backend .NET Developer with a Bachelor's degree in Computer Science (Information Systems) from Assiut University (GPA: 3.64). I enjoy designing scalable backend systems and building reliable APIs that solve real-world problems."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-5 text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
          <p>
            My primary focus is on ASP.NET Core, Entity Framework Core, SQL
            Server, REST APIs, authentication and authorization, and software
            architecture. I value clean, maintainable code and enjoy working on
            projects that require thoughtful system design and collaboration.
          </p>
          <p>
            In addition to backend development, I'm familiar with frontend
            technologies such as React and JavaScript and can work across the
            full stack when needed. I also use Git for version control and
            leverage AI-assisted development tools to improve productivity and
            software quality.
          </p>
        </div>

        <div className="border bg-[var(--color-background-elevated)] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-dashed pb-4 font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase">
            <span>Profile data</span>
            <span>01 / 01</span>
          </div>
          <dl className="mt-6 space-y-5">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                Degree
              </dt>
              <dd className="text-right text-sm text-[var(--color-text-primary)]">
                B.Sc. Computer Science
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                University
              </dt>
              <dd className="text-right text-sm text-[var(--color-text-primary)]">
                Assiut University
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                GPA
              </dt>
              <dd className="text-right text-sm text-[var(--color-accent)]">
                3.64 / 4.00
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-mono text-xs tracking-[0.1em] text-[var(--color-text-muted)] uppercase">
                Focus
              </dt>
              <dd className="text-right text-sm text-[var(--color-text-primary)]">
                Backend Engineering
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}