"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (key: keyof typeof form, value: string) => setForm(current => ({ ...current, [key]: value }));

  // There is no messaging backend. Open a prefilled WhatsApp conversation instead
  // of displaying a false “message sent” confirmation.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Hello BATHAE, I'd like to get in touch.\n\nName: ${form.name}\nEmail: ${form.email || "Not provided"}\nPhone: ${form.phone || "Not provided"}\n\n${form.message}`;
    window.open(`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  return <main className="min-h-screen bg-[#f4f1eb] pt-20">
    <section className="relative overflow-hidden bg-[#111310] px-6 py-20 text-white sm:py-28 lg:px-12">
      <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full border border-[#a98551]/15 shadow-[0_0_130px_30px_rgba(177,136,76,.09)]" aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-screen-xl">
        <p className="eyebrow text-[#d9bb82]">Contact / BATHAE</p>
        <h1 className="mt-7 max-w-4xl text-[clamp(3rem,9vw,9rem)] leading-[0.92] tracking-[-0.06em]">Let&apos;s make <br /><span className="italic text-[#bca88d]">space for better.</span></h1>
        <p className="mt-9 max-w-lg text-lg leading-relaxed text-white/60">Questions about the collection? Planning a space of your own? We&apos;d love to hear from you.</p>
      </motion.div>
    </section>

    <section className="mx-auto grid max-w-screen-xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12 lg:py-24">
      <div>
        <p className="eyebrow text-[#947148]">The conversation starts here</p>
        <h2 className="mt-5 max-w-md text-5xl leading-[1.05] tracking-tight text-stone-900">We&apos;re here to <span className="italic text-[#9a8265]">help.</span></h2>
        <p className="mt-5 max-w-md leading-relaxed text-stone-600">Whether it&apos;s a question about a finish, an order, or the right fit for your project, reach out in the way that works for you.</p>
        <div className="mt-10 space-y-3">
          {[
            { Icon: Mail, label: "Email us", value: BRAND_CONFIG.email, href: `mailto:${BRAND_CONFIG.email}` },
            { Icon: Phone, label: "Call us", value: BRAND_CONFIG.phone, href: `tel:${BRAND_CONFIG.phone.replace(/\s/g, "")}` },
            { Icon: MapPin, label: "Based in", value: BRAND_CONFIG.address, href: undefined },
          ].map(({ Icon, label, value, href }) => <div key={label} className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-white/65 p-4 shadow-[0_12px_40px_rgba(40,32,20,.03)] sm:p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eae3d7] text-[#765f41]"><Icon size={20} strokeWidth={1.5} /></span>
            <div className="min-w-0 flex-1"><p className="text-[10px] uppercase tracking-[0.18em] text-stone-500">{label}</p>{href ? <a href={href} className="mt-1 block break-all text-sm font-medium text-stone-900 transition-colors hover:text-[#9a7444] sm:text-base">{value}</a> : <p className="mt-1 text-sm font-medium text-stone-900 sm:text-base">{value}</p>}</div>
            {href && <ArrowUpRight className="shrink-0 text-stone-400" size={17} />}
          </div>)}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-stone-500">Prefer a quick conversation? <a className="font-semibold text-stone-800 underline underline-offset-4 hover:text-amber-700" href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(BRAND_CONFIG.whatsappDefaultMessage)}`} target="_blank" rel="noopener noreferrer">Start a WhatsApp chat <ArrowUpRight className="inline" size={13} /></a></p>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_80px_rgba(44,36,25,.08)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#e6d5b8]/25 blur-3xl" aria-hidden="true" />
        <div className="relative"><div className="flex items-center justify-between gap-3"><p className="eyebrow text-[#947148]">Send an enquiry</p><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f1e8d9] text-[#8e6c41]"><MessageCircle size={20} strokeWidth={1.5} /></span></div><h2 className="mt-5 text-4xl tracking-tight text-stone-900 sm:text-5xl">Tell us what&apos;s <span className="italic">on your mind.</span></h2><p className="mt-3 text-sm leading-relaxed text-stone-500">Fill this in and continue the conversation in WhatsApp.</p>
          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="contact-name" className="contact-label">Your name *</label><input id="contact-name" autoComplete="name" required maxLength={100} value={form.name} onChange={e => update("name", e.target.value)} className="contact-input" placeholder="Your name" /></div><div><label htmlFor="contact-phone" className="contact-label">Phone number</label><input id="contact-phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={e => update("phone", e.target.value)} className="contact-input" placeholder="Your number" /></div></div>
            <div><label htmlFor="contact-email" className="contact-label">Email address</label><input id="contact-email" type="email" autoComplete="email" maxLength={150} value={form.email} onChange={e => update("email", e.target.value)} className="contact-input" placeholder="you@example.com" /></div>
            <div><label htmlFor="contact-message" className="contact-label">How can we help? *</label><textarea id="contact-message" required maxLength={2000} rows={5} value={form.message} onChange={e => update("message", e.target.value)} className="contact-input resize-y" placeholder="Tell us about your project or question..." /></div>
            <button type="submit" className="button-luxe button-dark w-full justify-center">Continue in WhatsApp <ArrowRight size={17} /></button>
            <p className="text-center text-xs text-stone-500">This opens WhatsApp with your message ready to send. Nothing is submitted on this page.</p>
          </form>
        </div>
      </div>
    </section>
  </main>;
}
