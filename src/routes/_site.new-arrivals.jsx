import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "The newest ethnic and western styles just added at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "New Arrivals | HIFI FASHIONS" },
      { property: "og:description", content: "Fresh drops every fortnight at our Pune boutique." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Fresh off the rack"
      title="New Arrivals"
      description="The latest pieces to land at our Chandan Nagar boutique."
      filter={(p) => p.newArrival}
    />
  ),
});
