import { useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import { formatPKR } from "../data/pricing";
import { useScreenInit } from "../useScreenInit";
import { ButtonLink } from "../components/ui";

type Order = { number: string; total: number; count: number; name: string; phone: string; city: string };

export default function OrderConfirmed() {
  const location = useLocation();
  const init = useScreenInit();
  const order = (location.state as Order | null) ?? ((init.order as Order | undefined) ?? null);

  if (!order) {
    return (
      <div className="mx-auto max-w-xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl font-medium tracking-tight">No recent order</h1>
        <p className="mt-3 text-muted">Orders you place show up here once</p>
        <ButtonLink to="/shop" size="lg" className="mt-8">
          Browse books
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-24 md:px-8">
      <span className="grid h-16 w-16 animate-bump place-items-center rounded-full bg-red text-paper">
        <Check size={30} strokeWidth={2.5} />
      </span>
      <p className="mt-8 font-display text-lg italic text-red">Order {order.number}</p>
      <h1 className="mt-2 font-display text-5xl font-medium leading-tight tracking-tight md:text-6xl">
        Thank you, {order.name.split(" ")[0]}. Your books are on the way.
      </h1>
      <dl className="mt-12 divide-y divide-line border-y border-ink text-sm">
        {[
          ["Pay on delivery", formatPKR(order.total)],
          ["Books", String(order.count)],
          ["Delivering to", order.city],
          ["Rider will call", order.phone],
          ["Payment", "Cash on Delivery"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-4">
            <dt className="text-muted">{k}</dt>
            <dd className={k === "Pay on delivery" ? "font-display text-2xl font-semibold" : "font-semibold"}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-muted">Keep the cash ready for the rider. Delivery is free.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink to="/shop" size="lg">
          Continue shopping
        </ButtonLink>
        <ButtonLink to="/" variant="outline" size="lg">
          Back to home
        </ButtonLink>
      </div>
    </div>
  );
}
