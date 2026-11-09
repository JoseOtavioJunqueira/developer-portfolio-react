import { Reveal } from "@/components/Reveal";

export const SectionHeading = ({ label, title, highlight, subtitle }) => (
  <Reveal className="text-center mb-14">
    <span className="section-label">{label}</span>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
      {title} <span className="text-primary text-glow">{highlight}</span>
    </h2>
    {subtitle && (
      <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    )}
  </Reveal>
);
