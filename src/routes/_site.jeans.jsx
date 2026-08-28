import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/jeans")({
  head: () => ({
    meta: [
      { title: "Women's Jeans & Denim | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "High rise, straight, skinny and wide leg jeans for women at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Women's Jeans & Denim | HIFI FASHIONS" },
      { property: "og:description", content: "Denim fits from skinny to wide leg." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Denim Bar"
      title="Jeans"
      description="High rise, straight, skinny and wide leg denim in sizes 26 to 34."
      filter={(p) => p.category === "Jeans"}
    />
  ),
});
