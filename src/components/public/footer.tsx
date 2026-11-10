import { Reveal } from "@/components/motion/reveal";
import type { SiteSettings } from "@prisma/client";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const socialLinks = (settings.socialLinks ?? {}) as {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };

  const socials = [
    { href: socialLinks.twitter, label: "Twitter" },
    { href: socialLinks.linkedin, label: "LinkedIn" },
    { href: socialLinks.github, label: "GitHub" },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href));

  const linkClass =
    "text-site-text/80 transition-colors duration-500 ease-site hover:text-site-text";

  return (
    <footer id="footer" className="site-band relative px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col gap-12 pt-20 pb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="site-h3 text-xl text-site-text">{settings.agencyName}</p>
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-site-muted">
                {settings.tagline}
              </p>
              <div className="mt-6 space-y-1.5 text-sm">
                <a href={`mailto:${settings.contactEmail}`} className={`block ${linkClass}`}>
                  {settings.contactEmail}
                </a>
                <a href={`tel:${settings.contactPhone}`} className={`block ${linkClass}`}>
                  {settings.contactPhone}
                </a>
              </div>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 border-t border-site-border py-8 text-xs text-site-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {settings.agencyName}. Software, apps &amp; AI,
            built end-to-end.
          </p>
          <a href="/admin" className="transition-colors duration-500 ease-site hover:text-site-text">
            Admin Area
          </a>
        </div>
      </div>
    </footer>
  );
}
