import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/tops")({
  head: () => ({
    meta: [
      { title: "Women's Tops | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Satin party tops, crepe blouses and everyday shirts for women at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Women's Tops | HIFI FASHIONS" },
      { property: "og:description", content: "Party and everyday tops for women in Pune." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Everyday & Evening"
      title="Tops"
      description="Satin, crepe and cotton tops that pair with denim or trousers."
      filter={(p) => p.category === "Tops"}
    />
  ),
});
