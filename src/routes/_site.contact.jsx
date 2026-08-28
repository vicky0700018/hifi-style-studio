import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/_site/contact")({
  head: () => ({
    meta: [
      { title: "Contact HIFI FASHIONS | Chandan Nagar, Pune" },
      {
        name: "description",
        content:
          "Visit HIFI FASHIONS at Mathura Housing Society, Near Shivaji Chowk, Chandan Nagar, Wadgaon Sheri, Pune 411014. Call 99217 12268.",
      },
      { property: "og:title", content: "Contact HIFI FASHIONS, Pune" },
      { property: "og:description", content: "Store address, phone, email and enquiry form." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { settings, toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <p className="eyebrow">We'd love to hear from you</p>
      <h1 className="mt-2 font-display text-5xl">Contact Us</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card-surface p-6">
            <h2 className="font-display text-2xl">{settings.businessName}</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href={`mailto:${settings.email}`} className="break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-secondary" />
                <span>Open daily 10:30 AM – 9:30 PM</span>
              </li>
            </ul>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="relative grid h-64 place-items-center bg-[var(--color-cream)]">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-blush) 1px, transparent 1px), linear-gradient(90deg, var(--color-blush) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />
              <div className="relative text-center">
                <MapPin className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 font-display text-xl">Chandan Nagar, Wadgaon Sheri</p>
                <p className="text-xs text-muted-foreground">Near Shivaji Chowk, Pune 411014</p>
              </div>
            </div>
          </div>
        </div>

        <form
          className="card-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast("Thanks! We'll get back to you shortly");
            setForm({ name: "", email: "", phone: "", message: "" });
          }}
        >
          <h2 className="font-display text-2xl">Send an enquiry</h2>
          <div className="mt-5 space-y-4">
            <input className="field" placeholder="Name" value={form.name} onChange={set("name")} required />
            <input
              className="field"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={set("email")}
              required
            />
            <input className="field" placeholder="Phone" value={form.phone} onChange={set("phone")} />
            <textarea
              className="field min-h-36"
              placeholder="How can we help?"
              value={form.message}
              onChange={set("message")}
              required
            />
            <button className="btn-primary w-full" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
