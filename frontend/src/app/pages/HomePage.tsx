import { useOutletContext } from "react-router";
import { InfiniteBar } from "../components/common/InfiniteBar";
import { Divider } from "../components/common/Common";
import { AboutSection } from "../features/home/AboutSection";
import { ContactSection } from "../features/home/ContactSection";
import { EducationSection } from "../features/home/EducationSection";
import { GitHubStatsSection } from "../features/home/GitHubStatsSection";
import { HeroSection } from "../features/home/HeroSection";
import { JourneySection } from "../features/home/JourneySection";
import { ServicesSection } from "../features/home/ServicesSection";
import { SkillsSection } from "../features/home/SkillsSection";
import { IDENTITY, MARQUEE } from "../data/content";
import type { OutletCtx } from "../data/content";

export function HomePage() {
  const { isDark, tr, scrollToSection, handleProjectsClick } = useOutletContext<OutletCtx>();

  return (
    <>
      <HeroSection
        isDark={isDark}
        tr={tr}
        onProjectsClick={handleProjectsClick}
        onContactClick={() => scrollToSection("contato")}
      />

      <InfiniteBar items={MARQUEE} duration="35s" />

      <AboutSection tr={tr} />

      <Divider />

      <SkillsSection tr={tr} />

      <Divider />

      <ServicesSection tr={tr} />

      <Divider />

      <EducationSection tr={tr} />

      <Divider />

      <JourneySection isDark={isDark} tr={tr} />

      <Divider />

      <GitHubStatsSection tr={tr} />

      <InfiniteBar items={IDENTITY} duration="80s" />

      <ContactSection tr={tr} />
    </>
  );
}
