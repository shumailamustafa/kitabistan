import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Banknote, GraduationCap, Minus, Plus, ShoppingBag, Truck } from "lucide-react";
import { BOOKS, BOOK_REVIEWS, getBookBySlug, groupName } from "../data/books";
import { formatPKR, unitPrice, type Edition } from "../data/pricing";
import { useCart } from "../store/cart";
import BookCard from "../components/BookCard";
import Cover from "../components/Cover";
import { Button, ButtonLink, Reveal, SectionHead, Stars } from "../components/ui";

export default function BookDetail() {
  const { slug = "" } = useParams();
  const book = getBookBySlug(slug);
  const { add, showToast } = useCart();
  const [edition, setEdition] = useState<Edition>("standard");
  const [qty, setQty] = useState(1);

  if (!book) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl">Book not found</h1>
        <p className="mt-2 text-muted">It may have been removed from the catalogue</p>
        <ButtonLink to="/shop" className="mt-6">
          Back to shop
        </ButtonLink>
      </div>
    );
  }

  const reviews = BOOK_REVIEWS[book.group];
  const related = [
    ...BOOKS.filter((b) => b.group === book.group && b.id !== book.id),
    ...BOOKS.filter((b) => b.group !== book.group),
  ].slice(0, 4);
  const price = unitPrice(book, edition);

  const onAdd = () => {
    add(book.id, edition, qty);
    showToast({
      message: `${qty} × ${book.title} added to cart`,
      action: { label: "View cart", to: "/cart" },
    });
  };

  const editions: { key: Edition; name: string; format: string }[] = [
    { key: "standard", name: "Standard", format: "Paperback" },
    { key: "premium", name: "Premium", format: "Hardcover" },
  ];

  return (
    <div className="pb-28">
      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <nav className="flex flex-wrap gap-2 text-sm text-muted" aria-label="Breadcrumb">
          <Link to="/shop" className="hover:text-ink">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${book.group}`} className="hover:text-ink">{groupName(book.group)}</Link>
          <span>/</span>
          <span className="text-ink">{book.title}</span>
        </nav>

        <div className="mt-8 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="group/cover rounded-book bg-mist p-10 perspective-[1600px] md:p-16">
              <div className="mx-auto max-w-sm shadow-lift transition-transform duration-700 ease-out group-hover/cover:[transform:rotateY(-14deg)_rotateX(4deg)] motion-reduce:transition-none">
                <Cover book={book} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-red">{book.category}</p>
            <h1 className="mt-2 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              {book.title}
            </h1>
            {book.urduTitle && (
              <p dir="rtl" lang="ur" className="mt-2 text-left font-urdu text-3xl leading-loose text-ink-soft">
                {book.urduTitle}
              </p>
            )}
            <p className="mt-3 text-lg text-muted">
              by <span className="font-semibold text-ink">{book.author}</span>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Stars rating={book.rating} size={16} />
              <a href="#reviews" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                {book.ratingCount} ratings
              </a>
            </div>

            <p className="mt-8 font-display text-4xl font-semibold">{formatPKR(price)}</p>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-semibold">Edition</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {editions.map((e) => {
                  const active = edition === e.key;
                  return (
                    <label
                      key={e.key}
                      className={`flex cursor-pointer items-center justify-between rounded-btn border p-4 transition-colors ${
                        active ? "border-red bg-red-tint" : "border-line hover:border-ink"
                      }`}
                    >
                      <input
                        type="radio"
                        name="edition"
                        value={e.key}
                        checked={active}
                        onChange={() => setEdition(e.key)}
                        className="sr-only"
                      />
                      <span>
                        <span className="block font-semibold">{e.name}</span>
                        <span className="text-sm text-muted">{e.format}</span>
                      </span>
                      <span className="font-semibold">{formatPKR(unitPrice(book, e.key))}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-btn border border-ink" role="group" aria-label="Quantity">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center hover:bg-mist disabled:opacity-40"
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="grid h-12 w-12 place-items-center hover:bg-mist"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button size="lg" onClick={onAdd} className="flex-1 sm:flex-none">
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
            </div>

            <ul className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
              <li className="flex items-center gap-3">
                <Banknote size={18} strokeWidth={1.75} className="text-red" />
                Cash on Delivery: pay the rider when your book arrives
              </li>
              <li className="flex items-center gap-3">
                <Truck size={18} strokeWidth={1.75} className="text-red" />
                Free delivery to 24 cities
              </li>
              {book.studentEligible && (
                <li className="flex items-center gap-3">
                  <GraduationCap size={18} strokeWidth={1.75} className="text-red" />
                  Students get 10% off this book at checkout
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <Reveal variant="flip" className="lg:col-span-7">
          <h2 className="border-b border-ink pb-4 font-display text-3xl font-medium tracking-tight">About this book</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            {book.full.map((p, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-red" : ""}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal variant="flip" delay={120} className="lg:col-span-5">
          <h2 className="border-b border-ink pb-4 font-display text-3xl font-medium tracking-tight">Details</h2>
          <dl className="mt-2 divide-y divide-line text-sm">
            {[
              ["Author", book.author],
              ["Category", book.category],
              ["Language", book.language],
              ["Editions", "Standard paperback, Premium hardcover"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3.5">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal as="section" variant="flip" className="mx-auto mt-24 max-w-7xl scroll-mt-24 px-5 md:px-8">
        <div id="reviews" className="scroll-mt-28">
          <SectionHead
            title="Reviews"
            action={
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-medium">{book.rating.toFixed(1)}</span>
                <span>
                  <Stars rating={book.rating} showValue={false} />
                  <span className="block text-xs text-muted">{book.ratingCount} ratings</span>
                </span>
              </div>
            }
          />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className="border-l-2 border-red pl-6">
              <Stars rating={r.rating} showValue={false} size={13} />
              <blockquote className="mt-3 text-lg leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="text-muted"> · {r.city}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      <section className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <Reveal variant="flip">
          <SectionHead kicker="Readers also bought" title="Related books" />
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((b, i) => (
            <Reveal key={b.id} delay={i * 90}>
              <BookCard book={b} compact />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
