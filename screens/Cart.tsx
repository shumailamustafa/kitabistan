import { Link } from "react-router-dom";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { formatPKR } from "../data/pricing";
import { useCart } from "../store/cart";
import Cover from "../components/Cover";
import { PromoField, StudentToggle, TotalsList } from "../components/OrderSummary";
import { ButtonLink } from "../components/ui";

export default function Cart() {
  const { totals, setQty, remove } = useCart();

  if (totals.rows.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <p className="font-display text-7xl font-light text-red" aria-hidden="true">0</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-muted">Pick a book or two. Three or more get 15% off.</p>
        <ButtonLink to="/shop" size="lg" className="mt-8">
          Browse books
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-12 md:px-8">
      <h1 className="border-b border-ink pb-6 font-display text-5xl font-medium tracking-tight">Your cart</h1>

      {totals.nudge && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-btn bg-red-tint px-5 py-4 text-sm">
          <span className="font-semibold text-red-deep">{totals.nudge}</span>
          <Link to="/shop" className="inline-flex items-center gap-1 font-semibold text-ink hover:text-red">
            Keep shopping <ArrowRight size={15} />
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-14 lg:grid-cols-12">
        <ul className="divide-y divide-line lg:col-span-7">
          {totals.rows.map(({ line, book, unit, total }) => (
            <li key={`${line.id}-${line.edition}`} className="flex animate-fade gap-5 py-6 first:pt-0">
              <Link to={`/books/${book.slug}`} className="w-20 shrink-0 shadow-book md:w-24">
                <Cover book={book} />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link to={`/books/${book.slug}`} className="font-display text-xl font-medium tracking-tight hover:text-red">
                      {book.title}
                    </Link>
                    <p className="text-sm text-muted">{book.author}</p>
                    <p className="mt-1 text-sm">
                      {line.edition === "premium" ? "Premium hardcover" : "Standard paperback"} · {formatPKR(unit)}
                    </p>
                    {book.studentEligible && <p className="mt-1 text-xs font-semibold text-red">Student discount eligible</p>}
                  </div>
                  <p className="font-semibold tabular-nums">{formatPKR(total)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-btn border border-line" role="group" aria-label={`Quantity of ${book.title}`}>
                    <button
                      onClick={() => setQty(line.id, line.edition, line.qty - 1)}
                      disabled={line.qty <= 1}
                      className="grid h-9 w-9 place-items-center hover:bg-mist disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold tabular-nums">{line.qty}</span>
                    <button
                      onClick={() => setQty(line.id, line.edition, line.qty + 1)}
                      className="grid h-9 w-9 place-items-center hover:bg-mist"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(line.id, line.edition)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
                  >
                    <Trash2 size={15} strokeWidth={1.75} /> Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="lg:col-span-5">
          <div className="space-y-5 rounded-book bg-mist p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-medium">Order summary</h2>
            <StudentToggle />
            <PromoField />
            <TotalsList />
            <ButtonLink to="/checkout" size="lg" className="w-full">
              Checkout
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <p className="text-center text-xs text-muted">Pay in cash on delivery</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
