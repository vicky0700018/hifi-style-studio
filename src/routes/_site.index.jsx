import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gem, RefreshCw, Sparkles, Truck } from "lucide-react";
import { useStore } from "@/lib/store";
import ProductGrid, { SectionHeading } from "@/components/ProductGrid";
import CategoryCard from "@/components/CategoryCard";
import editorial from "@/assets/editorial-beautiful.jpg";
import ethnicBanner from "@/assets/hero-ethnic.jpg";
import bridalBanner from "@/assets/cat-bridal.jpg";
import westernBanner from "@/assets/hero-western.jpg";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "HIFI FASHIONS | Women's Ethnic & Western Fashion in Pune" },
      {
        name: "description",
        content:
          "Shop stylish sarees, ethnic wear, bridal collections, dresses, tops, jeans and contemporary women's fashion at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "HIFI FASHIONS | Women's Fashion Boutique, Pune" },
      {
        property: "og:description",
        content:
          "Designer sarees, bridal salwar kameez, sharara sets, dresses, tops and jeans in Chandan Nagar, Pune.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { banners, categories, products, reviews } = useStore();
  const activeBanners = banners.filter((b) => b.active);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (activeBanners.length < 2) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % activeBanners.length), 6000);
    return () => clearInterval(t);
  }, [activeBanners.length]);

  const featured = products.filter((p) => p.status === "active" && p.featured).slice(0, 8);
  const arrivals = products.filter((p) => p.status === "active" && p.newArrival).slice(0, 8);
  const western = products
    .filter((p) => ["Dresses", "Tops", "Jeans"].includes(p.category) && p.status === "active")
    .slice(0, 4);
  const bridal = products
    .filter((p) => ["Bridal Wear", "Sharara Sets"].includes(p.category) && p.status === "active")
    .slice(0, 3);
  const topReviews = reviews.filter((r) => r.status === "approved").slice(0, 3);

  const banner = activeBanners[slide] || activeBanners[0];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[var(--color-cream)]">
        {banner && (
          <>
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.title}
              width={1600}
              height={1100}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cream)] via-[var(--color-cream)]/85 to-transparent md:to-[var(--color-cream)]/10" />
            <div className="relative mx-auto grid max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
              <div key={banner.id + "-text"} className="animate-fade-up max-w-xl">
                <p className="eyebrow">{banner.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-[1.08] sm:text-6xl">
                  {banner.title}
                </h1>
                <p className="mt-5 max-w-md text-base text-foreground/75">{banner.subtitle}</p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link to={banner.ctaLink} className="btn-primary">
                    {banner.ctaText}
                  </Link>
                  <Link to={banner.ctaSecondaryLink} className="btn-outline">
                    {banner.ctaSecondaryText}
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
              {activeBanners.map((b, i) => (
                <button
                  key={b.id}
                  aria-label={`Show slide ${i + 1}`}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-8 bg-primary" : "w-3 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Sparkles, "Handpicked Styles", "New drops every fortnight"],
            [Gem, "Boutique Quality", "Fabric checked in-store"],
            [Truck, "Pune Fast Delivery", "Chandan Nagar & nearby"],
            [RefreshCw, "Easy Exchange", "7-day size exchange"],
          ].map(([Icon, title, sub]) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Curated for you"
          title="Shop By Category"
          subtitle="From wedding-ready ethnic wear to everyday western staples."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.filter((c) => c.active).slice(0, 8).map((c) => (
            <CategoryCard key={c.id} category={c} to="/shop" />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <SectionHeading
          eyebrow="Best sellers"
          title="Trending This Season"
          subtitle="The pieces our Pune customers are loving right now."
          action={
            <Link to="/shop" className="btn-outline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <ProductGrid products={featured} />
      </section>

      {/* EDITORIAL */}
      <section className="bg-[var(--color-cream)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
          <img
            src={editorial}
            alt="Women styled in ethnic and western fashion at HIFI FASHIONS Pune"
            loading="lazy"
            width={1400}
            height={1000}
            className="rounded-3xl object-cover shadow-[var(--shadow-card)]"
          />
          <div>
            <p className="eyebrow">HIFI Fashions Editorial</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Find Your Kind of Beautiful</h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              From timeless ethnic elegance to contemporary everyday styles, discover looks that
              feel uniquely you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/ethnic-wear" className="btn-primary">
                Explore Ethnic Wear
              </Link>
              <Link to="/western-wear" className="btn-outline">
                Shop Western Wear
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading
          eyebrow="Fresh off the rack"
          title="Just In — New Arrivals"
          action={
            <Link to="/new-arrivals" className="btn-outline">
              View All New Arrivals
            </Link>
          }
        />
        <ProductGrid products={arrivals} />
      </section>

      {/* ETHNIC BANNER */}
      <section className="relative isolate overflow-hidden">
        <img
          src={ethnicBanner}
          alt="Ethnic collection at HIFI FASHIONS"
          loading="lazy"
          className="h-[420px] w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="max-w-lg text-background">
              <p className="text-[0.7rem] tracking-[0.28em] text-[var(--color-blush)] uppercase">
                Ethnic Collection
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Celebrate Every Occasion</h2>
              <p className="mt-4 text-background/85">
                Elegant ethnic styles for weddings, festivals and unforgettable moments.
              </p>
              <Link to="/ethnic-wear" className="btn-light mt-8">
                Shop Ethnic Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WESTERN */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:items-center">
          <div>
            <p className="eyebrow">Western Wear</p>
            <h2 className="mt-3 font-display text-4xl">Contemporary Looks</h2>
            <p className="mt-4 text-muted-foreground">
              Dresses, tops, jeans, one-pieces and easy casual wear for work, brunch and everything
              in between.
            </p>
            <img
              src={westernBanner}
              alt="Western wear collection"
              loading="lazy"
              className="mt-6 hidden rounded-2xl object-cover lg:block"
            />
            <Link to="/western-wear" className="btn-outline mt-6">
              Shop Western Wear
            </Link>
          </div>
          <ProductGrid products={western} />
        </div>
      </section>

      {/* BRIDAL */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-[0.7rem] tracking-[0.28em] text-[var(--color-blush)] uppercase">
                The Bridal Edit
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">Made For Forever Moments</h2>
              <p className="mt-4 max-w-md text-primary-foreground/80">
                Make every celebration unforgettable with elegant bridal and occasion wear —
                bridal salwar suits, sharara sets, designer sarees and embroidered suits.
              </p>
              <ul className="mt-6 grid gap-2 text-sm text-primary-foreground/80 sm:grid-cols-2">
                {["Bridal Salwar Suits", "Sharara Sets", "Designer Sarees", "Embroidered Suits"].map(
                  (i) => (
                    <li key={i}>— {i}</li>
                  ),
                )}
              </ul>
              <Link to="/bridal" className="btn-light mt-8">
                Explore Bridal Collection
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <img
                src={bridalBanner}
                alt="Bridal wear at HIFI FASHIONS"
                loading="lazy"
                className="col-span-1 h-full rounded-2xl object-cover"
              />
              <div className="col-span-2 grid grid-cols-2 gap-3">
                {bridal.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="group overflow-hidden rounded-2xl bg-primary-foreground/10"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <p className="p-3 text-xs">{p.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <SectionHeading eyebrow="Loved in Pune" title="What Our Customers Say" />
        <div className="grid gap-5 md:grid-cols-3">
          {topReviews.map((r) => (
            <blockquote key={r.id} className="card-surface p-6">
              <p className="text-sm text-[var(--color-gold)]">{"★".repeat(r.rating)}</p>
              <p className="mt-3 font-display text-lg leading-relaxed">“{r.text}”</p>
              <footer className="mt-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {r.customer}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </>
  );
}
