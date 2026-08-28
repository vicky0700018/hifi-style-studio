import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/bridal")({
  head: () => ({
    meta: [
      { title: "Bridal Collection | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Bridal salwar kameez, lehengas, shararas and wedding sarees at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Bridal Collection | HIFI FASHIONS" },
      { property: "og:description", content: "Wedding-ready bridal wear curated in Pune." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="The Bridal Edit"
      title="Bridal Collection"
      description="Make every celebration unforgettable with elegant bridal and occasion wear."
      filter={(p) => p.category === "Bridal Wear" || p.occasion === "Wedding"}
    />
  ),
});
