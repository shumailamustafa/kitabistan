import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Banknote, Check } from "lucide-react";
import { formatPKR } from "../data/pricing";
import { useCart } from "../store/cart";
import Cover from "../components/Cover";
import { PromoField, StudentToggle, TotalsList } from "../components/OrderSummary";
import { Button, ButtonLink } from "../components/ui";

export const CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta",
  "Hyderabad", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Sukkur", "Abbottabad", "Mardan",
  "Sahiwal", "Okara", "Rahim Yar Khan", "Jhelum", "Gujrat", "Sheikhupura", "Larkana", "Mirpur",
];

type Fields = { name: string; phone: string; email: string; city: string; address: string; notes: string };
const empty: Fields = { name: "", phone: "", email: "", city: "", address: "", notes: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Enter your full name";
  if (!/^(\+92|0)3\d{2}[-\s]?\d{7}$/.test(f.phone.trim())) e.phone = "Enter a mobile number like 0300 1234567";
  if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "Enter an email like name@example.com";
  if (!f.city) e.city = "Choose your city";
  if (f.address.trim().length < 8) e.address = "Enter your house, street and area";
  return e;
}

export default function Checkout() {
  const { totals, clear } = useCart();
  const navigate = useNavigate();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [placing, setPlacing] = useState(false);

  if (totals.rows.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-medium tracking-tight">Nothing to check out yet</h1>
        <p className="mt-3 text-muted">Add books to your cart, then come back here to pay on delivery</p>
        <ButtonLink to="/shop" size="lg" className="mt-8">
          Browse books
        </ButtonLink>
      </div>
    );
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`co-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setPlacing(true);
    const order = {
      number: `KB-${Math.floor(10000 + Math.random() * 89999)}`,
      total: totals.total,
      count: totals.count,
      name: f.name.trim(),
      phone: f.phone.trim(),
      city: f.city,
    };
    window.setTimeout(() => {
      clear();
      navigate("/order-confirmed", { state: order });
    }, 900);
  };

  const input = (k: keyof Fields) =>
    `w-full rounded-btn border bg-paper px-4 py-3 outline-none transition-colors focus:border-ink ${errors[k] ? "border-red" : "border-line"}`;
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`co-${k}-err`} className="mt-1.5 text-sm text-red">
        {errors[k]}
      </p>
    ) : null;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-10 md:px-8">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> Back to cart
      </Link>
      <h1 className="mt-4 border-b border-ink pb-6 font-display text-5xl font-medium tracking-tight">Checkout</h1>

      <form onSubmit={submit} noValidate className="mt-10 grid gap-14 lg:grid-cols-12">
        <div className="space-y-10 lg:col-span-7">
          <section>
            <h2 className="font-display text-2xl font-medium">Delivery details</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="co-name" className="mb-2 block text-sm font-semibold">Full name</label>
                <input id="co-name" autoComplete="name" value={f.name} onChange={set("name")} className={input("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "co-name-err" : undefined} />
                <Err k="name" />
              </div>
              <div>
                <label htmlFor="co-phone" className="mb-2 block text-sm font-semibold">Mobile number</label>
                <input id="co-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} className={input("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "co-phone-err" : "co-phone-help"} />
                {errors.phone ? <Err k="phone" /> : <p id="co-phone-help" className="mt-1.5 text-xs text-muted">The rider calls this number on arrival</p>}
              </div>
              <div>
                <label htmlFor="co-email" className="mb-2 block text-sm font-semibold">Email (optional)</label>
                <input id="co-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} className={input("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "co-email-err" : undefined} />
                <Err k="email" />
              </div>
              <div>
                <label htmlFor="co-city" className="mb-2 block text-sm font-semibold">City</label>
                <select id="co-city" value={f.city} onChange={set("city")} className={input("city")} aria-invalid={!!errors.city} aria-describedby={errors.city ? "co-city-err" : undefined}>
                  <option value="">Choose city</option>
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <Err k="city" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-address" className="mb-2 block text-sm font-semibold">Address</label>
                <textarea id="co-address" rows={3} autoComplete="street-address" value={f.address} onChange={set("address")} className={input("address")} aria-invalid={!!errors.address} aria-describedby={errors.address ? "co-address-err" : undefined} />
                <Err k="address" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="co-notes" className="mb-2 block text-sm font-semibold">Delivery notes (optional)</label>
                <input id="co-notes" value={f.notes} onChange={set("notes")} className={input("notes")} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-medium">Payment</h2>
            <div className="mt-5 flex items-start gap-4 rounded-btn border-2 border-red p-5">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red text-paper">
                <Check size={14} strokeWidth={3} />
              </span>
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  <Banknote size={18} strokeWidth={1.75} /> Cash on Delivery
                </p>
                <p className="mt-1 text-sm text-muted">
                  No card needed. Pay {formatPKR(totals.total)} in cash to the rider when your books arrive.
                </p>
              </div>
            </div>
            <ol className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
              {["Place your order here", "We pack and dispatch it", "Pay the rider in cash at your door"].map((s, i) => (
                <li key={s} className="border-t border-line pt-3">
                  <span className="font-display text-lg italic text-red">{i + 1}.</span> {s}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div className="space-y-5 rounded-book bg-mist p-7 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-medium">Your order</h2>
            <ul className="space-y-4">
              {totals.rows.map(({ line, book, total }) => (
                <li key={`${line.id}-${line.edition}`} className="flex items-center gap-4">
                  <div className="w-11 shrink-0 shadow-book">
                    <Cover book={book} />
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-semibold">{book.title}</p>
                    <p className="text-muted">
                      {line.edition === "premium" ? "Premium" : "Standard"} · Qty {line.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">{formatPKR(total)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t border-line pt-5">
              <StudentToggle />
              <PromoField />
            </div>
            <TotalsList />
            <Button type="submit" size="lg" className="w-full" disabled={placing}>
              {placing ? "Placing order…" : `Place order · ${formatPKR(totals.total)}`}
            </Button>
          </div>
        </aside>
      </form>
    </div>
  );
}
