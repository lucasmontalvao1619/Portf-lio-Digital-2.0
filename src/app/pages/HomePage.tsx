import { useOutletContext } from "react-router";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import cvUrl from "../../imports/Curriculo_LucasMontalvao_2-1.pdf?url";
import { ContactForm } from "../components/contact/ContactForm";
import { InfiniteBar } from "../components/common/InfiniteBar";
import { Divider, Reveal, SectionHeader, TechIconButton } from "../components/common/Common";
import { BEYOND_CARDS, CONTACT_LINKS, IDENTITY, MARQUEE, SKILL_CARDS, TRAJ_YEARS } from "../data/content";
import type { OutletCtx } from "../data/content";

export function HomePage() {
  const { isDark, lang, tr, scrollToSection, handleProjectsClick } = useOutletContext<OutletCtx>();

  const gridLine  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const trajLine  = isDark ? "rgba(255,255,255,0.14)" : "#d9d9d9";
  const trajDot   = isDark ? "rgba(255,255,255,0.18)" : "#d9d9d9";
  const yearInact = isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.32)";
  const contactIcons = {
    github: <Github size={14} strokeWidth={1.5} />,
    linkedin: <Linkedin size={14} strokeWidth={1.5} />,
    mail: <Mail size={14} strokeWidth={1.5} />,
    phone: <Phone size={14} strokeWidth={1.5} />,
  };

  return (
    <>

      <section id="inicio" className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right,${gridLine} 1px,transparent 1px),linear-gradient(to bottom,${gridLine} 1px,transparent 1px)`,
          backgroundSize: "155px 110px",
        }} />
        {["top-[88px] left-8 md:left-14 border-l border-t","top-[88px] right-8 md:right-14 border-r border-t","bottom-14 left-8 md:left-14 border-l border-b","bottom-14 right-8 md:right-14 border-r border-b"].map((cls, i) => (
          <div key={i} className={`absolute w-5 h-5 border-foreground/10 pointer-events-none ${cls}`} />
        ))}

        <div className="text-center max-w-4xl mx-auto relative z-10">

          <div className="inline-flex items-center gap-2.5 mb-10 afu">
            <span className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: "var(--foreground)", opacity: 0.45, animation: "pulse-dot 2.5s ease-in-out infinite" }} />
            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">{tr.status}</p>
          </div>

          <h1 className="leading-none mb-8 afu d100"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem,9vw,9rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>
            Lucas Montalvão
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xs mx-auto mb-14 leading-relaxed font-light afu d200">
            {tr.tagline}
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap afu d300">
            <button onClick={handleProjectsClick}
              className="px-6 py-2.5 bg-foreground text-primary-foreground text-sm font-medium hover:opacity-80 transition-opacity">
              {tr.btn_projects}
            </button>
            <a href={cvUrl} download="Curriculo_LucasMontalvao.pdf"
              className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center gap-2">
              <Download size={14} strokeWidth={1.75} />{tr.btn_cv}
            </a>
            <button onClick={() => scrollToSection("contato")}
              className="px-6 py-2.5 border border-border text-sm font-medium hover:bg-muted transition-colors">
              {tr.btn_contact}
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 afu d450">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-border mx-auto" />
        </div>
      </section>

      <InfiniteBar items={MARQUEE} duration="35s" />

      <section id="sobre" className="py-24 md:py-36 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader title={tr.s_about} />
          <Reveal delay={80}>
            <p className="font-sans font-light text-foreground leading-[1.72]"
              style={{ fontSize: "clamp(1.15rem,2.4vw,1.45rem)" }}>
              {tr.about_text}
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section id="habilidades" className="py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader title={tr.s_skills} subtitle={tr.skills_subtitle} />
        </div>
        <Reveal delay={60}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: "1px solid var(--border)" }}>
              {SKILL_CARDS.map((card, ci) => {
                const CatIcon = card.catIcon;
                return (
                  <div key={ci} className="p-10 md:p-12 transition-colors duration-300 hover:bg-muted/30"
                    style={{
                      borderRight:  ci % 2 === 0 ? "1px solid var(--border)" : undefined,
                      borderBottom: ci < 2        ? "1px solid var(--border)" : undefined,
                    }}>
                    <div className="flex items-center gap-2.5 mb-8">
                      <CatIcon size={14} strokeWidth={1.5} className="text-muted-foreground" />
                      <p className="font-mono text-[9px] tracking-[0.28em] text-muted-foreground/60 uppercase">
                        {tr.skill_cats[ci]}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {card.items.map((item) => (
                        <TechIconButton key={item.name} name={item.name} Icon={item.Icon} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <Divider />

      <section id="servicos" className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={tr.s_services} />
          <Reveal delay={60} className="-mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              {tr.services.map((svc, i) => (
                <div key={i}>
                  <div className="flex items-start gap-2.5 mb-3">
                    <span className="font-mono text-muted-foreground/40 text-sm leading-snug shrink-0 mt-0.5">✦</span>
                    <p className="text-sm font-medium text-foreground leading-snug">{svc.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-[1.35rem]">{svc.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={tr.s_beyond} subtitle={tr.beyond_subtitle} />

          <Reveal delay={60} className="-mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {BEYOND_CARDS[lang].map((card) => {
                const Icon = card.Icon;
                return (
                  <div key={card.num}
                    className="border border-border p-8 md:p-10 flex flex-col gap-6 cursor-default
                      hover:-translate-y-1 hover:border-foreground/20
                      transition-all duration-300 ease-out">

                    <div className="flex items-center justify-between">
                      <Icon size={16} strokeWidth={1.25} className="text-muted-foreground/40" />
                      <span className="font-mono text-[9px] tracking-[0.28em] text-muted-foreground/30 uppercase">
                        {card.num}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <h3 className="font-medium text-foreground leading-snug"
                        style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)" }}>
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border flex flex-col gap-3">
                      <p className="font-mono text-[9px] tracking-[0.24em] text-muted-foreground/35 uppercase">
                        {tr.beyond_highlights_label}
                      </p>
                      <ul className="flex flex-col gap-2">
                        {card.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30 shrink-0" />
                            <span className="text-xs text-muted-foreground/70">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-center text-sm text-muted-foreground/40 mt-16 max-w-xl mx-auto leading-relaxed font-light italic">
              {tr.beyond_footer}
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section id="formacao" className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={tr.s_education} />
          <Reveal delay={60} className="-mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tr.education.map((edu, i) => (
                <div key={i}
                  className="border border-border p-7 flex flex-col gap-3 transition-colors duration-300 hover:bg-muted/30"
                  style={{ opacity: 0, animation: `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 80}ms both` }}>
                  <p className="text-sm font-medium text-foreground leading-snug">{edu.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60">{edu.period}</p>
                    {edu.ongoing && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/40"
                        style={{ animation: "pulse-dot 2.5s ease-in-out infinite" }} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{edu.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      <section id="trajetoria" className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={tr.s_traj} />
          <div className="max-w-2xl mx-auto -mt-8">
            <div className="relative">
              <div className="absolute top-2 bottom-2 w-px" style={{ left: "5.5rem", background: trajLine }} />
              <div className="flex flex-col">
                {TRAJ_YEARS.map((year, i) => {
                  const isToday = year === "";
                  return (
                    <div key={i} className="relative flex items-start group"
                      style={{ paddingTop: i === 0 ? 0 : "3.5rem", opacity: 0, animation: `fade-up 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 90 + 100}ms both` }}>
                      <div className="shrink-0 text-right pr-5 pt-0.5" style={{ width: "5.5rem" }}>
                        <span className="font-mono text-xs" style={{ color: isToday ? "var(--foreground)" : yearInact }}>
                          {isToday ? tr.traj_today : year}
                        </span>
                      </div>
                      <div className="relative z-10 shrink-0" style={{ width: 0 }}>
                        <div className="absolute transition-all duration-300 group-hover:scale-125"
                          style={{ width: 10, height: 10, borderRadius: "50%", border: isToday ? "1.5px solid var(--foreground)" : `1.5px solid ${trajDot}`, background: isToday ? "var(--foreground)" : "var(--background)", top: 2, left: -5 }} />
                      </div>
                      <div className="pl-8">
                        <p className="text-sm font-medium leading-snug mb-1.5 transition-colors duration-300 group-hover:text-foreground"
                          style={{ color: "var(--foreground)" }}>
                          {tr.traj_labels[i]}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                          {tr.traj_descs[i]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InfiniteBar items={IDENTITY} duration="80s" />

      <section id="contato" className="py-24 md:py-36 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={tr.s_contact} />

          <div className="grid md:grid-cols-[220px_1fr] gap-16 md:gap-24 mb-20 -mt-8">
            <Reveal>
              <div className="flex flex-col gap-6">
                {CONTACT_LINKS.map(({ icon, label, href }) => (
                  <a key={label} href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit">
                    {contactIcons[icon]}<span>{label}</span>
                    <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                ))}
                <a href={cvUrl} download="Curriculo_LucasMontalvao.pdf"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200">
                  <Download size={13} strokeWidth={1.75} />{tr.btn_cv}
                </a>
              </div>
            </Reveal>

            <div>
              <Reveal delay={60} className="mb-12">
                <h2 className="font-medium tracking-tight text-foreground leading-tight"
                  style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", letterSpacing: "-0.02em" }}>
                  {tr.contact_heading}
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <ContactForm tr={tr} />
              </Reveal>
            </div>
          </div>

          <Divider />
          <Reveal delay={60}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center py-16">
              {[
                { icon: <MapPin size={28} strokeWidth={1} />, title: tr.contact_address,   detail: "Aracaju, Sergipe, Brasil" },
                { icon: <Mail   size={28} strokeWidth={1} />, title: "Email",               detail: "lucasmontalvao2019@gmail.com" },
                { icon: <Phone  size={28} strokeWidth={1} />, title: tr.contact_phone_lbl, detail: "(79) 9 9609-1102"},
              ].map(({ icon, title, detail }) => (
                <div key={title} className="flex flex-col items-center gap-4">
                  <div className="text-muted-foreground/40">{icon}</div>
                  <div>
                    <p className="font-medium text-foreground mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="border border-border overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125168.3670736474!2d-37.12383844999999!3d-10.946802699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab173bd47d5f5%3A0x4d19c14b6fdc1d12!2sAracaju%2C%20SE%2C%20Brasil!5e0!3m2!1spt-BR!2sbr!4v1703620000000!5m2!1spt-BR!2sbr"
                className="w-full" style={{ height: "380px", display: "block", border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Mapa — Aracaju, SE" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
