import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import type { Book } from "../data/books";
import { formatPKR } from "../data/pricing";
import { useCart } from "../store/cart";
import Cover from "./Cover";
import { Button, Stars } from "./ui";

export default function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const { add, showToast } = useCart();
  const onAdd = () => {
    add(book.id);
    showToast({ message: `${book.title} added to cart`, action: { label: "View cart", to: "/cart" } });
  };

  return (
    <article className="group/card flex h-full flex-col">
      <Link
        to={`/books/${book.slug}`}
        className="relative block rounded-book bg-mist p-5 transition-shadow duration-300 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-red"
      >
        <div className="overflow-hidden rounded-book shadow-book">
          <div className="transition-transform duration-500 ease-out group-hover/card:scale-[1.06] motion-reduce:transition-none">
            <Cover book={book} />
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-red">{book.category}</p>
          <Stars rating={book.rating} size={12} />
        </div>
        <Link to={`/books/${book.slug}`} className="mt-1.5 hover:text-red">
          <h3 className="font-display text-xl font-medium leading-snug tracking-tight">{book.title}</h3>
        </Link>
        <p className="text-sm text-muted">{book.author}</p>
        {!compact && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{book.short}</p>}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="font-display text-lg font-semibold">{formatPKR(book.price)}</p>
          <Button variant="ghost" size="sm" onClick={onAdd} aria-label={`Add ${book.title} to cart`}>
            <ShoppingBag size={15} strokeWidth={2} />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
