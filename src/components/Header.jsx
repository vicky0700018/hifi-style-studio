import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useStore, inr } from "@/lib/store";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Sarees", to: "/sarees" },
  { label: "Ethnic Wear", to: "/ethnic-wear" },
  { label: "Western Wear", to: "/western-wear" },
  { label: "Bridal", to: "/bridal" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Sale", to: "/sale" },
];

export default function Header() {
  const { cart, wishlist, products } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const boxRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const cartCount = cart.reduce((n, c) => n + c.qty, 0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.status === "active" &&
          (p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.occasion.toLowerCase().includes(q) ||
            p.tags.join(" ").toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query, products]);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary px-4 py-2 text-center text-[0.7rem] tracking-[0.22em] text-primary-foreground uppercase">
        New Season Styles • Trendy Fashion • Wedding &amp; Festive Collection
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-4">
          <button
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="shrink-0 leading-none">
            <span className="font-display text-2xl font-semibold tracking-[0.16em] text-primary">
              HIFI
            </span>
            <span className="ml-1 font-display text-2xl tracking-[0.16em] text-foreground">
              FASHIONS
            </span>
            <span className="hidden text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase sm:block">
              Chandan Nagar, Pune
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-[0.78rem] tracking-[0.14em] text-foreground/80 uppercase transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
              <Search className="h-5 w-5 transition-colors hover:text-primary" />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative">
              <Heart className="h-5 w-5 transition-colors hover:text-primary" />
              {wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
            </Link>
            <Link to="/account" aria-label="Account" className="hidden sm:block">
              <User className="h-5 w-5 transition-colors hover:text-primary" />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5 transition-colors hover:text-primary" />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-card" ref={boxRef}>
            <div className="mx-auto max-w-3xl px-4 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({ to: "/shop", search: { q: query } });
                  setSearchOpen(false);
                }}
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sarees, dresses, jeans, bridal…"
                  className="field"
                  aria-label="Search products"
                />
              </form>
              {results.length > 0 && (
                <ul className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/product/$id"
                        params={{ id: p.id }}
                        className="flex items-center gap-3 bg-card p-3 transition-colors hover:bg-muted"
                        onClick={() => setSearchOpen(false)}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          loading="lazy"
                          className="h-14 w-12 rounded-md object-cover"
                        />
                        <span className="flex-1">
                          <span className="block text-sm">{p.name}</span>
                          <span className="block text-xs text-muted-foreground">{p.category}</span>
                        </span>
                        <span className="text-sm text-primary">{inr(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {query && results.length === 0 && (
                <p className="mt-3 text-sm text-muted-foreground">No products matched “{query}”.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-foreground/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-[80%] max-w-xs bg-card p-6 shadow-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl tracking-[0.14em] text-primary">HIFI FASHIONS</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-8 flex flex-col gap-1">
            {navLinks.concat([
              { label: "Dresses", to: "/dresses" },
              { label: "Tops", to: "/tops" },
              { label: "Jeans", to: "/jeans" },
              { label: "Festive", to: "/festive" },
              { label: "Wishlist", to: "/wishlist" },
              { label: "Cart", to: "/cart" },
              { label: "About", to: "/about" },
              { label: "Contact", to: "/contact" },
            ]).map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-lg px-3 py-2.5 text-sm tracking-[0.1em] uppercase transition-colors hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </header>
  );
}

function Badge({ children }) {
  return (
    <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[0.6rem] font-semibold text-secondary-foreground">
      {children}
    </span>
  );
}
