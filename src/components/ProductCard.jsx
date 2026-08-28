import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag, Star, X } from "lucide-react";
import { useStore, inr } from "@/lib/store";

export function Stars({ rating, count }) {
  return (
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      <Star className="h-3.5 w-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]" />
      <span className="font-medium text-foreground">{rating}</span>
      {count != null && <span>({count})</span>}
    </span>
  );
}

export default function ProductCard({ product, showNewBadge = true }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [quick, setQuick] = useState(false);
  const wished = wishlist.includes(product.id);

  return (
    <article className="group relative">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-cream)]">
        <Link to="/product/$id" params={{ id: product.id }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={900}
            height={1200}
            className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] tracking-wider text-primary-foreground uppercase">
              {product.discount}% Off
            </span>
          )}
          {showNewBadge && product.newArrival && (
            <span className="rounded-full bg-[var(--color-blush)] px-2.5 py-1 text-[0.65rem] tracking-wider text-accent-foreground uppercase">
              New
            </span>
          )}
          {product.stock === 0 && (
            <span className="rounded-full bg-foreground px-2.5 py-1 text-[0.65rem] tracking-wider text-background uppercase">
              Sold Out
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 transition-transform hover:scale-110"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${wished ? "fill-secondary text-secondary" : "text-foreground"}`}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            className="btn-primary flex-1 !px-3 !py-2 !text-[0.7rem]"
            onClick={() => addToCart(product, product.sizes[0])}
            disabled={product.stock === 0}
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
          <button
            className="btn-light !px-3 !py-2 !text-[0.7rem]"
            onClick={() => setQuick(true)}
            aria-label="Quick view"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="font-display text-lg leading-snug">
          <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <p className="flex items-baseline gap-2">
            <span className="text-base font-medium text-primary">{inr(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">
              {inr(product.originalPrice)}
            </span>
          </p>
          <Stars rating={product.rating} count={product.reviewCount} />
        </div>
      </div>

      {quick && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-foreground/50 p-4" onClick={() => setQuick(false)}>
          <div
            className="animate-fade-up grid max-h-[90vh] w-full max-w-3xl gap-6 overflow-auto rounded-2xl bg-card p-5 sm:grid-cols-2 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-xl object-cover"
            />
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl">{product.name}</h3>
                <button aria-label="Close quick view" onClick={() => setQuick(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <Stars rating={product.rating} count={product.reviewCount} />
              <p className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl text-primary">{inr(product.price)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {inr(product.originalPrice)}
                </span>
                <span className="text-sm text-secondary">{product.discount}% off</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
              <p className="mt-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Sizes: {product.sizes.join(", ")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="btn-primary" onClick={() => addToCart(product, product.sizes[0])}>
                  Add to Cart
                </button>
                <Link to="/product/$id" params={{ id: product.id }} className="btn-outline">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
