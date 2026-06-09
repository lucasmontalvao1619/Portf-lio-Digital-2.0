import { useState } from "react";
import type React from "react";
import { Send } from "lucide-react";
import type { Tr } from "../../data/content";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website: string;
}

const INITIAL_FORM_DATA: ContactFormData = { name: "", email: "", message: "", website: "" };
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export function ContactForm({ tr }: { tr: Tr }) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("Preencha todos os campos.");
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: formData.website,
        }),
      });

      if (!response.ok) {
        setError(response.status === 429 ? "Aguarde um pouco antes de tentar novamente." : "Não foi possível enviar agora.");
        return;
      }

      setSent(true);
      setFormData(INITIAL_FORM_DATA);
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setSending(false);
    }
  };

  const inputBase = "w-full bg-transparent pb-3.5 pt-1 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none border-b transition-colors duration-300";

  if (sent) {
    return (
      <div className="flex items-center gap-4 py-10" style={{ opacity: 0, animation: "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
        <div className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{tr.f_sent}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Em breve entrarei em contato.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10 max-w-lg">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website}
        onChange={(e) => updateField("website", e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
        <div>
          <label htmlFor="contact-name" className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_name}</label>
          <input id="contact-name" type="text" value={formData.name} onChange={(e) => updateField("name", e.target.value)}
            className={inputBase} style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
            placeholder={tr.f_name_ph} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_email}</label>
          <input id="contact-email" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)}
            className={inputBase} style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
            placeholder={tr.f_email_ph} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_message}</label>
        <textarea id="contact-message" value={formData.message} onChange={(e) => updateField("message", e.target.value)}
          rows={4} className={`${inputBase} resize-none`} style={{ borderColor: "var(--border)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
          onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
          placeholder={tr.f_msg_ph} />
      </div>
      <div>
        <button type="submit" disabled={sending}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-foreground text-primary-foreground text-sm font-medium transition-all duration-200 hover:opacity-75 disabled:opacity-40"
          style={{ letterSpacing: "0.02em" }}>
          {sending
            ? <span style={{ letterSpacing: "0.1em", opacity: 0.7 }}>···</span>
            : <><span>{tr.f_send}</span><Send size={12} strokeWidth={1.75} /></>}
        </button>
        {error && <p className="mt-4 text-xs text-muted-foreground">{error}</p>}
      </div>
    </form>
  );
}
