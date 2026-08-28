import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Login | HIFI FASHIONS" },
      {
        name: "description",
        content: "Secure demo admin portal login for the HIFI FASHIONS store dashboard.",
      },
      { property: "og:title", content: "Admin Portal Login | HIFI FASHIONS" },
      {
        property: "og:description",
        content: "Demo admin login for managing the HIFI FASHIONS storefront.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { login, toast } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      toast("Welcome back, admin");
      navigate({ to: "/admin" });
    } else {
      setError("Invalid email or password. Use the demo credentials below.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl tracking-tight text-primary-foreground">
            HIFI FASHIONS
          </span>
          <p className="eyebrow mt-2 text-accent">Admin Portal</p>
        </div>

        <form onSubmit={submit} className="card-surface space-y-4 p-6 sm:p-8">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hififashions.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-foreground">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Demo credentials — admin@hififashions.com / admin123
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-primary-foreground/80 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
          >
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
