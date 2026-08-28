import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, ShoppingBag, Users, IndianRupee, Clock, AlertTriangle } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | HIFI FASHIONS" },
      {
        name: "description",
        content: "Store overview with products, orders, customers and revenue for HIFI FASHIONS.",
      },
      { property: "og:title", content: "Admin Dashboard | HIFI FASHIONS" },
      { property: "og:description", content: "Demo store analytics for HIFI FASHIONS, Pune." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { products, orders, customers } = useStore();

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.amount, 0);
  const pending = orders.filter((o) => ["Pending", "Confirmed"].includes(o.status)).length;
  const lowStock = products.filter((p) => p.stock <= 5);

  const stats = [
    { label: "Total Products", value: products.length, icon: Package },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag },
    { label: "Total Customers", value: customers.length, icon: Users },
    { label: "Total Revenue", value: inr(revenue), icon: IndianRupee },
    { label: "Pending Orders", value: pending, icon: Clock },
    { label: "Low Stock Products", value: lowStock.length, icon: AlertTriangle },
  ];

  const byCategory = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.price * Math.max(1, 30 - p.stock);
    return acc;
  }, {});
  const maxCat = Math.max(...Object.values(byCategory));

  return (
    <AdminShell title="Dashboard" subtitle="Demo overview of the HIFI FASHIONS store">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <span className="rounded-full bg-accent/40 p-2 text-accent-foreground">
                <Icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">Sales Overview by Category</h2>
          <p className="mb-4 text-sm text-muted-foreground">Estimated demo sales value</p>
          <ul className="space-y-3">
            {Object.entries(byCategory).map(([cat, val]) => (
              <li key={cat}>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{cat}</span>
                  <span className="text-muted-foreground">{inr(val)}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${Math.round((val / maxCat) * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-rose hover:underline">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="truncate text-foreground">{o.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.id} • {o.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground">{inr(o.amount)}</p>
                    <p className="text-xs text-muted-foreground">{o.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Low Stock Alerts</h2>
              <Link to="/admin/products" className="text-sm text-rose hover:underline">
                Manage
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {lowStock.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="truncate text-foreground">{p.name}</span>
                  <span className="shrink-0 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs text-destructive">
                    {p.stock} left
                  </span>
                </li>
              ))}
              {lowStock.length === 0 && (
                <li className="py-2 text-sm text-muted-foreground">All products well stocked.</li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
