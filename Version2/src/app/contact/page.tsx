"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BRAND_CONFIG } from "@/lib/config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'd like to get in touch with BATHAE.`
  )}`;

  return (
    <main className="pt-20 min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-20 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[11px] text-amber-500 tracking-[0.3em] uppercase font-medium mb-3">
              Get in Touch
            </p>
            <h1 className="text-5xl font-light text-stone-900">Contact</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <div className="space-y-8 mb-12">
              {[
                { label: "Email", value: BRAND_CONFIG.email, href: `mailto:${BRAND_CONFIG.email}` },
                { label: "Phone", value: BRAND_CONFIG.phone, href: `tel:${BRAND_CONFIG.phone}` },
                { label: "Location", value: BRAND_CONFIG.address, href: undefined },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] text-stone-400 tracking-[0.25em] uppercase mb-2">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-stone-800 hover:text-amber-600 transition-colors text-lg font-light"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-stone-800 text-lg font-light">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-[#20bd5a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 p-10 text-center"
              >
                <p className="text-3xl mb-4">✓</p>
                <h3 className="text-stone-900 font-semibold text-lg mb-2">Message Received</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Thank you for reaching out. Our team will be in touch with you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Phone</label>
                    <input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-500 tracking-widest uppercase mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className="w-full border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 outline-none focus:border-stone-400 resize-none transition-colors"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-stone-900 text-white py-4 text-sm font-medium tracking-widest uppercase hover:bg-stone-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
