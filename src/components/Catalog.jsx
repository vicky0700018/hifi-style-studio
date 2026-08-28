import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore, inr } from "@/lib/store";
import ProductGrid from "./ProductGrid";

const SIZES = ["XS", "S", "M", "L", "XL", "26", "28", "30", "32", "34", "Free Size"];
const COLORS = ["Wine", "Maroon", "Rose", "Pink", "Blush", "Ivory", "Beige", "Blue", "Indigo", "Black", "Green", "Gold"];
const OCCASIONS = ["Casual", "Party", "Festive", "Wedding", "Office"];
const SORTS = [
  ["featured", "Featured"],
  ["newest", "Newest"],
  ["low", "Price: Low to High"],
  ["high", "Price: High to Low"],
  ["rated", "Best Rated"],
];

export default function Catalog({
  title,
  eyebrow,
  description,
  filter = () => true,
  initialCategory = "",
  query = "",
  showFilters = true,
}) {
  const { products, categories } = useStore();
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(25000);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [occasion, setOccasion] = useState("");
  const [inStock, setInStock] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [drawer, setDrawer] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = products.filter((p) => p.status === "active" && filter(p));
    if (q)
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q),
      );
    if (category) out = out.filter((p) => p.category === category);
    out = out.filter((p) => p.price <= maxPrice);
    if (size) out = out.filter((p) => p.sizes.includes(size));
    if (color) out = out.filter((p) => p.colors.some((c) => c.toLowerCase().includes(color.toLowerCase())));
    if (occasion) out = out.filter((p) => p.occasion === occasion);
    if (inStock) out = out.filter((p) => p.stock > 0);
    if (minRating) out = out.filter((p) => p.rating >= minRating);

    const sorted = [...out];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rated") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
    if (sort === "featured") sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [products, filter, query, category, maxPrice, size, color, occasion, inStock, minRating, sort]);

  const reset = () => {
    setCategory("");
    setMaxPrice(25000);
    setSize("");
    setColor("");
    setOccasion("");
    setInStock(false);
    setMinRating(0);
  };

  const filters = (
    <div className="space-y-8">
      <Block title="Category">
        <Option active={!category} onClick={() => setCategory("")} label="All categories" />
        {categories.filter((c) => c.active).map((c) => (
          <Option
            key={c.id}
            active={category === c.name}
            onClick={() => setCategory(c.name)}
            label={c.name}
          />
        ))}
      </Block>

      <Block title="Price range">
        <input
          type="range"
          min="500"
          max="25000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
          aria-label="Maximum price"
        />
        <p className="text-sm text-muted-foreground">Up to {inr(maxPrice)}</p>
      </Block>

      <Block title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip key={s} active={size === s} onClick={() => setSize(size === s ? "" : s)} label={s} />
          ))}
        </div>
      </Block>

      <Block title="Colour">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <Chip key={c} active={color === c} onClick={() => setColor(color === c ? "" : c)} label={c} />
          ))}
        </div>
      </Block>

      <Block title="Occasion">
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <Chip key={o} active={occasion === o} onClick={() => setOccasion(occasion === o ? "" : o)} label={o} />
          ))}
        </div>
      </Block>

      <Block title="Availability">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="accent-[var(--color-primary)]"
          />
          In stock only
        </label>
      </Block>

      <Block title="Rating">
        <div className="flex flex-wrap gap-2">
          {[0, 4, 4.5].map((r) => (
            <Chip
              key={r}
              active={minRating === r}
              onClick={() => setMinRating(r)}
              label={r === 0 ? "Any" : `${r}+`}
            />
          ))}
        </div>
      </Block>

      <button className="btn-outline w-full" onClick={reset}>
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-10">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>}
      </header>

      <div className="flex gap-10">
        {showFilters && (
          <aside className="hidden w-64 shrink-0 lg:block">{filters}</aside>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">{list.length} products</p>
            <div className="flex items-center gap-3">
              {showFilters && (
                <button className="btn-outline !px-4 !py-2 !text-[0.7rem] lg:hidden" onClick={() => setDrawer(true)}>
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
              )}
              <label className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="field !w-auto !py-1.5"
                >
                  {SORTS.map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <ProductGrid products={list} columns={showFilters ? 3 : 4} />
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[70] lg:hidden" onClick={() => setDrawer(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div
            className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-auto bg-card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-2xl">Filters</h2>
              <button aria-label="Close filters" onClick={() => setDrawer(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {filters}
            <button className="btn-primary mt-6 w-full" onClick={() => setDrawer(false)}>
              Show {list.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h3 className="mb-3 text-xs tracking-[0.2em] text-foreground uppercase">{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Option({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left text-sm transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
    </button>
  );
}

function Chip({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
