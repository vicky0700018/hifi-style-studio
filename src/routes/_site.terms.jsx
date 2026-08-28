import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | HIFI FASHIONS Pune" },
      {
        name: "description",
        content: "Terms of use for the HIFI FASHIONS demo storefront and boutique orders.",
      },
      { property: "og:title", content: "Terms & Conditions | HIFI FASHIONS" },
      { property: "og:description", content: "Ordering, pricing and exchange terms." },
    ],
  }),
  component: Terms,
});

const sections = [
  ["Demo storefront", "This website is a frontend demonstration. Orders placed here are stored locally in your browser and are not processed, charged or shipped."],
  ["Product information", "We photograph every piece in-store. Colours may vary slightly across screens and lighting conditions."],
  ["Pricing", "All prices are in Indian Rupees and inclusive of applicable taxes. Prices may change during sale periods."],
  ["Exchanges", "Unused products with original tags may be exchanged within 7 days of delivery. Bridal and customised orders are final sale."],
  ["Intellectual property", "All imagery and copy belong to HIFI FASHIONS, Chandan Nagar, Pune and may not be reused without permission."],
  ["Governing law", "These terms are governed by the laws of India, with jurisdiction in Pune, Maharashtra."],
];

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-5xl">Terms &amp; Conditions</h1>
      <div className="mt-10 space-y-8">
        {sections.map(([title, text]) => (
          <section key={title}>
            <h2 className="font-display text-2xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
