import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import { useStore, inr } from "@/lib/store";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Product Management | HIFI FASHIONS Admin" },
      {
        name: "description",
        content: "Add, edit and manage the HIFI FASHIONS product catalogue in the demo admin panel.",
      },
      { property: "og:title", content: "Product Management | HIFI FASHIONS Admin" },
      { property: "og:description", content: "Demo catalogue management for HIFI FASHIONS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminProducts,
});

function AdminProducts() {
  const { products, categories, deleteProduct, toggleProductField } = useStore();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const rows = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (p.name.toLowerCase().includes(q.toLowerCase()) ||
            p.sku.toLowerCase().includes(q.toLowerCase())),
      ),
    [products, q, cat],
  );

  return (
    <AdminShell
      title="Products"
      subtitle={`${rows.length} of ${products.length} products`}
      actions={
        <Link to="/admin/products/$id" params={{ id: "new" }} className="btn-primary">
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      }
    >
      <div className="card-surface mb-4 flex flex-col gap-3 p-4 sm:flex-row">
        <input
          className="field sm:max-w-xs"
          placeholder="Search by name or SKU"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="field sm:max-w-56" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card-surface overflow-x-auto">
        <table className="hidden w-full min-w-[900px] text-left text-sm md:table">
          <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Featured</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((p) => (
              <tr key={p.id}>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="h-12 w-10 rounded object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3 text-foreground">{inr(p.price)}</td>
                <td className="p-3">
                  <span
                    className={p.stock <= 5 ? "text-destructive" : "text-muted-foreground"}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleProductField(p.id, "featured")}
                    aria-label="Toggle featured"
                    className={`rounded-full p-1.5 transition-colors ${
                      p.featured ? "bg-accent/50 text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <Star className={`h-4 w-4 ${p.featured ? "fill-current" : ""}`} />
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleProductField(p.id, "status")}
                    className={`rounded-full px-3 py-1 text-xs ${
                      p.status === "active"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.status === "active" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to="/admin/products/$id"
                      params={{ id: p.id }}
                      aria-label={`Edit ${p.name}`}
                      className="rounded-lg border border-border p-2 hover:bg-muted"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      aria-label={`Delete ${p.name}`}
                      className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="divide-y divide-border md:hidden">
          {rows.map((p) => (
            <li key={p.id} className="flex gap-3 p-4">
              <img src={p.images[0]} alt={p.name} className="h-20 w-16 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.category} • {p.sku}
                </p>
                <p className="mt-1 text-sm text-foreground">
                  {inr(p.price)} • Stock {p.stock}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleProductField(p.id, "status")}
                    className="rounded-full border border-border px-3 py-1 text-xs"
                  >
                    {p.status === "active" ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => toggleProductField(p.id, "featured")}
                    className="rounded-full border border-border px-3 py-1 text-xs"
                  >
                    {p.featured ? "Featured" : "Not featured"}
                  </button>
                  <Link
                    to="/admin/products/$id"
                    params={{ id: p.id }}
                    className="rounded-full border border-border px-3 py-1 text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-destructive"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {rows.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">No products match your filters.</p>
        )}
      </div>
    </AdminShell>
  );
}
