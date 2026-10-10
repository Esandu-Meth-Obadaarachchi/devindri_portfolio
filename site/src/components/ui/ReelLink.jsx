import { ArrowUpRightIcon, FacebookLogoIcon } from "@phosphor-icons/react";

/** The way back to the real post. Sits under a phone so a client can check the
 *  number against the source, which is the point of showing it. */
export function ReelLink({ href, tone = "dark", className = "" }) {
  if (!href) return null;

  const colour =
    tone === "dark"
      ? "text-paper/65 hover:text-paper"
      : "text-ink-mute hover:text-rose";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-cursor="view"
      className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium tracking-tight transition-colors duration-200 ${colour} ${className}`}
    >
      <FacebookLogoIcon size={14} weight="fill" aria-hidden="true" />
      Watch on Facebook
      <ArrowUpRightIcon size={12} weight="bold" aria-hidden="true" />
    </a>
  );
}
