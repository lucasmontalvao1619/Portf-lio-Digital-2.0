import { useOutletContext } from "react-router";
import { AboutSection } from "../components/home/AboutSection";
import { BeyondCodeSection } from "../components/home/BeyondCodeSection";
import { ContactSection } from "../components/home/ContactSection";
import { EducationSection } from "../components/home/EducationSection";
import { HeroSection } from "../components/home/HeroSection";
import { JourneySection } from "../components/home/JourneySection";
import { ServicesSection } from "../components/home/ServicesSection";
import { SkillsSection } from "../components/home/SkillsSection";
import { InfiniteBar } from "../components/common/InfiniteBar";
import { Divider } from "../components/common/Common";
import { IDENTITY, MARQUEE } from "../data/content";
import type { OutletCtx } from "../data/content";

export function HomePage() {
  const { isDark, lang, tr, scrollToSection, handleProjectsClick } = useOutletContext<OutletCtx>();

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

      <BeyondCodeSection lang={lang} tr={tr} />

      <Divider />

      <EducationSection tr={tr} />

      <Divider />

      <JourneySection isDark={isDark} tr={tr} />

      <InfiniteBar items={IDENTITY} duration="80s" />

      <ContactSection tr={tr} />
    </>
  );
}
