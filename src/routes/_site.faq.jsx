import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_site/faq")({
  head: () => ({
    meta: [
      { title: "FAQ, Shipping & Returns | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Answers about sizing, shipping across Pune, exchanges, returns and store visits at HIFI FASHIONS.",
      },
      { property: "og:title", content: "FAQ | HIFI FASHIONS" },
      { property: "og:description", content: "Shipping, returns and sizing help." },
    ],
  }),
  component: Faq,
});

const faqs = [
  ["Do you deliver across Pune?", "Yes. We deliver across Chandan Nagar, Viman Nagar, Kharadi, Wadgaon Sheri and all of Pune in 2–4 working days, and across India in 4–7 working days."],
  ["Is shipping free?", "Shipping is free on all orders above ₹1,999. Below that a flat ₹99 is charged."],
  ["How do I choose the right size?", "Every product page carries a size guide with bust, waist and hip measurements. For sarees we offer free size with standard blouse pieces."],
  ["Can I exchange a product?", "Yes, unused products with tags intact can be exchanged within 7 days. Bridal and customised orders are non-returnable."],
  ["Do you take bridal orders?", "Absolutely. Visit the store or call 99217 12268 and our team will help with bridal salwar suits, shararas and designer sarees, including alterations."],
  ["Can I pay cash on delivery?", "Yes, we offer Cash on Delivery, UPI and card payments. This website is a demo, so no live payment is processed here."],
  ["Where is the store located?", "Mathura Housing Society, Near Shivaji Chowk, Chandan Nagar, Wadgaon Sheri, Pune, Maharashtra 411014."],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">Help Centre</p>
      <h1 className="mt-2 font-display text-5xl">Frequently Asked Questions</h1>

      <div className="mt-10 divide-y divide-border">
        {faqs.map(([q, a], i) => (
          <article key={q}>
            <button
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="font-display text-lg">{q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
