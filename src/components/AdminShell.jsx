import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  ShoppingBag,
  Users,
  Star,
  Ticket,
  Images,
  Settings,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Grid3X3 },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/reviews", label: "Reviews", icon: Star },
  { to: "/admin/coupons", label: "Coupons", icon: Ticket },
  { to: "/admin/banners", label: "Banners", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ title, subtitle, actions, children }) {
  const { admin, hydrated, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (hydrated && !admin) navigate({ to: "/admin/login" });
  }, [hydrated, admin, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!hydrated || !admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <p className="text-sm text-muted-foreground">Checking admin session…</p>
      </div>
    );
  }

  const SideNav = () => (
    <nav className="flex h-full flex-col gap-1 p-4">
      <Link to="/admin" className="mb-6 block px-2">
        <span className="font-display text-xl tracking-tight text-primary-foreground">
          HIFI FASHIONS
        </span>
        <span className="eyebrow mt-1 block text-accent">Admin Portal</span>
      </Link>
      {nav.map(({ to, label, icon: Icon }) => {
        const active = to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-primary-foreground/15 text-primary-foreground"
                : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
      <div className="mt-auto space-y-1 border-t border-primary-foreground/15 pt-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <Globe className="h-4 w-4" /> View Website
        </Link>
        <button
          onClick={() => {
            logout();
            navigate({ to: "/admin/login" });
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-muted lg:flex">
      <aside className="hidden w-64 shrink-0 bg-primary lg:sticky lg:top-0 lg:block lg:h-screen">
        <SideNav />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 bg-primary">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-3 top-4 text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <SideNav />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex flex-wrap items-center gap-3 border-b border-border bg-card px-4 py-4 sm:px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
            {subtitle && (
              <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {actions}
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
