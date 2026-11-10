import { SectionHeading } from "./section-heading";
import { ServiceCard } from "./service-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Service } from "@prisma/client";

export function ServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Full-Service Software Studio"
          description="Web, mobile, desktop and AI products, planned, designed and engineered by one senior team, so everything ships as a single coherent piece of work."
        />

        <StaggerGroup className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                index={index}
                title={service.title}
                description={service.description}
                tags={service.tags}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
