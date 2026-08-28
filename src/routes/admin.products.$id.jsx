import { useState } from "react";
import { createFileRoute, useNavigate, useParams, Link } from "@tanstack/react-router";
import AdminShell from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { categoryImages } from "@/data/categories";

export const Route = createFileRoute("/admin/products/$id")({
  head: () => ({
    meta: [
      { title: "Add or Edit Product | HIFI FASHIONS Admin" },
      {
        name: "description",
        content: "Create or update a HIFI FASHIONS product with pricing, sizes, colours and images.",
      },
      { property: "og:title", content: "Add or Edit Product | HIFI FASHIONS Admin" },
      { property: "og:description", content: "Demo product editor for HIFI FASHIONS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProductForm,
});

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function ProductForm() {
  const { id } = useParams({ from: "/admin/products/$id" });
  const { products, categories, saveProduct } = useStore();
  const navigate = useNavigate();
  const existing = products.find((p) => p.id === id);

  const [form, setForm] = useState(
    existing || {
      id: `p${Date.now()}`,
      sku: `HIFI-${Math.floor(Math.random() * 900 + 100)}`,
      name: "",
      category: categories[0]?.name || "Sarees",
      subcategory: "Festive Wear",
      price: 1990,
      originalPrice: 2990,
      rating: 4.5,
      reviewCount: 0,
      occasion: "Festive",
      colors: ["Rose"],
      sizes: ["S", "M", "L", "XL"],
      images: [categoryImages[categories[0]?.name] || categoryImages.Sarees],
      description: "",
      details: ["Premium quality fabric with soft hand-feel"],
      stock: 10,
      featured: false,
      newArrival: true,
      status: "active",
    },
  );

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice) || price;
    saveProduct({
      ...form,
      price,
      originalPrice,
      stock: Number(form.stock),
      discount: Math.max(0, Math.round(((originalPrice - price) / originalPrice) * 100)),
      slug: slugify(form.name || "product"),
      description:
        form.description ||
        `${form.name} from the HIFI FASHIONS boutique in Chandan Nagar, Pune.`,
    });
    navigate({ to: "/admin/products" });
  };

  return (
    <AdminShell
      title={existing ? "Edit Product" : "Add Product"}
      subtitle={existing ? existing.sku : "Create a new catalogue item"}
      actions={
        <Link to="/admin/products" className="btn-outline">
          Back
        </Link>
      }
    >
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
        <div className="card-surface space-y-4 p-5 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Product Name">
              <input
                required
                className="field"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label="SKU">
              <input className="field" value={form.sku} onChange={(e) => set("sku", e.target.value)} />
            </Field>
            <Field label="Category">
              <select
                className="field"
                value={form.category}
                onChange={(e) => {
                  set("category", e.target.value);
                  if (categoryImages[e.target.value]) set("images", [categoryImages[e.target.value]]);
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Subcategory / Tag">
              <input
                className="field"
                value={form.subcategory}
                onChange={(e) => set("subcategory", e.target.value)}
              />
            </Field>
            <Field label="Price (₹)">
              <input
                type="number"
                className="field"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </Field>
            <Field label="Original Price (₹)">
              <input
                type="number"
                className="field"
                value={form.originalPrice}
                onChange={(e) => set("originalPrice", e.target.value)}
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                className="field"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
              />
            </Field>
            <Field label="Occasion">
              <input
                className="field"
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              />
            </Field>
            <Field label="Sizes (comma separated)">
              <input
                className="field"
                value={form.sizes.join(", ")}
                onChange={(e) => set("sizes", e.target.value.split(",").map((s) => s.trim()))}
              />
            </Field>
            <Field label="Colors (comma separated)">
              <input
                className="field"
                value={form.colors.join(", ")}
                onChange={(e) => set("colors", e.target.value.split(",").map((s) => s.trim()))}
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              rows={4}
              className="field"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>

          <Field label="Image URLs (comma separated)">
            <input
              className="field"
              value={form.images.join(", ")}
              onChange={(e) => set("images", e.target.value.split(",").map((s) => s.trim()))}
            />
          </Field>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-5">
            <p className="mb-3 text-sm font-medium text-foreground">Image Preview</p>
            <div className="grid grid-cols-2 gap-3">
              {form.images.filter(Boolean).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${form.name || "Product"} preview ${i + 1}`}
                  className="aspect-3/4 w-full rounded-lg object-cover"
                />
              ))}
            </div>
          </div>

          <div className="card-surface space-y-3 p-5">
            <Toggle
              label="Featured product"
              checked={form.featured}
              onChange={(v) => set("featured", v)}
            />
            <Toggle
              label="New arrival"
              checked={form.newArrival}
              onChange={(v) => set("newArrival", v)}
            />
            <Toggle
              label="Active on storefront"
              checked={form.status === "active"}
              onChange={(v) => set("status", v ? "active" : "inactive")}
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Save Product
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm text-foreground">
      {label}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        className={`h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-card shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}
