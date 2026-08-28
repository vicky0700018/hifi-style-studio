import { createFileRoute, Link } from "@tanstack/react-router";
import editorial from "@/assets/editorial-beautiful.jpg";
import ethnic from "@/assets/hero-ethnic.jpg";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About HIFI FASHIONS | Boutique in Chandan Nagar, Pune" },
      {
        name: "description",
        content:
          "HIFI FASHIONS is a boutique fashion destination in Chandan Nagar, Pune offering contemporary western styles and traditional ethnic wear for women.",
      },
      { property: "og:title", content: "About HIFI FASHIONS, Pune" },
      {
        property: "og:description",
        content: "Trend-focused collections, wedding and festive fashion, everyday styles.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h1 className="mt-3 font-display text-5xl">About HIFI FASHIONS</h1>
            <p className="mt-5 text-muted-foreground">
              HIFI FASHIONS is a boutique fashion destination in Chandan Nagar, Pune, offering
              contemporary western styles and traditional ethnic wear for women. What started as a
              small neighbourhood store is now a favourite stop for shoppers across Viman Nagar,
              Kharadi and Wadgaon Sheri.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every season we handpick pieces that balance craft and comfort — designer sarees and
              bridal salwar kameez alongside easy dresses, tops and denim you can wear on repeat.
            </p>
            <Link to="/shop" className="btn-primary mt-8">
              Shop the Boutique
            </Link>
          </div>
          <img
            src={editorial}
            alt="Inside the HIFI FASHIONS boutique in Chandan Nagar, Pune"
            loading="lazy"
            className="rounded-3xl object-cover shadow-[var(--shadow-card)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Trend-Focused Collections", "New arrivals every fortnight, chosen from the season's best."],
            ["Wedding & Festive Fashion", "Bridal suits, shararas and designer sarees for big days."],
            ["Everyday Fashion", "Kurtis, tops, dresses and denim built for daily wear."],
            ["Accessible Pricing", "Boutique quality with honest neighbourhood pricing."],
          ].map(([title, text]) => (
            <article key={title} className="card-surface p-6">
              <h2 className="font-display text-xl">{title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={ethnic} alt="Ethnic wear at HIFI FASHIONS" loading="lazy" className="h-80 w-full object-cover object-top" />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="max-w-2xl text-background">
            <h2 className="font-display text-4xl">Visit us in Chandan Nagar</h2>
            <p className="mt-3 text-background/85">
              Mathura Housing Society, Near Shivaji Chowk, Wadgaon Sheri, Pune 411014.
            </p>
            <Link to="/contact" className="btn-light mt-7">
              Get Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
