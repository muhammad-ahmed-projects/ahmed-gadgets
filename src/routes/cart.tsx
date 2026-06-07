import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Forest & Tech" },
      { name: "description", content: "Review your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(cents / 100);
}

function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4">
        <ShoppingCart className="h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-4 text-xl font-semibold text-foreground">Your cart is empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">Explore our products and add something you love.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Shopping Cart</h1>
        <p className="mt-1 text-sm text-muted-foreground">{items.length} item(s)</p>

        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              <Link to="/products/$slug" params={{ slug: item.slug }}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </Link>
              <div className="flex-1">
                <Link
                  to="/products/$slug"
                  params={{ slug: item.slug }}
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Increase"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="hidden min-w-[80px] text-right text-sm font-semibold text-foreground sm:block">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-base text-muted-foreground">Subtotal</span>
            <span className="text-lg font-semibold text-foreground">{formatPrice(totalPrice)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Shipping</span>
            <span className="text-sm text-accent">Free</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">{formatPrice(totalPrice)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
