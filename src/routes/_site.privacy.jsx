import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | HIFI FASHIONS Pune" },
      {
        name: "description",
        content: "How HIFI FASHIONS handles customer information on this demo storefront.",
      },
      { property: "og:title", content: "Privacy Policy | HIFI FASHIONS" },
      { property: "og:description", content: "Our approach to customer data and privacy." },
    ],
  }),
  component: Privacy,
});

const sections = [
  ["Information we collect", "For demo orders we only store the name, phone, email and address you enter, and it stays in your own browser. Nothing is sent to a server or database."],
  ["How we use information", "In our physical store, contact details are used only to confirm orders, arrange delivery and share new collection updates if you opt in."],
  ["Cookies and local storage", "This website uses browser local storage to remember your cart, wishlist and demo settings. You can clear it any time from your browser."],
  ["Sharing", "We never sell customer data. Delivery partners receive only the details required to deliver your order."],
  ["Contact", "Questions about privacy? Write to supporthififashons@gmail.com or call 99217 12268."],
];

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-2 font-display text-5xl">Privacy Policy</h1>
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
