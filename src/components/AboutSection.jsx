import { useEffect, useState } from "react";
import { Database, Download, Network, Server } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";
import { TerminalWindow } from "@/components/TypedTerminal";

const RULE = "+-------------+-----------------+---------------------+";
const TABLE = [
  RULE,
  "| name        | role            | focus               |",
  RULE,
  "| José Otávio | Backend Dev     | APIs/DBs/Systems    |",
  RULE,
].join("\n");

const CountUp =({ to, suffix = "" }) => {
  const [ref, visible] = useReveal(0.4);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

export const AboutSection = () => {
  const { t, cvUrl } = useLanguage();

  const stats = [
    { to: 2, suffix: "+", label: t("about.stats.years") },
    { to: 9, suffix: "", label: t("about.stats.projects") },
    { to: 5, suffix: "", label: t("about.stats.languages") },
    { to: 3, suffix: "+", label: t("about.stats.databases") },
  ];

  const cards = [
    { icon: Server, title: t("about.card1Title"), desc: t("about.card1Desc") },
    { icon: Database, title: t("about.card2Title"), desc: t("about.card2Desc") },
    { icon: Network, title: t("about.card3Title"), desc: t("about.card3Desc") },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("about.label")}
          title={t("about.title")}
          highlight={t("about.titleHighlight")}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="space-y-6 text-left">
            <h3 className="text-2xl font-semibold">{t("about.heading")}</h3>
            <p className="text-muted-foreground">{t("about.paragraph1")}</p>
            <p className="text-muted-foreground">{t("about.paragraph2")}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#contact" className="neon-button">
                {t("about.getInTouch")}
              </a>
              <a href={cvUrl} download className="ghost-button">
                <Download size={16} /> {t("about.downloadCv")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <TerminalWindow title="~/jose.otavio/whoami.sql">
              <pre className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed whitespace-pre overflow-x-auto">
                <span className="text-accent">SELECT</span> name, role, focus{"\n"}
                <span className="text-accent">FROM</span> developers{"\n"}
                <span className="text-accent">WHERE</span> passion ={" "}
                <span className="text-primary">&apos;clean data models&apos;</span>
                {"\n"}
                {"  "}
                <span className="text-accent">AND</span> reliability ={" "}
                <span className="text-primary">&apos;non-negotiable&apos;</span>;{"\n\n"}
                <span className="text-muted-foreground">
                  {TABLE}
                </span>
                {"\n"}
                <span className="text-primary">1 row</span>
                <span className="text-muted-foreground"> (0.003 sec)</span>
              </pre>
            </TerminalWindow>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <SpotlightCard className="p-6 text-center h-full">
                <div className="font-mono text-4xl font-bold text-primary text-glow">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <SpotlightCard className="p-6 text-left h-full group">
                <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <card.icon size={22} />
                </div>
                <h4 className="font-semibold text-lg mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
