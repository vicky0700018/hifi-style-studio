import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { inr } from "@/lib/store";

export const Route = createFileRoute("/_site/order-success")({
  head: () => ({
    meta: [
      { title: "Order Confirmed | HIFI FASHIONS Pune" },
      { name: "description", content: "Your demo order with HIFI FASHIONS has been placed." },
      { property: "og:title", content: "Order Confirmed | HIFI FASHIONS" },
      { property: "og:description", content: "Thank you for shopping with HIFI FASHIONS Pune." },
    ],
  }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hifi_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const eta = new Date(Date.now() + 4 * 86400000).toDateString();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" />
      <h1 className="mt-6 font-display text-4xl">Thank You for Shopping with HIFI FASHIONS!</h1>
      <p className="mt-3 text-muted-foreground">
        Your demo order has been recorded. Our Chandan Nagar team would normally call you to confirm.
      </p>

      {order ? (
        <div className="card-surface mt-10 p-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Order ID</p>
              <p className="font-display text-2xl text-primary">{order.id}</p>
            </div>
            <span className="rounded-full bg-[var(--color-cream)] px-4 py-1.5 text-xs">
              {order.payment}
            </span>
          </div>

          <ul className="mt-6 divide-y divide-border">
            {order.items.map((i, idx) => (
              <li key={idx} className="flex justify-between py-3 text-sm">
                <span>
                  {i.name} {i.size ? `· ${i.size}` : ""} × {i.qty}
                </span>
                <span>{inr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between border-t border-border pt-4 text-lg text-primary">
            <span>Total paid</span>
            <span>{inr(order.amount)}</span>
          </div>

          <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Customer:</strong> {order.customer} · {order.phone}
            </p>
            {order.email && (
              <p>
                <strong className="text-foreground">Email:</strong> {order.email}
              </p>
            )}
            <p>
              <strong className="text-foreground">Delivery address:</strong> {order.address}
            </p>
            <p>
              <strong className="text-foreground">Estimated delivery:</strong> {eta}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">No recent demo order found.</p>
      )}

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
        <Link to="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
