import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

const WESTERN = ["Dresses", "Tops", "Jeans"];

export const Route = createFileRoute("/_site/western-wear")({
  head: () => ({
    meta: [
      { title: "Western Wear for Women | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Dresses, tops, jeans and casual wear for women — contemporary western fashion at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Western Wear for Women | HIFI FASHIONS" },
      { property: "og:description", content: "Contemporary dresses, tops and denim." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Contemporary Looks"
      title="Western Wear"
      description="Dresses, tops, jeans, one-pieces and easy casual wear."
      filter={(p) => WESTERN.includes(p.category)}
    />
  ),
});
