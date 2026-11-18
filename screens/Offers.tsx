import { ArrowRight, Check, Minus } from "lucide-react";
import { getBook } from "../data/books";
import { computeTotals, formatPKR, unitPrice, type CartLine } from "../data/pricing";
import Cover from "../components/Cover";
import { ButtonLink, Reveal } from "../components/ui";

function example(lines: CartLine[], student = false, code: string | null = null) {
  const t = computeTotals(lines, student, code);
  return { before: t.subtotal, after: t.total };
}

const OFFERS = [
  {
    name: "Student discount",
    rule: "10% off academic and computer science books",
    who: "Students buying course books and programming titles",
    kind: "Third-degree price discrimination",
    why: "Students are more price-sensitive and often can't pay full price for expensive textbooks. Pricing them as a group keeps these books within reach while other readers pay the standard price.",
    exampleLabel: "Clean Code",
    ex: example([{ id: 7, qty: 1, edition: "standard" }], true),
    books: [7, 9],
  },
  {
    name: "Bundle deals",
    rule: "Buy 3 books, get 15% off",
    who: "Readers who would buy one book, nudged to buy three",
    kind: "Second-degree price discrimination",
    why: "The price per book drops as the quantity rises. Customers choose their own discount by how much they buy, which grows the average order.",
    exampleLabel: "The Alchemist, 1984 and Pride and Prejudice",
    ex: example([
      { id: 1, qty: 1, edition: "standard" },
      { id: 2, qty: 1, edition: "standard" },
      { id: 3, qty: 1, edition: "standard" },
    ]),
    books: [1, 2, 3],
  },
  {
    name: "Bulk and library orders",
    rule: "20% off orders of 10 or more books",
    who: "Schools, libraries, universities and reading clubs",
    kind: "Second-degree price discrimination",
    why: "Large buyers place big, predictable orders and compare suppliers carefully. A deeper volume discount wins their business while costing less per book to fulfil.",
    exampleLabel: "10 × Python Crash Course",
    ex: example([{ id: 8, qty: 10, edition: "standard" }]),
    books: [8],
  },
  {
    name: "Launch code READ15",
    rule: "15% off with code READ15",
    who: "New customers trying Kitabistan for the first time",
    kind: "Promotional pricing",
    why: "Only shoppers who find and enter the code pay less. It rewards early, engaged customers and gives everyone a reason to place a first order now.",
    exampleLabel: "Atomic Habits",
    ex: example([{ id: 4, qty: 1, edition: "standard" }], false, "READ15"),
    books: [4],
  },
];

const PREMIUM_ROWS: [string, boolean | string, boolean | string][] = [
  ["Format", "Paperback", "Hardcover"],
  ["Price", "Listed price", "40% above listed price"],
  ["Student, bundle and bulk discounts", true, true],
  ["Launch code READ15", true, true],
  ["Cash on Delivery and free delivery", true, true],
];

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span>{v}</span>;
  return v ? (
    <Check size={18} className="text-red" aria-label="Included" />
  ) : (
    <Minus size={18} className="text-muted" aria-label="Not included" />
  );
}

export default function Offers() {
  const sample = getBook(10);
  return (
    <div className="pb-28">
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="animate-rise font-display text-lg italic text-red">Pricing strategy</p>
            <h1 className="mt-3 animate-rise font-display text-6xl font-medium leading-[0.98] tracking-tight md:text-7xl" style={{ animationDelay: "120ms" }}>
              Offers and Pricing
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-paper/75" style={{ animationDelay: "240ms" }}>
              Not every reader pays the same price at Kitabistan, and that's on purpose. Students, bulk buyers and early customers each get a price built for them. Here is every offer, who it's for and why it exists.
            </p>
          </div>
          <div className="animate-rise lg:col-span-5" style={{ animationDelay: "360ms" }}>
            <p className="text-sm font-semibold text-paper/60">What is price discrimination?</p>
            <p className="mt-3 font-display text-2xl font-light leading-snug">
              Selling the same book at different prices to different groups of buyers, based on how much each group is willing or able to pay.
            </p>
            <dl className="mt-8 space-y-4 border-t border-paper/15 pt-6 text-sm">
              <div>
                <dt className="font-semibold text-red">Third degree</dt>
                <dd className="text-paper/75">Different prices for different groups, like students</dd>
              </div>
              <div>
                <dt className="font-semibold text-red">Second degree</dt>
                <dd className="text-paper/75">Lower prices for buying more, like bundles and bulk orders</dd>
              </div>
              <div>
                <dt className="font-semibold text-red">Versioning</dt>
                <dd className="text-paper/75">Different editions at different prices, like Standard and Premium</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
        <ol>
          {OFFERS.map((o, i) => (
            <Reveal as="li" variant="flip" key={o.name} className="grid gap-8 border-t border-ink py-14 lg:grid-cols-12">
              <div className="lg:col-span-1">
                <span className="font-display text-6xl font-light leading-none text-red">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="lg:col-span-6">
                <p className="text-sm font-semibold text-muted">{o.kind}</p>
                <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">{o.name}</h2>
                <p className="mt-3 font-display text-2xl italic text-red">{o.rule}</p>
                <p className="mt-5 leading-relaxed text-ink-soft">{o.why}</p>
                <p className="mt-4 text-sm">
                  <span className="font-semibold">Who it's for: </span>
                  <span className="text-muted">{o.who}</span>
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-6 rounded-book bg-mist p-6">
                  <div className="flex shrink-0">
                    {o.books.map((id, j) => (
                      <div key={id} className={`w-14 shadow-book ${j > 0 ? "-ml-6" : ""}`}>
                        <Cover book={getBook(id)} />
                      </div>
                    ))}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{o.exampleLabel}</p>
                    <p className="mt-1 text-sm text-muted line-through tabular-nums">{formatPKR(o.ex.before)}</p>
                    <p className="font-display text-3xl font-semibold tabular-nums">{formatPKR(o.ex.after)}</p>
                    <p className="text-sm font-semibold text-red">You save {formatPKR(o.ex.before - o.ex.after)}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal as="li" variant="flip" className="grid gap-8 border-y border-ink py-14 lg:grid-cols-12">
            <div className="lg:col-span-1">
              <span className="font-display text-6xl font-light leading-none text-red">05</span>
            </div>
            <div className="lg:col-span-11">
              <p className="text-sm font-semibold text-muted">Versioning</p>
              <h2 className="mt-2 font-display text-4xl font-medium tracking-tight">Standard vs Premium</h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">
                Every book comes in two editions. Readers who want the book at the lowest price choose Standard. Readers who want a hardcover to keep or give as a gift choose Premium and pay more for it.
              </p>
              <div className="mt-10 grid gap-10 lg:grid-cols-12">
                <div className="overflow-x-auto lg:col-span-8">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-ink">
                        <th className="py-3 pr-4 font-semibold text-muted" scope="col">
                          <span className="sr-only">Feature</span>
                        </th>
                        <th className="w-1/4 py-3 pr-4 font-display text-xl font-medium" scope="col">Standard</th>
                        <th className="w-1/4 py-3 font-display text-xl font-medium text-red" scope="col">Premium</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {PREMIUM_ROWS.map(([label, s, p]) => (
                        <tr key={label}>
                          <th scope="row" className="py-3.5 pr-4 font-normal text-ink-soft">{label}</th>
                          <td className="py-3.5 pr-4 font-semibold"><Cell v={s} /></td>
                          <td className="py-3.5 font-semibold"><Cell v={p} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center gap-6 rounded-book bg-mist p-6 lg:col-span-4">
                  <div className="w-20 shrink-0 shadow-book">
                    <Cover book={sample} />
                  </div>
                  <div className="text-sm">
                    <p className="text-muted">{sample.title}</p>
                    <p className="mt-2">
                      Standard <span className="float-right font-semibold tabular-nums">{formatPKR(unitPrice(sample, "standard"))}</span>
                    </p>
                    <p className="mt-1 text-red">
                      Premium <span className="float-right ml-4 font-semibold tabular-nums">{formatPKR(unitPrice(sample, "premium"))}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </ol>
      </section>

      <Reveal as="section" variant="flip" className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 className="font-display text-4xl font-medium tracking-tight lg:col-span-4">How offers combine</h2>
          <ul className="space-y-5 text-ink-soft lg:col-span-8">
            {[
              "The student discount is taken first, on eligible books only, and works alongside every other offer.",
              "Bundle deals, bulk orders and code READ15 don't stack. Your cart applies whichever saves you the most.",
              "At 10 or more books, the 20% bulk discount replaces the 15% bundle deal.",
              "All discounts apply to both Standard and Premium editions. Delivery is always free.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 border-b border-line pb-5 text-lg leading-relaxed">
                <span className="font-display italic text-red">{i + 1}.</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal as="section" variant="flip" className="mx-auto mt-24 max-w-7xl px-5 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-book bg-red px-8 py-12 text-paper md:flex-row md:items-center md:px-12">
          <p className="font-display text-4xl font-medium tracking-tight">Bundle and bulk savings apply automatically in your cart</p>
          <ButtonLink to="/shop" variant="light" size="lg">
            Shop Now <ArrowRight size={18} />
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
