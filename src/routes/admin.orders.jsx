import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Order Management | HIFI FASHIONS Admin" },
      {
        name: "description",
        content: "Track and update demo order statuses for the HIFI FASHIONS boutique store.",
      },
      { property: "og:title", content: "Order Management | HIFI FASHIONS Admin" },
      { property: "og:description", content: "Demo order pipeline for HIFI FASHIONS, Pune." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      orders.filter(
        (o) =>
          (filter === "All" || o.status === filter) &&
          (o.id.toLowerCase().includes(q.toLowerCase()) ||
            o.customer.toLowerCase().includes(q.toLowerCase())),
      ),
    [orders, filter, q],
  );

  return (
    <AdminShell title="Orders" subtitle={`${rows.length} of ${orders.length} orders`}>
      <div className="card-surface mb-4 flex flex-col gap-3 p-4 sm:flex-row">
        <input
          className="field sm:max-w-xs"
          placeholder="Search order ID or customer"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="field sm:max-w-56"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All statuses</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="hidden w-full min-w-[900px] text-left text-sm md:table">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Products</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((o) => (
              <tr key={o.id}>
                <td className="p-3">
                  <p className="font-medium text-foreground">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </td>
                <td className="p-3">
                  <p className="text-foreground">{o.customer}</p>
                  <p className="text-xs text-muted-foreground">{o.phone}</p>
                </td>
                <td className="p-3 text-muted-foreground">
                  {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
                </td>
                <td className="p-3 text-foreground">{inr(o.amount)}</td>
                <td className="p-3 text-muted-foreground">{o.payment}</td>
                <td className="p-3">
                  <select
                    className="field"
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    aria-label={`Status for ${o.id}`}
                  >
                    {statuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-border md:hidden">
          {rows.map((o) => (
            <li key={o.id} className="space-y-2 p-4 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{o.id}</p>
                <p className="text-foreground">{inr(o.amount)}</p>
              </div>
              <p className="text-muted-foreground">
                {o.customer} • {o.date} • {o.payment}
              </p>
              <p className="text-xs text-muted-foreground">
                {o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}
              </p>
              <select
                className="field"
                value={o.status}
                onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                aria-label={`Status for ${o.id}`}
              >
                {statuses.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </li>
          ))}
        </ul>
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No orders match your filters.</p>
        )}
      </div>
    </AdminShell>
  );
}
