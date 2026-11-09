import { Linkedin, Github, Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { TerminalWindow } from "@/components/TypedTerminal";

const EMAIL = "joseotavio.jr1104@gmail.com";

const inputClass =
  "w-full px-4 py-3 rounded-md border border-border bg-background/70 font-mono text-sm outline-none transition-all " +
  "focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] placeholder:text-muted-foreground/60";

export const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    toast({
      title: t("contact.toastTitle"),
      description: t("contact.toastDesc"),
    });
    setIsSubmitting(false);
  };

  const info = [
    { icon: Mail, label: t("contact.emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Phone, label: t("contact.phoneLabel"), value: "(+55) 17 99680-4466", href: "tel:+5517996804466" },
    { icon: MapPin, label: t("contact.locationLabel"), value: t("contact.locationValue") },
  ];

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/joseotaviojunqueiraramos/" },
    { icon: Github, label: "GitHub", href: "https://github.com/JoseOtavioJunqueira" },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("contact.label")}
          title={t("contact.title")}
          highlight={t("contact.titleHighlight")}
          subtitle={t("contact.subtitle")}
        />

        <div className="grid lg:grid-cols-2 gap-10 text-left">
          <Reveal className="space-y-8">
            <h3 className="text-2xl font-semibold">{t("contact.infoTitle")}</h3>
            <div className="space-y-5">
              {info.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {label}
                    </h4>
                    {href ? (
                      <a href={href} className="hover:text-primary transition-colors break-all">
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {t("contact.connect")}
              </h4>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-lg border border-border bg-card/70 transition-all hover:border-primary hover:text-primary hover:-translate-y-1 hover:shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <TerminalWindow title={t("contact.formTitle")}>
              <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-primary mb-2">
                    {'"'}
                    {t("contact.nameLabel")}
                    {'":'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={inputClass}
                    placeholder={t("contact.namePlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-primary mb-2">
                    {'"'}
                    {t("contact.emailFieldLabel")}
                    {'":'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={inputClass}
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-primary mb-2">
                    {'"'}
                    {t("contact.messageLabel")}
                    {'":'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder={t("contact.messagePlaceholder")}
                  />
                </div>
                <button type="submit" disabled={isSubmitting} className="neon-button w-full">
                  {isSubmitting ? t("contact.sending") : t("contact.send")}
                  <Send size={16} />
                </button>
              </form>
            </TerminalWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
