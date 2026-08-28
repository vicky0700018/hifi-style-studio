import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/admin/customers")({
  head: () => ({
    meta: [
      { title: "Customer Directory | HIFI FASHIONS Admin" },
      {
        name: "description",
        content: "Browse demo HIFI FASHIONS customers with order counts and lifetime spend.",
      },
      { property: "og:title", content: "Customer Directory | HIFI FASHIONS Admin" },
      { property: "og:description", content: "Demo customer directory for HIFI FASHIONS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCustomers,
});

function AdminCustomers() {
  const { customers } = useStore();
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      customers.filter((c) =>
        [c.name, c.email, c.phone].join(" ").toLowerCase().includes(q.toLowerCase()),
      ),
    [customers, q],
  );

  return (
    <AdminShell title="Customers" subtitle={`${rows.length} of ${customers.length} customers`}>
      <div className="card-surface mb-4 p-4">
        <input
          className="field sm:max-w-sm"
          placeholder="Search name, email or phone"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="hidden w-full min-w-[800px] text-left text-sm md:table">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Total Spent</th>
              <th className="p-3">Last Order</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((c) => (
              <tr key={c.id}>
                <td className="p-3 font-medium text-foreground">{c.name}</td>
                <td className="p-3 text-muted-foreground">
                  <p>{c.email}</p>
                  <p className="text-xs">{c.phone}</p>
                </td>
                <td className="p-3 text-foreground">{c.orders}</td>
                <td className="p-3 text-foreground">{inr(c.spent)}</td>
                <td className="p-3 text-muted-foreground">{c.lastOrder}</td>
                <td className="p-3">
                  <span className="rounded-full bg-accent/40 px-3 py-1 text-xs capitalize text-accent-foreground">
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-border md:hidden">
          {rows.map((c) => (
            <li key={c.id} className="space-y-1 p-4 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium text-foreground">{c.name}</p>
                <span className="rounded-full bg-accent/40 px-2.5 py-0.5 text-xs capitalize text-accent-foreground">
                  {c.status}
                </span>
              </div>
              <p className="text-muted-foreground">{c.email}</p>
              <p className="text-muted-foreground">{c.phone}</p>
              <p className="text-foreground">
                {c.orders} orders • {inr(c.spent)} • last {c.lastOrder}
              </p>
            </li>
          ))}
        </ul>
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No customers found.</p>
        )}
      </div>
    </AdminShell>
  );
}
