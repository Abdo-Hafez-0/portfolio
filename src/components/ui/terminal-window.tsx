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

type SectionBlockProps = {
  label: string;
  block: number;
  phase: "typing" | "loading" | "revealed";
  delay: (block: number) => { animationDelay: string };
  children: ReactNode;
};

function SectionBlock({
  label,
  block,
  phase,
  delay,
  children,
}: SectionBlockProps) {
  return (
    <section
      className={`terminal-reveal mt-7 ${phase === "revealed" ? "" : "opacity-0"}`}
      style={delay(block)}
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
  const [expanded, setExpanded] = useState(false);
  const [typedCommand, setTypedCommand] = useState("");
  const [phase, setPhase] = useState<"typing" | "loading" | "revealed">(
    "typing"
  );
  const reducedMotion = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const clearTimers = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  };

  const runSequence = () => {
    clearTimers();

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
      window.setTimeout(() => setPhase("revealed"), command.length * 36 + 1700)
    );
  };

  const toggle = () => {
    if (expanded) {
      clearTimers();
      setExpanded(false);
      setTypedCommand("");
      setPhase("typing");
    } else {
      runSequence();
      setExpanded(true);
    }
  };

  const revealDelay = (block: number) => ({
    animationDelay: `${block * 220}ms`,
  });

  return (
    <article className="border bg-[var(--color-background-elevated)]">
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
            abdo@portfolio:~/{project.slug}
          </span>
        </span>
        <span
          className={`shrink-0 font-semibold ${STATUS_STYLES[project.status]}`}
        >
          [ {project.status} ]
        </span>
      </header>

      {/* Collapsed trigger row */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`terminal-${project.slug}`}
        onClick={toggle}
        className="flex w-full items-center gap-3 border-b border-[var(--color-border-subtle)] px-6 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-8"
      >
        <span className="font-mono text-xs text-[var(--color-text-secondary)]">
          {expanded ? "▾" : "▸"}
        </span>
        <span className="font-mono text-xs tracking-[0.05em] text-[var(--color-text-primary)]">
          {String(index + 1).padStart(2, "0")} / {project.name}
        </span>
      </button>

      {/* Terminal body */}
      <div
        id={`terminal-${project.slug}`}
        aria-hidden={!expanded}
        className={`transition-all duration-500 ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
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

          {/* ASCII banner (decorative) */}
          {phase === "revealed" ? (
            <div
              aria-hidden="true"
              className="terminal-reveal mt-8 overflow-hidden"
              style={revealDelay(0)}
            >
              <pre className="banner-scale overflow-x-auto pb-2 font-mono text-[0.5625rem] leading-[1.15] text-[var(--color-text-primary)] [text-shadow:0_0_14px_var(--color-accent-soft)] sm:text-[0.6875rem]">
                {project.banner.join("\n")}
              </pre>
            </div>
          ) : (
            <div aria-hidden="true" className="mt-8 h-24" />
          )}

          {/* PROJECT */}
          <SectionBlock label="PROJECT" block={1} phase={phase} delay={revealDelay}>
            <p className="text-base leading-7 text-[var(--color-text-primary)]">
              {project.name}
            </p>
            {project.role ? (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {project.role}
              </p>
            ) : null}
          </SectionBlock>

          {/* DESCRIPTION */}
          <SectionBlock label="DESCRIPTION" block={2} phase={phase} delay={revealDelay}>
            <p className="max-w-2xl text-pretty text-base leading-7 text-[var(--color-text-secondary)]">
              {project.description}
            </p>
          </SectionBlock>

          {/* SYSTEMS IMPLEMENTED */}
          {project.systemsImplemented ? (
            <SectionBlock label="SYSTEMS IMPLEMENTED" block={3} phase={phase} delay={revealDelay}>
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
            </SectionBlock>
          ) : null}

          {/* PROBLEMS SOLVED */}
          <SectionBlock label="PROBLEMS SOLVED" block={4} phase={phase} delay={revealDelay}>
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
          </SectionBlock>

          {/* TECH STACK */}
          <SectionBlock label="TECH STACK" block={5} phase={phase} delay={revealDelay}>
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
          </SectionBlock>

          {/* Final command */}
          <div
            className={`terminal-reveal mt-8 font-mono text-sm ${
              phase === "revealed" ? "" : "opacity-0"
            }`}
            style={revealDelay(6)}
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
      </div>
    </article>
  );
}