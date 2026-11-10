"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    title: "Discovery & Scoping",
    description: "We map your goals, users and constraints before a line of code is written.",
  },
  {
    title: "Architecture & Design",
    description: "System design, UX flows and interface design, validated with you up front.",
  },
  {
    title: "Engineering",
    description: "Iterative builds with regular demos, so you see real progress every week.",
  },
  {
    title: "Launch & Growth",
    description: "Release, monitoring and ongoing improvement based on how the product performs.",
  },
];

/**
 * One step in the methodology list. Its index number lifts from muted to accent
 * as the step passes through the middle of the viewport, which gives the
 * sticky left column something to feel anchored against.
 */
function ProcessStep({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 45%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  return (
    <div ref={ref} className="border-b border-site-border py-12 sm:py-14">
      <Reveal y={24}>
        <div className="flex gap-6 sm:gap-10">
          <motion.span
            style={reduced ? undefined : { opacity }}
            className="site-h3 pt-2 text-lg font-bold text-site-accent"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <div>
            <h3 className="site-h3 text-2xl text-site-text sm:text-3xl">{title}</h3>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-site-muted">
              {description}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="site-band relative px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Sticky rail: the framing stays put while the steps scroll past it. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="site-eyebrow">Methodology</span>
            <h2 className="site-h2 mt-4 !text-[clamp(2.5rem,5vw,3.75rem)] !leading-[1.05]">
              A Proven Path
              <br />
              From Idea To Launch
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-site-muted sm:text-lg">
              A clear, step-by-step process, so your product is not only well built but a
              dependable asset for your business.
            </p>
            <Magnetic className="mt-10">
              <a
                href="#contact"
                className="site-pill inline-block bg-white px-10 py-4 text-[0.8rem] text-[#050505] hover:-translate-y-1 hover:shadow-[0_20px_40px_var(--site-glow)]"
              >
                Start a project
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div>
          {STEPS.map((step, index) => (
            <ProcessStep
              key={step.title}
              index={index}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
