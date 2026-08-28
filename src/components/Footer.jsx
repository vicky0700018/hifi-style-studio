import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useStore } from "@/lib/store";

const shopLinks = [
  ["Sarees", "/sarees"],
  ["Ethnic Wear", "/ethnic-wear"],
  ["Western Wear", "/western-wear"],
  ["Dresses", "/dresses"],
  ["Tops", "/tops"],
  ["Jeans", "/jeans"],
  ["Bridal Collection", "/bridal"],
  ["New Arrivals", "/new-arrivals"],
];

const careLinks = [
  ["Contact Us", "/contact"],
  ["FAQ", "/faq"],
  ["Shipping", "/faq"],
  ["Returns", "/faq"],
  ["Privacy Policy", "/privacy"],
  ["Terms & Conditions", "/terms"],
];

export default function Footer() {
  const { settings } = useStore();

  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl tracking-[0.14em]">{settings.businessName}</h3>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            {settings.description}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-primary-foreground/85">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{settings.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${settings.email}`} className="break-all">
                {settings.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase">Shop</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            {shopLinks.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-primary-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase">Customer Care</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-primary-foreground/75">
            {careLinks.map(([label, to], i) => (
              <li key={label + i}>
                <Link to={to} className="transition-colors hover:text-primary-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm tracking-[0.2em] uppercase">Follow Us</h4>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-primary-foreground/25 px-4 py-2.5 transition-colors hover:bg-primary-foreground/10"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-primary-foreground/25 px-4 py-2.5 transition-colors hover:bg-primary-foreground/10"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-primary-foreground/25 px-4 py-2.5 transition-colors hover:bg-primary-foreground/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/70 sm:flex-row">
          <p>{settings.footerText}</p>
          <Link to="/admin/login" className="underline-offset-4 transition-colors hover:text-primary-foreground hover:underline">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
