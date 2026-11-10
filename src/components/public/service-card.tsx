"use client";

import { useRef, useState } from "react";

/**
 * Glass card with a radial accent wash that follows the pointer. The wash is a
 * positioned pseudo-layer driven by two CSS custom properties rather than a
 * re-render, so tracking stays cheap.
 */
export function ServiceCard({
  index,
  title,
  description,
  tags,
}: {
  index: number;
  title: string;
  description: string;
  tags: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 0, active: false });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPointer((p) => ({ ...p, active: false }))}
      className="site-card group relative h-full overflow-hidden px-10 py-14 transition-all duration-[600ms] ease-site hover:-translate-y-2 hover:border-site-border-strong sm:px-12 sm:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-site group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${pointer.x}% ${pointer.y}%, rgb(99 102 241 / 0.14), transparent 70%)`,
          opacity: pointer.active ? undefined : 0,
        }}
      />

      <div className="relative">
        <span className="text-[0.8rem] font-medium tracking-[0.1em] text-site-accent">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="site-h3 mt-8 text-2xl text-site-text">{title}</h3>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-site-muted">{description}</p>

        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[rgb(255_255_255/0.05)] px-3 py-1 text-[0.7rem] text-site-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
