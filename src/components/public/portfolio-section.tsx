import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/motion/reveal";
import type { PortfolioItem } from "@prisma/client";

export function PortfolioSection({ items }: { items: PortfolioItem[] }) {
  if (items.length === 0) return null;

  return (
    <section id="portfolio" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Curated work"
          title="Selected Projects"
          description="A selection of products we have designed, engineered and shipped for our clients."
        />

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {items.map((item, index) => {
            const card = (
              <article className="site-card group h-full overflow-hidden transition-all duration-[600ms] ease-site hover:-translate-y-2 hover:border-site-border-strong">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {item.images[0] ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[800ms] ease-site group-hover:scale-[1.06]"
                    />
                  ) : (
                    // No image uploaded yet: a branded gradient keeps the grid even.
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgb(99_102_241/0.35),transparent_60%),radial-gradient(circle_at_80%_80%,rgb(168_85_247/0.3),transparent_60%)] transition-transform duration-[800ms] ease-site group-hover:scale-[1.06]"
                    />
                  )}
                </div>

                <div className="flex items-end justify-between gap-6 px-8 py-10 sm:px-10">
                  <div>
                    {item.tags.length > 0 && (
                      <p className="text-[0.8rem] font-bold uppercase text-site-accent">
                        {item.tags.join(" / ")}
                      </p>
                    )}
                    <h3 className="site-h3 mt-4 text-2xl text-site-text sm:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  {item.externalLink && (
                    <ArrowUpRight className="h-6 w-6 shrink-0 text-site-muted transition-all duration-500 ease-site group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-site-text" />
                  )}
                </div>
              </article>
            );

            return (
              <Reveal key={item.id} delay={(index % 2) * 0.12}>
                {item.externalLink ? (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.title} (opens in a new tab)`}
                    className="block h-full rounded-[30px]"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
