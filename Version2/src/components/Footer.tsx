import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { BRAND_CONFIG } from "@/lib/config";
// Social icons as inline SVG since lucide-react version may not have all icons

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="relative h-10 w-36 mb-6">
              <SafeImage
                src="/logo.png"
                alt="BATHAE"
                fill
                fallbackKind="logo-light"
                className="object-contain object-left mix-blend-screen"
              />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              Premium ceramics and bathroom fixtures. Designed for those who understand that the
              finest details define the finest spaces.
            </p>
            <div className="flex gap-4">
              <a
                href={BRAND_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href={BRAND_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/collections", label: "Collections" },
                { href: "/about", label: "About" },
                { href: "/quality", label: "Quality" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-stone-400 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-6">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND_CONFIG.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {BRAND_CONFIG.phone}
                </a>
              </li>
              <li>{BRAND_CONFIG.address}</li>
              <li>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] hover:text-[#20bd5a] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} BATHAE. All rights reserved.
          </p>
          <p className="text-stone-600 text-xs">
            Premium Ceramics &amp; Bathroom Fixtures — Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
