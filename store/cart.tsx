import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { computeTotals, PROMO_CODE, type CartLine, type Edition, type Totals } from "../data/pricing";
import { useScreenInit } from "../useScreenInit";

type Toast = { id: number; message: string; action?: { label: string; to?: string; onClick?: () => void } };

type CartCtx = {
  lines: CartLine[];
  count: number;
  totals: Totals;
  student: boolean;
  setStudent: (v: boolean) => void;
  code: string | null;
  applyCode: (raw: string) => { ok: boolean; message: string };
  removeCode: () => void;
  add: (id: number, edition?: Edition, qty?: number) => void;
  setQty: (id: number, edition: Edition, qty: number) => void;
  remove: (id: number, edition: Edition) => void;
  clear: () => void;
  toast: Toast | null;
  showToast: (t: Omit<Toast, "id">) => void;
  dismissToast: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const init = useScreenInit();
  const [lines, setLines] = useState<CartLine[]>(() => (Array.isArray(init.cart) ? (init.cart as CartLine[]) : []));
  const [student, setStudent] = useState<boolean>(init.student === true);
  const [code, setCode] = useState<string | null>(typeof init.code === "string" ? (init.code as string) : null);
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const showToast = useCallback((t: Omit<Toast, "id">) => {
    window.clearTimeout(timer.current);
    setToast({ ...t, id: Date.now() });
    timer.current = window.setTimeout(() => setToast(null), 4000);
  }, []);
  const dismissToast = useCallback(() => setToast(null), []);

  const add = useCallback((id: number, edition: Edition = "standard", qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id && l.edition === edition);
      if (found) return prev.map((l) => (l === found ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      return [...prev, { id, edition, qty }];
    });
  }, []);

  const setQty = useCallback((id: number, edition: Edition, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.id === id && l.edition === edition ? { ...l, qty: Math.max(1, Math.min(99, qty)) } : l)),
    );
  }, []);

  const remove = useCallback(
    (id: number, edition: Edition) => {
      setLines((prev) => {
        const index = prev.findIndex((l) => l.id === id && l.edition === edition);
        if (index < 0) return prev;
        const removed = prev[index];
        showToast({
          message: "Book removed from cart",
          action: {
            label: "Undo",
            onClick: () =>
              setLines((cur) => {
                const next = [...cur];
                next.splice(Math.min(index, next.length), 0, removed);
                return next;
              }),
          },
        });
        return prev.filter((_, i) => i !== index);
      });
    },
    [showToast],
  );

  const applyCode = useCallback((raw: string) => {
    const v = raw.trim().toUpperCase();
    if (!v) return { ok: false, message: "Enter a code" };
    if (v !== PROMO_CODE) return { ok: false, message: `${v} isn't a valid code. Try ${PROMO_CODE}` };
    setCode(v);
    return { ok: true, message: `${v} applied` };
  }, []);

  const totals = useMemo(() => computeTotals(lines, student, code), [lines, student, code]);

  const value: CartCtx = {
    lines,
    count: totals.count,
    totals,
    student,
    setStudent,
    code,
    applyCode,
    removeCode: () => setCode(null),
    add,
    setQty,
    remove,
    clear: () => {
      setLines([]);
      setCode(null);
      setStudent(false);
    },
    toast,
    showToast,
    dismissToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
