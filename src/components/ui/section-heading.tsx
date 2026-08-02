import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  heading: ReactNode;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-4xl">
        {heading}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
