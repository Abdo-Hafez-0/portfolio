"use client";

import { useState } from "react";

import { projects, universityProjects } from "@/content/projects";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectTerminal } from "@/components/ui/terminal-window";

type Tab = "featured" | "university";

const tabs: { id: Tab; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "university", label: "University" },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("featured");
  const visibleProjects =
    activeTab === "featured" ? projects : universityProjects;

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <SectionHeading
        eyebrow="02 / Projects"
        heading="Systems I've designed and built."
        description="A selection of projects where I focused on backend architecture, scalable APIs, and reliable data access."
      />

      <div
        role="tablist"
        aria-label="Project categories"
        className="mt-14 flex gap-2 border-b border-[var(--color-border-subtle)]"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={[
              "border-b-2 px-4 py-3 font-mono text-xs tracking-[0.12em] uppercase transition-colors",
              activeTab === tab.id
                ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-8 space-y-6"
      >
        {visibleProjects.map((project, index) => (
          <ProjectTerminal key={project.name} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
}