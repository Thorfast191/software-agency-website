import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { Marquee } from "@/components/motion/marquee";
import type { Testimonial } from "@prisma/client";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="site-band relative overflow-hidden py-28 sm:py-36">
      <div className="px-6">
        <SectionHeading eyebrow="Social proof" title="Client Success Stories" />
      </div>

      {/* Full-bleed on purpose — the track runs past both viewport edges and is
          masked rather than clipped, so cards dissolve instead of snapping. */}
      <Marquee className="mt-16" durationSeconds={45}>
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="site-card flex h-full w-[min(85vw,640px)] flex-col justify-between p-10 sm:p-12"
          >
            <blockquote className="text-base leading-relaxed text-site-text italic sm:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-4">
              {testimonial.photo && (
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-site-border">
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.authorName}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="site-h3 text-base text-site-text">{testimonial.authorName}</p>
                {testimonial.company && (
                  <p className="mt-1 text-xs text-site-accent">{testimonial.company}</p>
                )}
              </div>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
