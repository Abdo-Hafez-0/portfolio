import type { ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/ui/container";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={["py-20 sm:py-28 lg:py-36", className].filter(Boolean).join(" ")}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
