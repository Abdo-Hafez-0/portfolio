"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { Project } from "@/content/projects";

const STATUS_STYLES: Record<Project["status"], string> = {
  COMPLETE: "text-[var(--color-accent)]",
  ACTIVE: "text-[var(--color-accent)]",
  UNIVERSITY: "text-[var(--color-accent)]",
  ARCHIVED: "text-[var(--color-text-muted)]",
};

const CIRCLES = [
  "bg-[#2a2e35]",
  "bg-[#3a424d]",
  "bg-[var(--color-accent-soft)]",
];

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M4 12 12 4M6 4h6v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type RevealBlockProps = {
  label: string;
  block: number;
  started: boolean;
  children: ReactNode;
};

function RevealBlock({ label, block, started, children }: RevealBlockProps) {
  return (
    <section
      className={`lazy-reveal ${started ? "is-visible" : ""}`}
      style={{ animationDelay: `${block * 180}ms` }}
    >
      <h4 className="font-mono text-xs tracking-[0.12em] text-[var(--color-accent)] uppercase">
        <span aria-hidden="true">{"> "}</span>
        {label}
      </h4>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function ProjectTerminal({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [started, setStarted] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [phase, setPhase] = useState<"typing" | "loading" | "revealed">(
    "typing"
  );
  const cardRef = useRef<HTMLElement>(null);
  const reducedMotion = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion.current) {
      setTypedCommand(`$ open ${project.slug}`);
      setPhase("revealed");
      return;
    }

    setTypedCommand("");
    setPhase("typing");

    const command = `$ open ${project.slug}`;
    for (let i = 0; i < command.length; i++) {
      const offset = i;
      timers.current.push(
        window.setTimeout(
          () => setTypedCommand(command.slice(0, 1 + offset)),
          offset * 32
        )
      );
    }
    timers.current.push(
      window.setTimeout(() => setPhase("loading"), command.length * 36)
    );
    timers.current.push(
      window.setTimeout(() => setPhase("revealed"), command.length * 36 + 1500)
    );

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [started, project.slug]);

  const revealDelay = (block: number) => ({
    animationDelay: `${block * 180}ms`,
  });

  return (
    <article
      ref={cardRef}
      className={`lazy-reveal border bg-[var(--color-background-elevated)] ${
        started ? "is-visible" : ""
      }`}
    >
      {/* Terminal title bar */}
      <header className="flex items-center justify-between gap-4 overflow-hidden border-b border-dashed px-6 py-3.5 font-mono text-[0.625rem] tracking-[0.14em] text-[var(--color-text-muted)] uppercase sm:px-8">
        <span className="flex min-w-0 items-center gap-4">
          <span className="flex shrink-0 items-center gap-1.5">
            {CIRCLES.map((color) => (
              <span
                key={color}
                aria-hidden="true"
                className={`size-2 rounded-full ${color}`}
              />
            ))}
          </span>
          <span className="truncate">
            abdo@portfolio:~/projects/{project.slug}
          </span>
        </span>
        <span
          className={`shrink-0 font-semibold ${STATUS_STYLES[project.status]}`}
        >
          [ {project.status} ]
        </span>
      </header>

      {/* Terminal body */}
      <div className="px-6 py-6 sm:px-8 sm:py-8">
        {/* Real project heading for semantics */}
        <h3 className="sr-only">{project.name}</h3>

        {/* Typed command + loading (decorative) */}
        <div aria-hidden="true" className="font-mono text-sm">
          <p className="text-[var(--color-text-primary)]">
            <span className="text-[var(--color-accent)]">$</span>{" "}
            <span className="text-[var(--color-text-primary)]">
              {typedCommand || "$"}
            </span>
            {phase !== "revealed" ? <span className="terminal-cursor" /> : null}
          </p>
          {phase === "loading" ? (
            <div className="mt-2 space-y-1 text-[var(--color-text-muted)]">
              <p>Opening project...</p>
              <p>Generating banner...</p>
            </div>
          ) : null}
        </div>

        {/* Two-column layout */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-12">
          {/* Left column */}
          <div className="flex flex-col">
            {/* ASCII banner (decorative) */}
            {phase === "revealed" ? (
              <div
                aria-hidden="true"
                className="banner-scan overflow-hidden"
                style={revealDelay(0)}
              >
                <pre className="banner-gradient font-mono text-[0.625rem] leading-[1.2] sm:text-[0.75rem]">
                  {project.banner.join("\n")}
                </pre>
              </div>
            ) : (
              <div aria-hidden="true" className="h-24" />
            )}

            {/* Title + role */}
            <div
              className={`lazy-reveal mt-6 ${phase === "revealed" ? "is-visible" : ""}`}
              style={revealDelay(1)}
            >
              <p className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-3xl">
                {project.name}
              </p>
              {project.role ? (
                <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
                  {project.role}
                </p>
              ) : null}
            </div>

            {/* Tech stack */}
            <div
              className={`lazy-reveal mt-5 ${phase === "revealed" ? "is-visible" : ""}`}
              style={revealDelay(2)}
            >
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-[var(--color-border-subtle)] px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--color-text-secondary)] uppercase"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Repository button */}
            <div
              className={`lazy-reveal mt-6 ${phase === "revealed" ? "is-visible" : ""}`}
              style={revealDelay(3)}
            >
              <a
                className="inline-flex min-h-10 items-center gap-2 border border-[var(--color-border-subtle)] px-4 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                href={project.link}
                rel="noreferrer"
                target="_blank"
              >
                <span className="text-[var(--color-accent)]">$</span> view
                repository
                <ArrowUpRight />
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col">
            {/* DESCRIPTION */}
            <RevealBlock
              label="DESCRIPTION"
              block={4}
              started={phase === "revealed"}
            >
              <p className="max-w-2xl text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
                {project.description}
              </p>
            </RevealBlock>

            {/* SYSTEMS + PROBLEMS two-column */}
            <div className="mt-7 grid gap-8 sm:grid-cols-2">
              {project.systemsImplemented ? (
                <RevealBlock
                  label="SYSTEMS IMPLEMENTED"
                  block={5}
                  started={phase === "revealed"}
                >
                  <ul className="space-y-2.5">
                    {project.systemsImplemented.map((system) => (
                      <li
                        key={system}
                        className="flex items-center gap-2.5 text-sm leading-6 text-[var(--color-text-secondary)]"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-[var(--color-accent)]"
                        >
                          ✓
                        </span>
                        {system}
                      </li>
                    ))}
                  </ul>
                </RevealBlock>
              ) : null}

              <RevealBlock
                label="PROBLEMS SOLVED"
                block={6}
                started={phase === "revealed"}
              >
                <ul className="space-y-2.5">
                  {project.problemsSolved.map((problem) => (
                    <li
                      key={problem}
                      className="flex gap-3 text-sm leading-6 text-[var(--color-text-secondary)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1 shrink-0 bg-[var(--color-accent)]"
                      />
                      {problem}
                    </li>
                  ))}
                </ul>
              </RevealBlock>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}