import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  {
    id: 1,
    image: "/projects/itau-backend.png",
    tags: ["Java", "Spring Boot", "Docker"],
    githubUrl: "https://github.com/JoseOtavioJunqueira/desafio-itau-backend",
  },
  {
    id: 2,
    image: "/projects/project1.png",
    tags: ["Python", "Flask", "SQLAlchemy"],
    githubUrl: "https://github.com/JoseOtavioJunqueira/taskmaster-flask",
  },
  {
    id: 3,
    image: "/projects/portfolio-selection.png",
    tags: ["Python", "pandas", "NumPy"],
    githubUrl: "https://github.com/JoseOtavioJunqueira/portfolio-selection-models",
  },
  {
    id: 4,
    image: "/projects/quant-strategies.png",
    tags: ["Python", "scikit-learn", "yfinance"],
    githubUrl: "https://github.com/JoseOtavioJunqueira/quantitative-investment-strategies",
  },
  {
    id: 6,
    image: "/projects/sales-prediction.png",
    tags: ["Python", "scikit-learn", "pandas"],
    githubUrl: "https://github.com/JoseOtavioJunqueira/sales-prediction-ml",
  },
];

export const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          {t("projects.title")}{" "}
          <span className="text-primary">{t("projects.titleHighlight")} </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t("projects.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={t(`projects.items.${project.id}.title`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">
                  {" "}
                  {t(`projects.items.${project.id}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {t(`projects.items.${project.id}.description`)}
                </p>
                {(project.demoUrl || project.githubUrl) && (
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live demo"
                          className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Source code on GitHub"
                          className="text-foreground/80 hover:text-primary transition-colors duration-300"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/JoseOtavioJunqueira"
          >
            {t("projects.viewGithub")} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
