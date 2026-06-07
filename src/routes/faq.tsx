import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Ahmed Gadgets" },
      { name: "description", content: "Answers to common questions about shipping, returns, warranty, and orders at Ahmed Gadgets." },
      { property: "og:title", content: "FAQ — Ahmed Gadgets" },
      { property: "og:description", content: "Shipping, returns, warranty, and order help." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Most orders ship within 1–2 business days and arrive in 3–7 days depending on your location. Free shipping on orders over PKR 5,000.",
  },
  {
    q: "What is your return policy?",
    a: "You can return any unused item within 30 days for a full refund. Just contact us and we'll send a prepaid label.",
  },
  {
    q: "Do your products come with a warranty?",
    a: "Yes — every product is covered by a 2-year warranty against manufacturing defects.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. International rates are calculated at checkout.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you'll receive an email with a tracking link.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "If your order hasn't shipped yet, contact us and we'll do our best to update or cancel it.",
  },
  {
    q: "How do I contact support?",
    a: "Use our contact form — we typically reply within one business day.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Frequently asked questions</h1>
          <p className="mt-3 text-muted-foreground">Everything you need to know about ordering from Ahmed Gadgets.</p>
        </div>

        <div className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-foreground">{item.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>}
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
          <h2 className="text-base font-semibold text-foreground">Still have questions?</h2>
          <p className="mt-1 text-sm text-muted-foreground">We're happy to help.</p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
