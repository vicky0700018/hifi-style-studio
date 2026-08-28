import heroEthnic from "@/assets/hero-ethnic.jpg";
import heroWestern from "@/assets/hero-western.jpg";
import heroBridal from "@/assets/hero-bridal.jpg";

export const banners = [
  {
    id: "b1",
    title: "Discover Your Signature Style",
    subtitle:
      "Contemporary fashion and timeless ethnic elegance, curated for every occasion.",
    eyebrow: "Festive & Ethnic Collection",
    image: heroEthnic,
    ctaText: "Shop Collection",
    ctaLink: "/shop",
    ctaSecondaryText: "Explore New Arrivals",
    ctaSecondaryLink: "/new-arrivals",
    active: true,
  },
  {
    id: "b2",
    title: "Everyday Ease, Elevated",
    subtitle:
      "Dresses, tops and denim designed for the way you live in Pune, all week long.",
    eyebrow: "New Western Collection",
    image: heroWestern,
    ctaText: "Shop Western Wear",
    ctaLink: "/western-wear",
    ctaSecondaryText: "View New Arrivals",
    ctaSecondaryLink: "/new-arrivals",
    active: true,
  },
  {
    id: "b3",
    title: "Made For The Big Day",
    subtitle:
      "Handpicked bridal suits, shararas and designer sarees for weddings and sangeet nights.",
    eyebrow: "Wedding & Bridal Collection",
    image: heroBridal,
    ctaText: "Explore Bridal",
    ctaLink: "/bridal",
    ctaSecondaryText: "Shop Festive",
    ctaSecondaryLink: "/festive",
    active: true,
  },
];
