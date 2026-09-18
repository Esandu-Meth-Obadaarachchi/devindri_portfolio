import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { LAYER } from "../lib/layers";
import { scrollToSection } from "../lib/smoothScroll";
import { Button } from "./ui/Button";

const links = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
];

export function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setSolid(value > 40);
  });

  const go = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 h-16 transition-colors duration-300 ${
          solid ? "bg-paper/85 backdrop-blur-md" : "bg-transparent"
        }`}
        style={{ zIndex: LAYER.nav }}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <button
            type="button"
            onClick={() => go("top")}
            className="u-display text-lg text-ink"
            aria-label="Back to top"
          >
            DDS<span className="text-rose">.</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Sections">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="group relative text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-rose transition-[width] duration-300 group-hover:w-full" />
              </button>
            ))}
            <Button as="button" type="button" onClick={() => go("contact")} className="px-5 py-2.5">
              Work with me
            </Button>
          </nav>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <XIcon size={24} weight="bold" /> : <ListIcon size={24} weight="bold" />}
          </button>
        </div>

        <motion.div
          className="h-px origin-left bg-rose"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 flex flex-col justify-center gap-2 bg-ink px-6 md:hidden"
            style={{ zIndex: LAYER.nav - 1 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {[...links, { id: "contact", label: "Work with me" }].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="u-display py-2 text-left text-[calc(var(--shell)*0.13)] text-paper"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
