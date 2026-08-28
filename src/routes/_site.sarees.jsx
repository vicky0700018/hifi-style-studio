import { createFileRoute } from "@tanstack/react-router";
import Catalog from "@/components/Catalog";

export const Route = createFileRoute("/_site/sarees")({
  head: () => ({
    meta: [
      { title: "Designer Sarees | HIFI FASHIONS Pune" },
      {
        name: "description",
        content:
          "Silk, georgette and Banarasi designer sarees for weddings, festivals and parties at HIFI FASHIONS, Chandan Nagar, Pune.",
      },
      { property: "og:title", content: "Designer Sarees | HIFI FASHIONS" },
      { property: "og:description", content: "Elegant designer sarees curated in Pune." },
    ],
  }),
  component: () => (
    <Catalog
      eyebrow="Drapes & Weaves"
      title="Designer Sarees"
      description="Silk, georgette and Banarasi sarees with hand-finished borders."
      filter={(p) => p.category === "Sarees"}
    />
  ),
});
