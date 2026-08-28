import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/sale")({
  head: () => ({
    meta: [
      { title: "Sale — Up To 35% Off | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Season sale on sarees, suits, dresses, tops and jeans at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Sale | HIFI FASHIONS" },
      { property: "og:description", content: "Discounted women's fashion at our Pune boutique." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Limited time"
      title="Sale"
      description="Everything currently marked down at HIFI FASHIONS."
      filter={(p) => p.discount >= 30}
    />
  ),
});
