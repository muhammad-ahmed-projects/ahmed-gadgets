import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { getProducts } from "@/lib/shop.functions";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Truck, ShieldCheck, Leaf, Headphones, Star } from "lucide-react";

const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: () => getProducts(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ahmed Gadgets — Minimal Tech" },
      { name: "description", content: "Minimal tech gadgets and accessories, thoughtfully designed." },
      { property: "og:title", content: "Ahmed Gadgets — Minimal Tech" },
      { property: "og:description", content: "Minimal tech gadgets and accessories, thoughtfully designed." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQueryOptions),
  component: ShopPage,
});

const features = [
  { icon: Truck, title: "Free shipping", desc: "On all orders over PKR 5,000" },
  { icon: ShieldCheck, title: "2-year warranty", desc: "Quality you can trust" },
  { icon: Leaf, title: "Sustainable", desc: "Eco-conscious materials" },
  { icon: Headphones, title: "Support 24/7", desc: "We're here to help" },
];

const testimonials = [
  { name: "Sara K.", text: "Beautifully designed, works flawlessly. The earbuds are now a daily essential.", role: "Designer" },
  { name: "Daniel M.", text: "Premium feel without the premium markup. Fast shipping, great packaging.", role: "Developer" },
  { name: "Aisha R.", text: "The desk lamp transformed my workspace. Clean, minimal, exactly as advertised.", role: "Writer" },
];

function ShopPage() {
  const { data: products } = useSuspenseQuery(productsQueryOptions);
  const featured = products?.slice(0, 3) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-accent blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/80">
              New Collection — Summer 2026
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
              Gadgets that feel right
            </h1>
            <p className="mt-5 max-w-lg text-lg text-primary-foreground/70">
              Minimal tech accessories, thoughtfully crafted for the modern workspace. No clutter — just essentials that work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                hash="products"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md border border-primary-foreground/20 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Get in touch
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-primary-foreground/70">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span>Rated 4.9 by 2,000+ happy customers</span>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 2).map((p, i) => (
                <div
                  key={p.id}
                  className={`overflow-hidden rounded-2xl bg-card shadow-2xl ${i === 1 ? "mt-10" : ""}`}
                >
                  <img src={p.image_url} alt={p.name} className="aspect-square w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature bar */}
      <section className="border-b border-border/40 bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-accent">Bestsellers</p>
              <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Loved by everyone</h2>
            </div>
            <Link to="/" hash="products" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All products */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Shop</p>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">All products</h2>
          </div>
          <span className="text-sm text-muted-foreground">{products?.length ?? 0} items</span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-accent">Reviews</p>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">What customers say</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border/40 bg-background p-6">
                <div className="mb-3 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-foreground">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center sm:px-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-xl">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-4xl">Stay in the loop</h2>
            <p className="mt-3 text-primary-foreground/70">
              New arrivals, exclusive drops, and a curated newsletter. No spam — ever.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
