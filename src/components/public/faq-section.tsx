"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { SITE_EASE } from "@/components/motion/ease";
import type { Faq } from "@prisma/client";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Knowledge base" title="Common Questions" align="left" />

        <div className="mt-16">
          {faqs.map((faq) => {
            const open = openId === faq.id;

            return (
              <div key={faq.id} className="border-b border-site-border">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${faq.id}`}
                    id={`faq-trigger-${faq.id}`}
                    className="flex w-full items-center justify-between gap-6 py-8 text-left"
                  >
                    <span
                      className={`site-h3 text-lg transition-colors duration-500 ease-site sm:text-xl ${
                        open ? "text-site-accent" : "text-site-text"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-xl leading-none text-site-text transition-transform duration-500 ease-site ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: reduced ? 0.15 : 0.5,
                        ease: SITE_EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 pr-12 text-sm leading-relaxed text-site-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
