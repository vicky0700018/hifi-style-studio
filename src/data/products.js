import { categoryImages } from "./categories";

const img = (cat) => categoryImages[cat];

const gallery = (cat, extra = []) => [img(cat), ...extra.map(img)];

const base = [
  // Sarees
  ["Wine Embroidered Silk Saree", "Sarees", 4290, 6499, 4.8, 126, "Festive", ["Wine", "Maroon"], true, false],
  ["Midnight Zari Border Saree", "Sarees", 3890, 5599, 4.6, 84, "Party", ["Navy", "Gold"], true, false],
  ["Blush Georgette Party Saree", "Sarees", 2790, 3999, 4.4, 61, "Party", ["Blush", "Rose"], false, true],
  ["Ivory Banarasi Silk Saree", "Sarees", 6490, 8999, 4.9, 143, "Wedding", ["Ivory", "Gold"], true, false],
  ["Emerald Printed Daily Saree", "Sarees", 1490, 2199, 4.2, 38, "Casual", ["Green"], false, true],
  // Salwar Suits
  ["Ivory Embellished Salwar Suit", "Salwar Suits", 3490, 4999, 4.7, 98, "Festive", ["Ivory", "Beige"], true, false],
  ["Powder Blue Chikankari Suit", "Salwar Suits", 2890, 4199, 4.5, 72, "Casual", ["Blue"], false, true],
  ["Plum Embroidered Anarkali Suit", "Salwar Suits", 4190, 5899, 4.6, 66, "Festive", ["Plum"], true, false],
  ["Mint Cotton Straight Suit", "Salwar Suits", 1890, 2699, 4.1, 44, "Casual", ["Mint"], false, false],
  // Sharara
  ["Rose Pink Festive Sharara Set", "Sharara Sets", 4590, 6999, 4.8, 112, "Festive", ["Rose", "Pink"], true, true],
  ["Golden Beige Sequin Sharara", "Sharara Sets", 5290, 7499, 4.7, 57, "Wedding", ["Beige", "Gold"], false, true],
  ["Wine Velvet Gharara Set", "Sharara Sets", 5890, 8299, 4.6, 41, "Wedding", ["Wine"], false, false],
  // Dresses
  ["Floral Midi Dress", "Dresses", 1990, 2999, 4.5, 154, "Casual", ["Green", "Red"], true, false],
  ["Blush Satin Slip Dress", "Dresses", 2290, 3299, 4.4, 88, "Party", ["Blush"], false, true],
  ["Charcoal Wrap Office Dress", "Dresses", 2490, 3499, 4.3, 47, "Office", ["Charcoal"], false, false],
  ["Ditsy Print Summer Dress", "Dresses", 1590, 2399, 4.2, 63, "Casual", ["Yellow"], false, true],
  // Tops
  ["Satin Party Top", "Tops", 1190, 1799, 4.4, 76, "Party", ["Champagne"], true, false],
  ["Ruffle Sleeve Crepe Top", "Tops", 990, 1499, 4.1, 52, "Casual", ["White"], false, true],
  ["Corset Detail Evening Top", "Tops", 1490, 2199, 4.5, 39, "Party", ["Black"], false, false],
  ["Cotton Everyday Shirt Top", "Tops", 890, 1299, 4.0, 91, "Casual", ["Sky"], false, false],
  // Jeans
  ["High Rise Straight Jeans", "Jeans", 1690, 2499, 4.6, 187, "Casual", ["Light Blue"], true, false],
  ["Skinny Fit Dark Wash Jeans", "Jeans", 1590, 2299, 4.3, 121, "Casual", ["Indigo"], false, false],
  ["Wide Leg Denim Jeans", "Jeans", 1890, 2799, 4.4, 68, "Casual", ["Blue"], false, true],
  ["Distressed Mom Fit Jeans", "Jeans", 1790, 2599, 4.2, 55, "Casual", ["Blue"], false, true],
  // Bridal
  ["Bridal Zari Embroidered Suit", "Bridal Wear", 12900, 17999, 4.9, 74, "Wedding", ["Maroon", "Gold"], true, false],
  ["Crimson Bridal Lehenga Set", "Bridal Wear", 18900, 24999, 5.0, 39, "Wedding", ["Red", "Gold"], true, false],
  ["Rose Gold Reception Gown", "Bridal Wear", 9900, 13999, 4.7, 28, "Wedding", ["Rose Gold"], false, true],
  // Festive
  ["Sage Gold Festive Anarkali", "Festive Wear", 5490, 7999, 4.8, 83, "Festive", ["Sage", "Gold"], true, true],
  ["Mustard Silk Festive Gown", "Festive Wear", 4290, 6199, 4.4, 46, "Festive", ["Mustard"], false, false],
  // Kurtis
  ["Printed Everyday Kurti", "Kurtis", 990, 1499, 4.3, 205, "Casual", ["Beige", "Rust"], true, false],
  ["Block Print Cotton Kurti Set", "Kurtis", 1490, 2199, 4.4, 97, "Casual", ["Indigo"], false, true],
];

const sizeMap = {
  Jeans: ["26", "28", "30", "32", "34"],
  Sarees: ["Free Size"],
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const extrasFor = (cat) => {
  const pool = {
    Sarees: ["Festive Wear", "Bridal Wear"],
    "Salwar Suits": ["Kurtis", "Festive Wear"],
    "Sharara Sets": ["Festive Wear", "Bridal Wear"],
    Dresses: ["Tops", "Jeans"],
    Tops: ["Jeans", "Dresses"],
    Jeans: ["Tops", "Dresses"],
    "Bridal Wear": ["Sharara Sets", "Sarees"],
    "Festive Wear": ["Sharara Sets", "Salwar Suits"],
    Kurtis: ["Salwar Suits", "Tops"],
  };
  return pool[cat] || [];
};

export const products = base.map((p, i) => {
  const [name, category, price, originalPrice, rating, reviewCount, occasion, colors, featured, newArrival] = p;
  return {
    id: `p${i + 1}`,
    sku: `HIFI-${String(i + 1).padStart(3, "0")}`,
    name,
    slug: slugify(name),
    category,
    subcategory: occasion + " Wear",
    price,
    originalPrice,
    discount: Math.round(((originalPrice - price) / originalPrice) * 100),
    rating,
    reviewCount,
    occasion,
    colors,
    sizes: sizeMap[category] || ["XS", "S", "M", "L", "XL"],
    images: gallery(category, extrasFor(category)),
    description: `${name} from the HIFI FASHIONS boutique in Chandan Nagar, Pune. Tailored in premium fabric with a flattering silhouette, this ${category.toLowerCase()} piece is finished with careful detailing so it looks as good in person as it does on camera. A versatile pick for ${occasion.toLowerCase()} occasions.`,
    details: [
      "Premium quality fabric with soft hand-feel",
      "Colour may vary slightly due to photography lighting",
      "Dry clean recommended for embroidered pieces",
      "Styled and shipped from Pune, Maharashtra",
    ],
    stock: [3, 12, 25, 40, 7, 0][i % 6],
    featured,
    newArrival,
    tags: [category, occasion, newArrival ? "New" : "Classic"],
    status: "active",
  };
});

export const getProductById = (list, id) => list.find((p) => p.id === id || p.slug === id);
