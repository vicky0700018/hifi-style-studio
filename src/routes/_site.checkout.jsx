import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore, inr } from "@/lib/store";
import { useCartTotals } from "./_site.cart";

export const Route = createFileRoute("/_site/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | HIFI FASHIONS Pune" },
      { name: "description", content: "Demo checkout for the HIFI FASHIONS boutique store." },
      { property: "og:title", content: "Checkout | HIFI FASHIONS" },
      { property: "og:description", content: "Place a demo order with HIFI FASHIONS Pune." },
    ],
  }),
  component: Checkout,
});

const payments = ["Cash on Delivery", "UPI", "Card / Online Payment"];

function Checkout() {
  const { cart, placeOrder, toast } = useStore();
  const { subtotal, discount, shipping, total } = useCartTotals("");
  const navigate = useNavigate();
  const [payment, setPayment] = useState("Cash on Delivery");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pin: "",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (cart.length === 0)
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl">Nothing to checkout</h1>
        <Link to="/shop" className="btn-primary mt-8">
          Start Shopping
        </Link>
      </div>
    );

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.pin) {
      toast("Please complete the required fields");
      return;
    }
    const order = {
      id: `HF-${Math.floor(10000 + Math.random() * 89999)}`,
      customer: form.name,
      phone: form.phone,
      email: form.email,
      address: `${form.address}, ${form.city}, ${form.state} ${form.pin}`,
      date: new Date().toISOString().slice(0, 10),
      items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price, size: c.size })),
      amount: total,
      payment,
      status: "Pending",
    };
    try {
      localStorage.setItem("hifi_last_order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    placeOrder(order);
    navigate({ to: "/order-success" });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <h1 className="font-display text-4xl">Checkout</h1>

      <form onSubmit={submit} className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <section className="card-surface p-6">
            <h2 className="font-display text-2xl">Customer Information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full Name *" value={form.name} onChange={set("name")} />
              <Field label="Mobile Number *" value={form.phone} onChange={set("phone")} />
              <Field label="Email" type="email" value={form.email} onChange={set("email")} />
              <Field label="PIN Code *" value={form.pin} onChange={set("pin")} />
              <div className="sm:col-span-2">
                <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                  Address *
                </label>
                <textarea
                  className="field mt-2 min-h-24"
                  value={form.address}
                  onChange={set("address")}
                />
              </div>
              <Field label="City" value={form.city} onChange={set("city")} />
              <Field label="State" value={form.state} onChange={set("state")} />
            </div>
          </section>

          <section className="card-surface p-6">
            <h2 className="font-display text-2xl">Payment Method</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {payments.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPayment(p)}
                  className={`rounded-xl border p-4 text-left text-sm transition-colors ${
                    payment === p ? "border-primary bg-[var(--color-cream)]" : "border-border hover:border-primary"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              This is a frontend demo — no real payment is processed.
            </p>
          </section>
        </div>

        <aside className="card-surface h-fit p-6">
          <h2 className="font-display text-2xl">Order Summary</h2>
          <ul className="mt-5 space-y-3">
            {cart.map((c) => (
              <li key={c.key} className="flex gap-3">
                <img src={c.image} alt={c.name} loading="lazy" className="h-16 w-12 rounded object-cover" />
                <div className="flex-1 text-sm">
                  <p>{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.size} · Qty {c.qty}
                  </p>
                </div>
                <span className="text-sm">{inr(c.price * c.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{inr(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Discount</dt>
              <dd>- {inr(discount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping ? inr(shipping) : "Free"}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base text-primary">
              <dt>Total</dt>
              <dd>{inr(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn-primary mt-6 w-full">
            Place Demo Order
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{label}</label>
      <input className="field mt-2" type={type} value={value} onChange={onChange} />
    </div>
  );
}
