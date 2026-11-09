import { useEffect, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TypedTerminal } from "@/components/TypedTerminal";

const HERO_SCRIPT = [
  { kind: "cmd", text: "curl -s localhost:8080/api/v1/me | jq" },
  { kind: "out", text: "{" },
  { kind: "out", text: '  "name": "José Otávio",' },
  { kind: "out", text: '  "role": "Backend Developer",' },
  { kind: "out", text: '  "experience_years": 2,' },
  { kind: "out", text: '  "stack": ["Python", "C#", "Node.js", "PostgreSQL"],' },
  { kind: "out", text: '  "speaks": ["pt", "en", "es"],' },
  { kind: "out", text: '  "open_to_work": true' },
  { kind: "out", text: "}" },
  { kind: "cmd", text: "echo $STATUS" },
  { kind: "out", text: "200 OK: ready for international opportunities" },
];

// Cycles through `words`, typing and deleting each one.
const useRotatingWord = (words) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 35 : 80;
    let next;

    if (!deleting && text === word) {
      delay = 1800;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = 300;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      next = () =>
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }
    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words]);

  return text;
};

export const HeroSection = () => {
  const { t, cvUrl } = useLanguage();
  const role = useRotatingWord(t("hero.roles"));
  const name = `${t("hero.firstName")} ${t("hero.lastName")}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4"
    >
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 font-mono text-xs text-primary animate-fade-in opacity-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping-slow" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("hero.status")}
          </div>

          <div className="space-y-2">
            <p
              className="font-mono text-muted-foreground animate-fade-in opacity-0"
              style={{ animationDelay: "0.15s" }}
            >
              {t("hero.greeting")}
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="glitch text-glow" data-text={name}>
                {name}
              </span>
            </h1>
            <p
              className="font-mono text-xl sm:text-2xl text-primary h-9 animate-fade-in opacity-0"
              style={{ animationDelay: "0.45s" }}
            >
              {"> "}
              {role}
              <span className="animate-blink">▍</span>
            </p>
          </div>

          <p
            className="text-base sm:text-lg text-muted-foreground max-w-xl animate-fade-in opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="flex flex-wrap gap-4 pt-2 animate-fade-in opacity-0"
            style={{ animationDelay: "0.75s" }}
          >
            <a href="#projects" className="neon-button">
              {t("hero.cta")} <ArrowDown size={16} />
            </a>
            <a
              href={cvUrl}
              download
              className="ghost-button"
            >
              <Download size={16} /> {t("hero.cv")}
            </a>
          </div>
        </div>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
          <div className="animate-float">
            <TypedTerminal script={HERO_SCRIPT} title="jose@backend: ~/api" minHeight={330} />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <span>{t("hero.scroll")}</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
};
