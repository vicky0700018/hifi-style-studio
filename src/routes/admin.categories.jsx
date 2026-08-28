import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Pencil } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import { useStore } from "@/lib/store";
import { categoryImages } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Category Management | HIFI FASHIONS Admin" },
      {
        name: "description",
        content: "Create, edit and toggle HIFI FASHIONS shopping categories in the demo admin panel.",
      },
      { property: "og:title", content: "Category Management | HIFI FASHIONS Admin" },
      { property: "og:description", content: "Demo category management for HIFI FASHIONS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminCategories,
});

const blank = () => ({
  id: `c${Date.now()}`,
  name: "",
  slug: "",
  description: "",
  image: categoryImages.Sarees,
  active: true,
});

function AdminCategories() {
  const { categories, saveCategory, deleteCategory } = useStore();
  const [form, setForm] = useState(blank());

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    saveCategory({
      ...form,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    });
    setForm(blank());
  };

  return (
    <AdminShell title="Categories" subtitle={`${categories.length} categories`}>
      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={submit} className="card-surface space-y-4 p-5">
          <h2 className="text-lg font-semibold text-foreground">
            {categories.some((c) => c.id === form.id) ? "Edit Category" : "Add Category"}
          </h2>
          <label className="block text-sm text-foreground">
            Name
            <input
              required
              className="field mt-1.5"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </label>
          <label className="block text-sm text-foreground">
            Description
            <textarea
              rows={3}
              className="field mt-1.5"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </label>
          <label className="block text-sm text-foreground">
            Image URL
            <input
              className="field mt-1.5"
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
            />
          </label>
          {form.image && (
            <img
              src={form.image}
              alt={form.name || "Category preview"}
              className="aspect-3/4 w-full rounded-lg object-cover"
            />
          )}
          <div className="flex gap-2">
            <button type="submit" className="btn-primary flex-1">
              <Plus className="h-4 w-4" /> Save
            </button>
            <button type="button" className="btn-outline" onClick={() => setForm(blank())}>
              Reset
            </button>
          </div>
        </form>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {categories.map((c) => (
            <article key={c.id} className="card-surface overflow-hidden">
              <img
                src={c.image}
                alt={c.name}
                className="aspect-4/3 w-full object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                  <button
                    onClick={() => saveCategory({ ...c, active: !c.active })}
                    className={`rounded-full px-3 py-1 text-xs ${
                      c.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {c.active ? "Active" : "Inactive"}
                  </button>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setForm(c)}
                    className="rounded-lg border border-border p-2 hover:bg-muted"
                    aria-label={`Edit ${c.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteCategory(c.id)}
                    className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10"
                    aria-label={`Delete ${c.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
