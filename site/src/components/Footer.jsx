import { ArrowUpIcon, EnvelopeSimpleIcon, PhoneIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { contact } from "../data/site";
import { scrollToTop } from "../lib/smoothScroll";

const linkClass =
  "flex items-center gap-2 text-sm text-paper/75 transition-colors hover:text-paper";

export function Footer() {
  return (
    <footer className="bg-plum-deep py-12 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="u-display text-xl">
              Devindri De Silva<span className="text-blush">.</span>
            </p>
            <p className="mt-1 text-sm text-paper/60">
              Social media strategist and content creator, Sri Lanka
            </p>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Contact">
            <a href={`mailto:${contact.email}`} className={linkClass}>
              <EnvelopeSimpleIcon size={16} weight="bold" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phoneHref}`} className={linkClass}>
              <PhoneIcon size={16} weight="bold" />
              {contact.phone}
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              <LinkedinLogoIcon size={16} weight="bold" />
              {contact.linkedinLabel}
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <p className="text-sm text-paper/60">{new Date().getFullYear()}</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/35 transition-colors hover:bg-paper hover:text-plum-deep"
              aria-label="Back to top"
            >
              <ArrowUpIcon size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
