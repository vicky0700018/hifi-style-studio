import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

const ETHNIC = ["Sarees", "Salwar Suits", "Sharara Sets", "Kurtis", "Festive Wear", "Bridal Wear"];

export const Route = createFileRoute("/_site/ethnic-wear")({
  head: () => ({
    meta: [
      { title: "Ethnic Wear for Women | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Salwar kameez, shararas, kurtis and sarees — traditional ethnic wear for women at HIFI FASHIONS, Wadgaon Sheri, Pune.",
      },
      { property: "og:title", content: "Ethnic Wear for Women | HIFI FASHIONS" },
      { property: "og:description", content: "Traditional ethnic styles for every celebration." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Traditional Edit"
      title="Ethnic Wear"
      description="Salwar suits, shararas, kurtis, sarees and festive pieces for every celebration."
      filter={(p) => ETHNIC.includes(p.category)}
    />
  ),
});
