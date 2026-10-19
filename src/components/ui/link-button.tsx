import type { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary";
};

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  const styles =
    variant === "primary"
      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]"
      : "border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]";

  return (
    <a
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 border px-5 font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-200 focus-visible:outline-none",
        styles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
