import { Code2, Cog, Database, Layers, Server } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotlightCard } from "@/components/SpotlightCard";

// Shared with the API playground so both stay in sync.
// eslint-disable-next-line react-refresh/only-export-components -- plain data used by other components
export const STACK = {
  languages: { icon: Code2, items: ["Python", "C#", "Java", "TypeScript", "JavaScript", "PHP", "SQL"] },
  backend: {
    icon: Server,
    items: [".NET", "Node.js", "NestJS", "Spring Boot", "Flask", "Symfony", "REST APIs", "OpenAPI"],
  },
  data: {
    icon: Database,
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "BigQuery", "pandas", "scikit-learn"],
  },
  tooling: { icon: Cog, items: ["AWS", "Docker", "Git", "GitHub", "CI/CD", "Agile"] },
  frontend: { icon: Layers, items: ["React", "Next.js", "Tailwind CSS", "Unity"] },
};

const ALL = Object.values(STACK).flatMap((l) => l.items);

export const SkillsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="stack" className="py-24 px-4 relative">
      <div className="container max-w-6xl">
        <SectionHeading
          label={t("stack.label")}
          title={t("stack.title")}
          highlight={t("stack.titleHighlight")}
          subtitle={t("stack.subtitle")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(STACK).map(([layer, { icon: Icon, items }], i) => (
            <Reveal key={layer} delay={i * 90}>
              <SpotlightCard className="p-6 text-left h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider">
                    {t(`stack.layers.${layer}`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-md border border-border bg-secondary/60 font-mono text-xs
                                 transition-all duration-200 hover:border-primary hover:text-primary hover:-translate-y-0.5
                                 hover:shadow-[0_0_14px_hsl(var(--primary)/0.35)] cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div
          className="mt-14 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}
          aria-hidden="true"
        >
          <div className="flex w-max animate-marquee gap-10 font-mono text-2xl font-bold text-foreground/15">
            {[...ALL, ...ALL].map((name, i) => (
              <span key={i} className="whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
