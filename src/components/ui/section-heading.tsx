import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: string;
  level?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <header className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-4xl">
        {heading}
      </Heading>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
