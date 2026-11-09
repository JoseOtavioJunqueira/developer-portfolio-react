import { Briefcase, Globe2, GraduationCap, Languages, Timer, Workflow } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";

// Before/after bar that animates when it scrolls into view.
// afterPct is the "after" width relative to "before" (kept visible with a minimum).
const MetricBar = ({ icon: Icon, label, desc, before, after, afterPct, faster }) => {
  const { t } = useLanguage();
  const [ref, visible] = useReveal(0.4);

  return (
    <SpotlightCard className="p-6 text-left h-full">
      <div ref={ref}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Icon size={18} />
            </div>
            <h4 className="font-semibold">{label}</h4>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary font-mono text-[11px] font-bold">
            {faster}
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div>
            <div className="flex justify-between mb-1 text-muted-foreground">
              <span>{t("exp.before")}</span>
              <span className="text-danger font-bold">{before}</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-danger transition-all duration-[1400ms] ease-out"
                style={{ width: visible ? "100%" : "0%" }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-muted-foreground">
              <span>{t("exp.after")}</span>
              <span className="text-primary font-bold">{after}</span>
            </div>
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-[1400ms] ease-out delay-500"
                style={{
                  width: visible ? `${afterPct}%` : "0%",
                  boxShadow: "0 0 12px hsl(var(--primary))",
                }}
              />
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-muted-foreground">{desc}</p>
      </div>
    </SpotlightCard>
  );
};

export const ExperienceSection = () => {
  const { t } = useLanguage();
  const steps = t("exp.ifood.steps");

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("exp.label")}
          title={t("exp.title")}
          highlight={t("exp.titleHighlight")}
          subtitle={t("exp.subtitle")}
        />

        {/* Flagship case study */}
        <Reveal>
          <SpotlightCard className="p-6 sm:p-8 text-left">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-2.5 py-1 rounded bg-primary/15 text-primary font-mono text-[11px] font-bold uppercase tracking-wider">
                {t("exp.caseLabel")}
              </span>
              <span className="px-2.5 py-1 rounded border border-border font-mono text-[11px] text-muted-foreground">
                {t("exp.ifood.company")}
              </span>
              <span className="px-2.5 py-1 rounded border border-accent/40 text-accent font-mono text-[11px]">
                {t("exp.ifood.solo")}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8">{t("exp.ifood.title")}</h3>

            {/* animated pipeline */}
            <div className="mb-10">
              <div className="relative">
                
                <div className="absolute left-[10%] right-[10%] top-[18px] border-t border-dashed border-primary/50" />
                <span className="packet pipe-packet absolute top-[14px] w-2 h-2 rounded-full bg-primary" />
                <div className="relative flex justify-between gap-2">
                  {steps.map((step, i) => (
                    <div key={step} className="flex flex-col items-center text-center w-1/5 min-w-0">
                      <div className="w-9 h-9 rounded-full border border-primary/60 bg-card text-primary font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_14px_hsl(var(--primary)/0.4)]">
                        {i + 1}
                      </div>
                      <span className="mt-2 font-mono text-[9px] sm:text-xs text-muted-foreground break-words max-w-full">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {["problem", "did", "result"].map((k) => (
                <div
                  key={k}
                  className={`rounded-lg border p-5 ${
                    k === "result" ? "border-primary/40 bg-primary/5" : "border-border bg-background/40"
                  }`}
                >
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                    {t(`exp.ifood.${k}Title`)}
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{t(`exp.ifood.${k}`)}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Reveal delay={100} className="h-full">
            <MetricBar
              icon={Timer}
              label={t("exp.loadLabel")}
              desc={t("exp.loadDesc")}
              before="4 s"
              after="2 ms"
              afterPct={2}
              faster={t("exp.loadFaster")}
            />
          </Reveal>
          <Reveal delay={200} className="h-full">
            <MetricBar
              icon={Workflow}
              label={t("exp.syncLabel")}
              desc={t("exp.syncDesc")}
              before="3 h"
              after="5 min"
              afterPct={3}
              faster={t("exp.syncFaster")}
            />
          </Reveal>
          <Reveal delay={300} className="h-full">
            <SpotlightCard className="p-6 text-left h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Globe2 size={18} />
                </div>
                <h4 className="font-semibold">{t("exp.intlTitle")}</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-5 font-mono text-xs">
                {["Argentina", "Chile", "Mexico"].map((c) => (
                  <span key={c} className="px-3 py-1.5 rounded-md border border-border bg-secondary/60">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{t("exp.intlDesc")}</p>
            </SpotlightCard>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 mt-16 text-left">
          <div>
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mb-8">
              <Briefcase size={16} className="text-primary" /> {t("exp.timelineTitle")}
            </h3>
            <div className="relative pl-8 border-l border-border space-y-10">
              {[1, 5, 2, 3, 4].map((id, i) => (
                <Reveal key={id} delay={i * 80}>
                  <div className="relative">
                    <span
                      className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full bg-primary"
                      style={{ boxShadow: "0 0 0 4px hsl(var(--background)), 0 0 14px hsl(var(--primary))" }}
                    />
                    <p className="font-mono text-xs text-primary mb-1">{t(`exp.jobs.${id}.period`)}</p>
                    <h4 className="text-lg font-semibold">{t(`exp.jobs.${id}.role`)}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{t(`exp.jobs.${id}.org`)}</p>
                    <ul className="space-y-1.5 text-sm text-foreground/85 list-none">
                      {t(`exp.jobs.${id}.bullets`).map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-primary">▹</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <Reveal>
              <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mb-5">
                <GraduationCap size={16} className="text-primary" /> {t("exp.educationTitle")}
              </h3>
              <div className="space-y-4">
                {[1, 2].map((id) => (
                  <SpotlightCard key={id} className="p-4">
                    <p className="font-semibold text-sm">{t(`exp.education.${id}.title`)}</p>
                    <p className="text-xs text-muted-foreground">{t(`exp.education.${id}.org`)}</p>
                    <p className="font-mono text-[11px] text-primary mt-1">{t(`exp.education.${id}.period`)}</p>
                  </SpotlightCard>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground mb-5">
                <Languages size={16} className="text-primary" /> {t("exp.languagesTitle")}
              </h3>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {["pt", "en", "es"].map((l) => (
                  <span key={l} className="px-3 py-2 rounded-md border border-border bg-card/70">
                    {t(`exp.languages.${l}`)}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
