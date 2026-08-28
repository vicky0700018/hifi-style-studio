import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/_site/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist | HIFI FASHIONS Pune" },
      { name: "description", content: "Your saved sarees, suits, dresses and denim at HIFI FASHIONS." },
      { property: "og:title", content: "Wishlist | HIFI FASHIONS" },
      { property: "og:description", content: "Saved styles from our Pune boutique." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your wishlist is empty</h1>
        <p className="mt-3 text-muted-foreground">Tap the heart on any piece to save it here.</p>
        <Link to="/shop" className="btn-primary mt-8">
          Browse Collections
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-4xl">My Wishlist</h1>
      <p className="mt-2 text-muted-foreground">{items.length} saved pieces</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="card-surface overflow-hidden">
            <Link to="/product/$id" params={{ id: p.id }}>
              <img
                src={p.images[0]}
                alt={p.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-top"
              />
            </Link>
            <div className="p-5">
              <h2 className="font-display text-lg">{p.name}</h2>
              <p className="mt-1 text-primary">{inr(p.price)}</p>
              <div className="mt-4 flex gap-2">
                <button
                  className="btn-primary flex-1 !px-3 !py-2 !text-[0.7rem]"
                  onClick={() => {
                    addToCart(p, p.sizes[0]);
                    toggleWishlist(p);
                  }}
                >
                  Move to Cart
                </button>
                <button
                  className="btn-outline !px-3 !py-2"
                  aria-label="Remove from wishlist"
                  onClick={() => toggleWishlist(p)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
