import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Two-digit section number, e.g. "01". */
  index: string;
  /** Mission-control label shown after the number. */
  label: string;
  /** Optional readout on the right of the label bar. */
  meta?: ReactNode;
  id: string;
  heading: ReactNode;
  description?: string;
};

export function SectionHeading({
  index,
  label,
  meta,
  id,
  heading,
  description,
}: SectionHeadingProps) {
  return (
    <header>
      <div className="eyebrow flex items-center justify-between gap-4 border-b border-dashed pb-3">
        <p>
          <span className="text-[var(--color-accent)]">{index}</span> {"//"} {label}
        </p>
        {meta ? <div className="text-right">{meta}</div> : null}
      </div>
      <div className="max-w-2xl">
        <h2
          id={id}
          className="display mt-8 text-balance text-4xl leading-[0.95] text-[var(--color-text-primary)] sm:text-5xl"
        >
          {heading}
        </h2>
        {description ? (
          <p className="mt-5 text-pretty text-base leading-7 text-[var(--color-text-secondary)] sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
