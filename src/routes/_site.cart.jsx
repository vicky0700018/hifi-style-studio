import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/_site/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart | HIFI FASHIONS Pune" },
      { name: "description", content: "Review your HIFI FASHIONS bag before checkout." },
      { property: "og:title", content: "Shopping Cart | HIFI FASHIONS" },
      { property: "og:description", content: "Your selected women's fashion pieces." },
    ],
  }),
  component: CartPage,
});

export function useCartTotals(code) {
  const { cart, coupons } = useStore();
  const subtotal = cart.reduce((n, c) => n + c.price * c.qty, 0);
  const coupon = coupons.find(
    (c) => c.active && c.code.toLowerCase() === (code || "").trim().toLowerCase() && subtotal >= c.minOrder,
  );
  const discount = coupon ? Math.round((subtotal * coupon.discount) / 100) : 0;
  const shipping = subtotal === 0 || subtotal - discount >= 1999 ? 0 : 99;
  return { subtotal, discount, shipping, coupon, total: subtotal - discount + shipping };
}

function CartPage() {
  const { cart, updateQty, removeFromCart, products, toggleWishlist } = useStore();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");
  const { subtotal, discount, shipping, total } = useCartTotals(applied);

  if (cart.length === 0)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="mt-3 text-muted-foreground">
          Add a few favourites from our latest collections.
        </p>
        <Link to="/shop" className="btn-primary mt-8">
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-4xl">Shopping Bag</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          {cart.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return (
              <div key={item.key} className="card-surface flex gap-4 p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-32 w-24 shrink-0 rounded-lg object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h2 className="font-display text-lg">{item.name}</h2>
                    <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                    <p className="mt-1 text-primary">{inr(item.price)}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        className="px-3 py-1.5"
                        aria-label="Decrease quantity"
                        onClick={() => updateQty(item.key, item.qty - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-sm">{item.qty}</span>
                      <button
                        className="px-3 py-1.5"
                        aria-label="Increase quantity"
                        onClick={() => updateQty(item.key, item.qty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    {product && (
                      <button
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary"
                        onClick={() => toggleWishlist(product)}
                      >
                        <Heart className="h-3.5 w-3.5" /> Wishlist
                      </button>
                    )}
                    <button
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.key)}
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
                <p className="hidden font-medium sm:block">{inr(item.price * item.qty)}</p>
              </div>
            );
          })}
        </div>

        <aside className="card-surface h-fit p-6">
          <h2 className="font-display text-2xl">Order Summary</h2>

          <div className="mt-5 flex gap-2">
            <input
              className="field"
              placeholder="Coupon code (try HIFI10)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              aria-label="Coupon code"
            />
            <button className="btn-outline !px-4" onClick={() => setApplied(code)}>
              Apply
            </button>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <Row label="Subtotal" value={inr(subtotal)} />
            <Row label="Discount" value={`- ${inr(discount)}`} />
            <Row label="Shipping" value={shipping ? inr(shipping) : "Free"} />
            <div className="border-t border-border pt-3">
              <Row label="Total" value={inr(total)} bold />
            </div>
          </dl>

          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </Link>
          <Link to="/shop" className="btn-outline mt-3 w-full">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-medium text-primary" : ""}`}>
      <dt className={bold ? "" : "text-muted-foreground"}>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
