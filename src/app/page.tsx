import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Section>
        <SectionHeading
          eyebrow="Portfolio / visual foundation"
          heading="A quiet interface for thoughtful engineering."
          level="h1"
          description="The portfolio is being built incrementally, beginning with an accessible, motion-safe technical visual system."
        />
      </Section>
    </main>
  );
}
