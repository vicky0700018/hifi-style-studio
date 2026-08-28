import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/festive")({
  head: () => ({
    meta: [
      { title: "Festive Collection | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Anarkalis, gowns, shararas and festive sarees for Diwali, Navratri and family functions at HIFI FASHIONS, Pune.",
      },
      { property: "og:title", content: "Festive Collection | HIFI FASHIONS" },
      { property: "og:description", content: "Festive styles for every celebration in Pune." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Season of Celebration"
      title="Festive Collection"
      description="Anarkalis, gowns and festive sets for Diwali, Navratri and family functions."
      filter={(p) => p.category === "Festive Wear" || p.occasion === "Festive"}
    />
  ),
});
