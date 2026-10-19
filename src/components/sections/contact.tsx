import { profile } from "@/content/profile";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/link-button";
import { CornerBrackets } from "@/components/ui/corner-brackets";

export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <SectionHeading
        index="05"
        label="Open channel"
        meta="Signal ▂▄▆█"
        id="contact-heading"
        heading="Let's build something reliable."
      />

      <div className="relative mt-14 border bg-[var(--color-background-elevated)] px-6 py-14 text-center sm:px-10 sm:py-20">
        <CornerBrackets />
        <p className="display text-5xl leading-none text-[var(--color-text-primary)] sm:text-7xl">
          Transmit a message<span className="signal-cursor">_</span>
        </p>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
          I&apos;m open to backend engineering opportunities and
          collaborations. Reach out and let&apos;s start a conversation.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <LinkButton href={`mailto:${profile.email}`}>
            › {profile.email}
          </LinkButton>
          <LinkButton
            href={profile.links.linkedin}
            rel="noreferrer"
            target="_blank"
            variant="secondary"
          >
            LinkedIn
          </LinkButton>
          <LinkButton
            href={profile.links.github}
            rel="noreferrer"
            target="_blank"
            variant="secondary"
          >
            GitHub
          </LinkButton>
        </div>
      </div>
    </Section>
  );
}
