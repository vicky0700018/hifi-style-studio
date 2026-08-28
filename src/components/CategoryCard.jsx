import { Link } from "@tanstack/react-router";

export default function CategoryCard({ category, to }) {
  return (
    <Link
      to={to}
      search={to === "/shop" ? { category: category.name } : undefined}
      className="group relative block overflow-hidden rounded-2xl"
    >
      <img
        src={category.image}
        alt={`${category.name} collection at HIFI FASHIONS Pune`}
        loading="lazy"
        width={900}
        height={1200}
        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-xl text-background">{category.name}</h3>
        <span className="text-[0.65rem] tracking-[0.2em] text-background/80 uppercase">
          Shop now
        </span>
      </div>
    </Link>
  );
}
