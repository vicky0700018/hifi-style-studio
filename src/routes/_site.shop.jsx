import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/shop")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    category: typeof search.category === "string" ? search.category : "",
  }),
  head: () => ({
    meta: [
      { title: "Shop All Women's Fashion | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Browse the full HIFI FASHIONS catalogue — sarees, salwar suits, shararas, dresses, tops, jeans and bridal wear in Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Shop All Women's Fashion | HIFI FASHIONS" },
      {
        property: "og:description",
        content: "Filter by category, price, size, colour and occasion at HIFI FASHIONS Pune.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q, category } = Route.useSearch();
  return (
    <Catalog
      eyebrow="All Collections"
      title="Shop Everything"
      description="Every style in the HIFI FASHIONS boutique, from festive ethnic wear to everyday denim."
      query={q}
      initialCategory={category}
    />
  );
}
