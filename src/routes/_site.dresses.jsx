import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/dresses")({
  head: () => ({
    meta: [
      { title: "One-Piece Dresses for Women | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Midi dresses, slip dresses and party one-pieces for women at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "One-Piece Dresses | HIFI FASHIONS" },
      { property: "og:description", content: "Midi, slip and party dresses curated in Pune." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="One-Piece Edit"
      title="Dresses"
      description="Midis, slips and party one-pieces made for easy dressing."
      filter={(p) => p.category === "Dresses"}
    />
  ),
});
