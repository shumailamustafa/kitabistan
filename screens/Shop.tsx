import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { BOOKS, GROUPS, type GroupKey } from "../data/books";
import BookCard from "../components/BookCard";
import { Button, Reveal } from "../components/ui";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const category = (params.get("category") as GroupKey | null) ?? null;
  const sort = (params.get("sort") as Sort | null) ?? "featured";

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = BOOKS.filter((b) => (category ? b.group === category : true));
    if (term)
      list = list.filter((b) =>
        [b.title, b.author, b.category, b.urduTitle ?? ""].some((f) => f.toLowerCase().includes(term)),
      );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, category, sort]);

  const activeName = category ? GROUPS.find((g) => g.key === category)?.name : null;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-12 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink pb-8">
        <div>
          <h1 className="font-display text-5xl font-medium tracking-tight md:text-6xl">
            {activeName ?? "Shop all books"}
          </h1>
          <p className="mt-3 text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "book" : "books"}
            {q && (
              <>
                {" "}
                matching <span className="font-semibold text-ink">"{q}"</span>
              </>
            )}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <label className="relative block sm:w-80">
            <span className="sr-only">Search books</span>
            <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -mt-[8.5px] text-muted" />
            <input
              value={q}
              onChange={(e) => update("q", e.target.value || null)}
              placeholder="Search title, author or category"
              className="w-full rounded-btn border border-line bg-paper py-3 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink"
            />
            {q && (
              <button
                onClick={() => update("q", null)}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -mt-4 grid h-8 w-8 place-items-center rounded-btn text-muted hover:bg-mist hover:text-ink"
              >
                <X size={15} />
              </button>
            )}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="shrink-0 font-semibold">Sort by</span>
            <select
              value={sort}
              onChange={(e) => update("sort", e.target.value === "featured" ? null : e.target.value)}
              className="w-full rounded-btn border border-line bg-paper px-3 py-3 outline-none focus:border-ink sm:w-auto"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {[{ key: null as GroupKey | null, name: "All" }, ...GROUPS].map((g) => {
          const n = g.key ? BOOKS.filter((b) => b.group === g.key).length : BOOKS.length;
          const active = category === g.key;
          return (
            <button
              key={g.name}
              onClick={() => update("category", g.key)}
              aria-pressed={active}
              className={`rounded-btn border px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "border-red bg-red text-paper" : "border-line text-ink hover:border-ink"
              }`}
            >
              {g.name} <span className={active ? "text-paper/75" : "text-muted"}>{n}</span>
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-display text-3xl">No books match "{q}"</p>
          <p className="mt-2 text-muted">Try another title or author, or clear the filters</p>
          <Button
            className="mt-6"
            onClick={() => setParams(new URLSearchParams(), { replace: true })}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((b, i) => (
            <Reveal key={`${b.id}-${category}-${sort}`} delay={(i % 4) * 80}>
              <BookCard book={b} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
