import type React from "react";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import cvUrl from "../../../../assets/Curriculo_LucasMontalvao_2-1.pdf?url";
import { CONTACT_LINKS, isExternalLink } from "../../data/content";
import type { ContactIconKey, Tr } from "../../data/content";
import { ContactForm } from "../contact/ContactForm";
import { Divider, Reveal, SectionHeader } from "../common/Common";

const contactIcons: Record<ContactIconKey, React.ReactNode> = {
  github: <Github size={14} strokeWidth={1.5} />,
  linkedin: <Linkedin size={14} strokeWidth={1.5} />,
  mail: <Mail size={14} strokeWidth={1.5} />,
  phone: <Phone size={14} strokeWidth={1.5} />,
};

export function ContactSection({ tr }: { tr: Tr }) {
  const contactDetails = [
    { icon: <MapPin size={28} strokeWidth={1} />, title: tr.contact_address, detail: "Aracaju, Sergipe, Brasil" },
    { icon: <Mail size={28} strokeWidth={1} />, title: "Email", detail: "lucasmontalvao2019@gmail.com" },
    { icon: <Phone size={28} strokeWidth={1} />, title: tr.contact_phone_lbl, detail: "(79) 9 9609-1102" },
  ];

  return (
    <section id="contato" className="py-24 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={tr.s_contact} />

        <div className="grid md:grid-cols-[220px_1fr] gap-16 md:gap-24 mb-20 -mt-8">
          <Reveal>
            <div className="flex flex-col gap-6">
              {CONTACT_LINKS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={isExternalLink(href) ? "_blank" : undefined}
                  rel={isExternalLink(href) ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group w-fit"
                >
                  {contactIcons[icon]}
                  <span>{label}</span>
                  <ArrowUpRight size={11} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              ))}
              <a
                href={cvUrl}
                download="Curriculo_LucasMontalvao.pdf"
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-all duration-200"
              >
                <Download size={13} strokeWidth={1.75} />
                {tr.btn_cv}
              </a>
            </div>
          </Reveal>

          <div>
            <Reveal delay={60} className="mb-12">
              <h2
                className="font-medium tracking-tight text-foreground leading-tight"
                style={{ fontSize: "clamp(1.7rem,3.5vw,2.6rem)", letterSpacing: "-0.02em" }}
              >
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
            {contactDetails.map(({ icon, title, detail }) => (
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
              className="w-full"
              style={{ height: "380px", display: "block", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa — Aracaju, SE"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
