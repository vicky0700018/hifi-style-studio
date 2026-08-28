import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Minus, Plus, RefreshCw, Ruler, Truck } from "lucide-react";
import { useStore, inr } from "@/lib/store";
import ProductGrid, { SectionHeading } from "@/components/ProductGrid";
import { Stars } from "@/components/ProductCard";

export const Route = createFileRoute("/_site/product/$id")({
  head: () => ({
    meta: [
      { title: "Product Details | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "View fabric, sizes, colours, delivery and return details for this HIFI FASHIONS piece.",
      },
      { property: "og:title", content: "Product Details | HIFI FASHIONS" },
      { property: "og:description", content: "Women's fashion from our Chandan Nagar boutique." },
    ],
  }),
  component: ProductDetails,
});

function ProductDetails() {
  const { id } = Route.useParams();
  const { products, reviews, addToCart, toggleWishlist, wishlist } = useStore();
  const product = products.find((p) => p.id === id || p.slug === id);

  const [image, setImage] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  const related = useMemo(
    () =>
      products
        .filter((p) => product && p.category === product.category && p.id !== product.id)
        .slice(0, 4),
    [products, product],
  );

  const productReviews = reviews.filter(
    (r) => product && r.productId === product.id && r.status === "approved",
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6">
          Back to shop
        </Link>
      </div>
    );
  }

  const wished = wishlist.includes(product.id);
  const chosenSize = size || product.sizes[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        / <Link to="/shop" className="hover:text-primary">Shop</Link> / {product.category}
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl bg-[var(--color-cream)]">
            <img
              src={product.images[image]}
              alt={product.name}
              width={900}
              height={1200}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-xl border-2 transition-colors ${
                  image === i ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-24 w-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <Stars rating={product.rating} count={product.reviewCount} />
            <span className="text-xs text-muted-foreground">SKU {product.sku}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl text-primary">{inr(product.price)}</span>
            <span className="text-muted-foreground line-through">{inr(product.originalPrice)}</span>
            <span className="rounded-full bg-[var(--color-blush)] px-2.5 py-1 text-xs text-accent-foreground">
              {product.discount}% off
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-8">
            <p className="text-xs tracking-[0.2em] uppercase">Select size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 rounded-full border px-4 py-2 text-sm transition-colors ${
                    chosenSize === s
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs tracking-[0.2em] uppercase">Colour</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    (color || product.colors[0]) === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <p className="text-xs tracking-[0.2em] uppercase">Qty</p>
            <div className="flex items-center rounded-full border border-border">
              <button className="px-3 py-2" aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button className="px-3 py-2" aria-label="Increase" onClick={() => setQty(qty + 1)}>
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className={`text-xs ${product.stock > 0 ? "text-muted-foreground" : "text-destructive"}`}>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="btn-primary"
              disabled={product.stock === 0}
              onClick={() => addToCart(product, chosenSize, qty)}
            >
              Add to Cart
            </button>
            <Link
              to="/checkout"
              className="btn-outline"
              onClick={() => addToCart(product, chosenSize, qty)}
            >
              Buy Now
            </Link>
            <button
              className="btn-outline !px-4"
              aria-label="Add to wishlist"
              onClick={() => toggleWishlist(product)}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-secondary text-secondary" : ""}`} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-secondary" /> Pune delivery in 2–4 days
            </p>
            <p className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-secondary" /> 7-day exchange
            </p>
            <p className="flex items-center gap-2">
              <Ruler className="h-4 w-4 text-secondary" /> Size guide below
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <section className="mt-16">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          {[
            ["description", "Description"],
            ["details", "Product Details"],
            ["size", "Size Guide"],
            ["delivery", "Delivery Info"],
            ["returns", "Return Policy"],
            ["reviews", `Reviews (${productReviews.length})`],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors ${
                tab === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {tab === "description" && <p>{product.description}</p>}
          {tab === "details" && (
            <ul className="space-y-2">
              {product.details.map((d) => (
                <li key={d}>— {d}</li>
              ))}
              <li>— Occasion: {product.occasion}</li>
              <li>— Available colours: {product.colors.join(", ")}</li>
            </ul>
          )}
          {tab === "size" && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-md text-left text-sm">
                <thead className="text-foreground">
                  <tr>
                    <th className="py-2">Size</th>
                    <th>Bust (in)</th>
                    <th>Waist (in)</th>
                    <th>Hip (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["XS", 32, 26, 35],
                    ["S", 34, 28, 37],
                    ["M", 36, 30, 39],
                    ["L", 38, 32, 41],
                    ["XL", 40, 34, 43],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-border">
                      <td className="py-2">{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "delivery" && (
            <p>
              Orders are dispatched from our Chandan Nagar store within 24 hours. Delivery across
              Pune (Viman Nagar, Kharadi, Wadgaon Sheri and nearby) takes 2–4 working days. Rest of
              India 4–7 working days. Free shipping on orders above ₹1,999.
            </p>
          )}
          {tab === "returns" && (
            <p>
              Easy 7-day size exchange on unused pieces with tags intact. Bridal and customised
              orders are non-returnable. Refunds for prepaid orders are processed within 5 working
              days of pickup.
            </p>
          )}
          {tab === "reviews" && (
            <div className="space-y-4">
              {productReviews.length === 0 && <p>No reviews yet for this product.</p>}
              {productReviews.map((r) => (
                <div key={r.id} className="card-surface p-5">
                  <p className="text-sm text-[var(--color-gold)]">{"★".repeat(r.rating)}</p>
                  <p className="mt-2 text-foreground">{r.text}</p>
                  <p className="mt-2 text-xs uppercase">
                    {r.customer} · {r.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading eyebrow="Styled with" title="You May Also Like" />
        <ProductGrid products={related} />
      </section>
    </div>
  );
}
