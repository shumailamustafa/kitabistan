import { useState } from "react";
import { X } from "lucide-react";
import { formatPKR } from "../data/pricing";
import { useCart } from "../store/cart";
import { Button } from "./ui";

export function StudentToggle() {
  const { student, setStudent, totals } = useCart();
  const eligible = totals.studentEligibleTotal > 0;
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-btn border p-4 transition-colors ${student ? "border-red bg-red-tint" : "border-line hover:border-ink"}`}>
      <input
        type="checkbox"
        checked={student}
        onChange={(e) => setStudent(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-red"
      />
      <span className="text-sm">
        <span className="block font-semibold">I'm a student</span>
        <span className="text-muted">
          {eligible
            ? "10% off the academic and computer science books in your cart"
            : "10% off academic and computer science books. None in your cart yet"}
        </span>
      </span>
    </label>
  );
}

export function PromoField() {
  const { code, applyCode, removeCode, totals } = useCart();
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = () => {
    const r = applyCode(value);
    setMsg({ ok: r.ok, text: r.message });
    if (r.ok) setValue("");
  };

  if (code) {
    return (
      <div className="rounded-btn border border-dashed border-red p-4 text-sm">
        <div className="flex items-center justify-between">
          <span>
            Code <span className="font-mono font-semibold tracking-wider">{code}</span> applied
          </span>
          <button onClick={removeCode} className="inline-flex items-center gap-1 text-muted hover:text-ink" aria-label={`Remove code ${code}`}>
            <X size={14} /> Remove
          </button>
        </div>
        {totals.codeNotCombined && totals.offer && (
          <p className="mt-2 text-muted">
            Codes don't combine with volume deals. Your {totals.offer.source === "bulk" ? "bulk order discount (20%)" : "bundle deal (15%)"} gives the same or more, so it applies instead.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor="promo" className="mb-2 block text-sm font-semibold">
        Promo code
      </label>
      <div className="flex gap-2">
        <input
          id="promo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            }
          }}
          aria-invalid={msg ? !msg.ok : undefined}
          aria-describedby={msg ? "promo-msg" : undefined}
          className="min-w-0 flex-1 rounded-btn border border-line px-3 py-2.5 font-mono uppercase tracking-wider outline-none focus:border-ink"
        />
        <Button type="button" variant="outline" size="sm" onClick={submit}>
          Apply
        </Button>
      </div>
      {msg && !msg.ok && (
        <p id="promo-msg" className="mt-2 text-sm text-red">
          {msg.text}
        </p>
      )}
    </div>
  );
}

export function TotalsList() {
  const { totals } = useCart();
  return (
    <dl className="space-y-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-muted">
          Subtotal ({totals.count} {totals.count === 1 ? "book" : "books"})
        </dt>
        <dd className="font-semibold tabular-nums">{formatPKR(totals.subtotal)}</dd>
      </div>
      {totals.studentDiscount > 0 && (
        <div className="flex justify-between text-red">
          <dt>Student discount (10%)</dt>
          <dd className="font-semibold tabular-nums">−{formatPKR(totals.studentDiscount)}</dd>
        </div>
      )}
      {totals.offer && (
        <div className="flex justify-between text-red">
          <dt>{totals.offer.label}</dt>
          <dd className="font-semibold tabular-nums">−{formatPKR(totals.offer.amount)}</dd>
        </div>
      )}
      <div className="flex justify-between">
        <dt className="text-muted">Delivery</dt>
        <dd className="font-semibold">Free</dd>
      </div>
      <div className="flex items-baseline justify-between border-t border-ink pt-4">
        <dt className="font-semibold">Total</dt>
        <dd className="font-display text-3xl font-semibold tabular-nums">{formatPKR(totals.total)}</dd>
      </div>
    </dl>
  );
}
