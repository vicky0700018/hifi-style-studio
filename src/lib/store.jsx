import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products as seedProducts } from "@/data/products";
import { categories as seedCategories } from "@/data/categories";
import { banners as seedBanners } from "@/data/banners";
import { orders as seedOrders } from "@/data/orders";
import { customers as seedCustomers } from "@/data/customers";
import { reviews as seedReviews } from "@/data/reviews";
import { coupons as seedCoupons, defaultSettings } from "@/data/coupons";

const KEY = "hifi_store_v1";

const StoreContext = createContext(null);

const initialState = {
  products: seedProducts,
  categories: seedCategories,
  banners: seedBanners,
  orders: seedOrders,
  customers: seedCustomers,
  reviews: seedReviews,
  coupons: seedCoupons,
  settings: defaultSettings,
  cart: [],
  wishlist: [],
  admin: false,
};

export function StoreProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const toast = useCallback((message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const update = useCallback((patch) => setState((s) => ({ ...s, ...patch })), []);

  const api = useMemo(() => {
    const setList = (key, fn) => setState((s) => ({ ...s, [key]: fn(s[key]) }));

    return {
      ...state,
      hydrated,
      toasts,
      toast,
      resetDemo: () => {
        setState(initialState);
        toast("Demo data reset");
      },

      /* cart */
      addToCart: (product, size, qty = 1) => {
        setList("cart", (cart) => {
          const key = `${product.id}-${size || "NA"}`;
          const found = cart.find((c) => c.key === key);
          if (found)
            return cart.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c));
          return [
            ...cart,
            {
              key,
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0],
              size: size || (product.sizes ? product.sizes[0] : "Free Size"),
              qty,
            },
          ];
        });
        toast(`${product.name} added to cart`);
      },
      updateQty: (key, qty) =>
        setList("cart", (cart) =>
          cart.map((c) => (c.key === key ? { ...c, qty: Math.max(1, qty) } : c)),
        ),
      removeFromCart: (key) => {
        setList("cart", (cart) => cart.filter((c) => c.key !== key));
        toast("Removed from cart");
      },
      clearCart: () => setList("cart", () => []),

      /* wishlist */
      toggleWishlist: (product) => {
        let added = false;
        setList("wishlist", (w) => {
          if (w.includes(product.id)) return w.filter((x) => x !== product.id);
          added = true;
          return [...w, product.id];
        });
        setTimeout(() => toast(added ? "Added to wishlist" : "Removed from wishlist"), 0);
      },
      inWishlist: (id) => state.wishlist.includes(id),

      /* orders */
      placeOrder: (order) => {
        setList("orders", (o) => [order, ...o]);
        setList("cart", () => []);
      },
      updateOrderStatus: (id, status) => {
        setList("orders", (o) => o.map((x) => (x.id === id ? { ...x, status } : x)));
        toast(`Order ${id} marked ${status}`);
      },

      /* admin CRUD */
      saveProduct: (product) => {
        setList("products", (list) =>
          list.some((p) => p.id === product.id)
            ? list.map((p) => (p.id === product.id ? product : p))
            : [product, ...list],
        );
        toast("Product saved successfully");
      },
      deleteProduct: (id) => {
        setList("products", (l) => l.filter((p) => p.id !== id));
        toast("Product deleted");
      },
      toggleProductField: (id, field) => {
        setList("products", (l) =>
          l.map((p) =>
            p.id === id
              ? {
                  ...p,
                  [field]:
                    field === "status"
                      ? p.status === "active"
                        ? "inactive"
                        : "active"
                      : !p[field],
                }
              : p,
          ),
        );
      },
      saveCategory: (cat) => {
        setList("categories", (l) =>
          l.some((c) => c.id === cat.id) ? l.map((c) => (c.id === cat.id ? cat : c)) : [...l, cat],
        );
        toast("Category saved");
      },
      deleteCategory: (id) => {
        setList("categories", (l) => l.filter((c) => c.id !== id));
        toast("Category deleted");
      },
      saveBanner: (b) => {
        setList("banners", (l) =>
          l.some((x) => x.id === b.id) ? l.map((x) => (x.id === b.id ? b : x)) : [...l, b],
        );
        toast("Banner saved");
      },
      deleteBanner: (id) => {
        setList("banners", (l) => l.filter((b) => b.id !== id));
        toast("Banner deleted");
      },
      saveCoupon: (c) => {
        setList("coupons", (l) =>
          l.some((x) => x.id === c.id) ? l.map((x) => (x.id === c.id ? c : x)) : [...l, c],
        );
        toast("Coupon saved");
      },
      deleteCoupon: (id) => {
        setList("coupons", (l) => l.filter((c) => c.id !== id));
        toast("Coupon deleted");
      },
      setReviewStatus: (id, status) => {
        setList("reviews", (l) => l.map((r) => (r.id === id ? { ...r, status } : r)));
        toast(`Review ${status}`);
      },
      deleteReview: (id) => {
        setList("reviews", (l) => l.filter((r) => r.id !== id));
        toast("Review deleted");
      },
      saveSettings: (s) => {
        update({ settings: s });
        toast("Settings updated successfully");
      },

      /* admin auth */
      login: (email, password) => {
        if (email.trim().toLowerCase() === "admin@hififashions.com" && password === "admin123") {
          update({ admin: true });
          return true;
        }
        return false;
      },
      logout: () => update({ admin: false }),
    };
  }, [state, hydrated, toasts, toast, update]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
