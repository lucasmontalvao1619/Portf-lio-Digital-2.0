import { useState } from "react";
import type React from "react";
import { Send } from "lucide-react";
import type { Tr } from "../../data/content";

export function ContactForm({ tr }: { tr: Tr }) {
  const [data, setData]     = useState({ name: "", email: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) return;
    setSending(true);
    setTimeout(() => {
      setSent(true); setSending(false);
      setData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    }, 700);
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
    <form onSubmit={submit} noValidate className="flex flex-col gap-10 max-w-lg">
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_name}</label>
          <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
            className={inputBase} style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
            placeholder={tr.f_name_ph} />
        </div>
        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_email}</label>
          <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
            className={inputBase} style={{ borderColor: "var(--border)" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--foreground)")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--border)")}
            placeholder={tr.f_email_ph} />
        </div>
      </div>
      <div>
        <label className="block font-mono text-[9px] tracking-[0.25em] text-muted-foreground/50 uppercase mb-2">{tr.f_message}</label>
        <textarea value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })}
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
      </div>
    </form>
  );
}
