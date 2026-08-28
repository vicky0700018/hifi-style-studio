import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/_site/account")({
  head: () => ({
    meta: [
      { title: "My Account | HIFI FASHIONS Pune" },
      {
        name: "description",
        content: "Demo account area showing your HIFI FASHIONS orders, wishlist and cart summary.",
      },
      { property: "og:title", content: "My Account | HIFI FASHIONS" },
      { property: "og:description", content: "Your demo shopping activity at HIFI FASHIONS." },
    ],
  }),
  component: Account,
});

function Account() {
  const { orders, wishlist, cart } = useStore();
  const recent = orders.slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="eyebrow">Demo Account</p>
      <h1 className="mt-2 font-display text-4xl">Welcome back</h1>
      <p className="mt-3 text-muted-foreground">
        This demo store keeps your activity in the browser — no sign-up required.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          ["Items in cart", cart.reduce((n, c) => n + c.qty, 0)],
          ["Wishlist saves", wishlist.length],
          ["Orders in store", orders.length],
        ].map(([label, value]) => (
          <div key={label} className="card-surface p-6">
            <p className="font-display text-3xl text-primary">{value}</p>
            <p className="mt-1 text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl">Recent store orders</h2>
      <div className="mt-4 space-y-3">
        {recent.map((o) => (
          <div key={o.id} className="card-surface flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium">{o.id}</p>
              <p className="text-xs text-muted-foreground">
                {o.date} · {o.customer}
              </p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs">{o.status}</span>
            <span className="text-primary">{inr(o.amount)}</span>
          </div>
        ))}
      </div>

      <Link to="/shop" className="btn-primary mt-10">
        Continue Shopping
      </Link>
    </div>
  );
}
