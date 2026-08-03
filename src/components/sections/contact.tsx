import { profile } from "@/content/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";

export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <SectionHeading
        eyebrow="05 / Contact"
        heading="Let's build something reliable."
        description="I'm open to backend engineering opportunities and collaborations. Reach out and let's start a conversation."
      />

      <div className="mt-14 flex flex-col gap-4 sm:flex-row">
        <LinkButton href={`mailto:${profile.email}`}>
          Start a conversation
        </LinkButton>
        <LinkButton
          href={profile.links.github}
          rel="noreferrer"
          target="_blank"
          variant="secondary"
        >
          View GitHub
        </LinkButton>
        <LinkButton
          href={profile.links.linkedin}
          rel="noreferrer"
          target="_blank"
          variant="secondary"
        >
          View LinkedIn
        </LinkButton>
      </div>
    </Section>
  );
}