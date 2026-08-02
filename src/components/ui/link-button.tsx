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
      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#071017] hover:bg-[#b5eaff]"
      : "border-[var(--color-border-subtle)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] hover:bg-white/[0.03]";

  return (
    <a
      className={[
        "inline-flex min-h-11 items-center justify-center gap-2 border px-5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none",
        styles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
