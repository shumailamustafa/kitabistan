import { getBook, type Book } from "./books";

export type Edition = "standard" | "premium";
export type CartLine = { id: number; qty: number; edition: Edition };

export const STUDENT_RATE = 0.1;
export const BUNDLE_RATE = 0.15;
export const BUNDLE_MIN = 3;
export const BULK_RATE = 0.2;
export const BULK_MIN = 10;
export const PROMO_CODE = "READ15";
export const PROMO_RATE = 0.15;
/* Assumption: Premium edition (hardcover) costs 40% more, rounded to the nearest PKR 50 */
export const PREMIUM_MARKUP = 0.4;

export const formatPKR = (n: number) => `PKR ${Math.round(n).toLocaleString("en-US")}`;

export const unitPrice = (book: Book, edition: Edition) =>
  edition === "premium" ? Math.round((book.price * (1 + PREMIUM_MARKUP)) / 50) * 50 : book.price;

export type Totals = {
  rows: { line: CartLine; book: Book; unit: number; total: number }[];
  count: number;
  subtotal: number;
  studentEligibleTotal: number;
  studentDiscount: number;
  offer: { label: string; rate: number; amount: number; source: "bulk" | "bundle" | "code" } | null;
  codeNotCombined: boolean;
  total: number;
  nudge: string | null;
};

export function computeTotals(lines: CartLine[], student: boolean, code: string | null): Totals {
  const rows = lines.map((line) => {
    const book = getBook(line.id);
    const unit = unitPrice(book, line.edition);
    return { line, book, unit, total: unit * line.qty };
  });
  const count = rows.reduce((s, r) => s + r.line.qty, 0);
  const subtotal = rows.reduce((s, r) => s + r.total, 0);
  const studentEligibleTotal = rows.filter((r) => r.book.studentEligible).reduce((s, r) => s + r.total, 0);
  const studentDiscount = student ? Math.round(studentEligibleTotal * STUDENT_RATE) : 0;
  const base = subtotal - studentDiscount;

  const volume =
    count >= BULK_MIN
      ? { label: "Bulk and library order (20%)", rate: BULK_RATE, source: "bulk" as const }
      : count >= BUNDLE_MIN
        ? { label: "Bundle deal (15%)", rate: BUNDLE_RATE, source: "bundle" as const }
        : null;
  const promo = code === PROMO_CODE ? { label: `Code ${PROMO_CODE} (15%)`, rate: PROMO_RATE, source: "code" as const } : null;

  // Volume offers and the launch code don't stack: the larger one applies (volume wins a tie)
  let pick: { label: string; rate: number; source: "bulk" | "bundle" | "code" } | null = volume;
  if (promo && (!volume || promo.rate > volume.rate)) pick = promo;
  const codeNotCombined = !!promo && pick !== promo;
  const offer = pick ? { ...pick, amount: Math.round(base * pick.rate) } : null;

  const total = base - (offer?.amount ?? 0);

  let nudge: string | null = null;
  if (count > 0 && count < BUNDLE_MIN) {
    const n = BUNDLE_MIN - count;
    nudge = `Add ${n} more ${n === 1 ? "book" : "books"} to get 15% off with the bundle deal`;
  } else if (count >= BUNDLE_MIN && count < BULK_MIN) {
    const n = BULK_MIN - count;
    nudge = `Add ${n} more ${n === 1 ? "book" : "books"} for 20% off as a bulk order`;
  }

  return { rows, count, subtotal, studentEligibleTotal, studentDiscount, offer, codeNotCombined, total, nudge };
}
