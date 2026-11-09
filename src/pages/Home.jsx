import { Navbar } from "../components/Navbar";
import { DataBackground } from "@/components/DataBackground";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BootScreen } from "@/components/BootScreen";
import { CommandPalette } from "@/components/CommandPalette";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ArchitectureSection } from "../components/ArchitectureSection";
import { SkillsSection } from "../components/SkillsSection";
import { ApiPlayground } from "../components/ApiPlayground";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <BootScreen />
      <ScrollProgress />
      <DataBackground />
      <CursorGlow />
      <CommandPalette />

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ArchitectureSection />
        <SkillsSection />
        <ApiPlayground />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};
