import { useState } from "react";
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  LinkedinLogoIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { contact } from "../data/site";
import { Reveal, RevealLines } from "./ui/Reveal";
import { Button } from "./ui/Button";

const empty = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.email.trim()) {
    errors.email = "Please add an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That email address does not look right.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Tell me a little more, 10 characters minimum.";
  }
  return errors;
}

const fieldClass =
  "w-full rounded-none border-b border-paper/35 bg-transparent px-0 py-3 text-base text-paper placeholder:text-paper/45 focus:border-paper focus:outline-none";

export function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSent(false);
  };

  // No backend on a static site, so the form hands off to the visitor's mail client.
  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = encodeURIComponent(`Project enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-paper/15 bg-plum py-24 text-paper md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <h2 className="u-display text-[calc(var(--shell)*0.12)] leading-[0.88] md:text-[calc(var(--shell)*0.064)]">
              <RevealLines lines={["Let’s talk", "strategy."]} />
            </h2>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[40ch] text-base leading-relaxed text-paper/80 md:text-lg">
                Tell me what the brand is trying to move this quarter and I will tell you
                whether content can move it.
              </p>
            </Reveal>

            <Reveal delay={0.16} className="mt-12 space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="group flex items-center gap-3 text-lg font-semibold text-paper transition-colors hover:text-blush md:text-2xl"
              >
                <EnvelopeSimpleIcon size={22} weight="bold" />
                {contact.email}
                <ArrowUpRightIcon
                  size={18}
                  weight="bold"
                  className="translate-y-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
              <a
                href={`tel:${contact.phoneHref}`}
                className="flex items-center gap-3 text-lg font-semibold text-paper transition-colors hover:text-blush md:text-2xl"
              >
                <PhoneIcon size={22} weight="bold" />
                {contact.phone}
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-lg font-semibold text-paper transition-colors hover:text-blush md:text-2xl"
              >
                <LinkedinLogoIcon size={22} weight="bold" />
                LinkedIn
                <ArrowUpRightIcon
                  size={18}
                  weight="bold"
                  className="translate-y-0 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="md:col-span-5 md:col-start-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              <div>
                <label htmlFor="name" className="u-mono block text-paper/70">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={update("name")}
                  className={fieldClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name ? (
                  <p id="name-error" className="mt-2 text-sm text-blush">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="email" className="u-mono block text-paper/70">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={update("email")}
                  className={fieldClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-blush">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor="message" className="u-mono block text-paper/70">
                  What are you working on
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={update("message")}
                  className={`${fieldClass} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-blush">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button as="button" type="submit" variant="light">
                  Send message
                </Button>
                <p aria-live="polite" className="text-sm text-paper/70">
                  {sent ? "Opening your mail app with the message ready to send." : ""}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
