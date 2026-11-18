import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

type Variant = "primary" | "outline" | "light" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-btn font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";
const variants: Record<Variant, string> = {
  primary: "bg-red text-paper shadow-book",
  outline: "border border-ink text-ink hover:text-paper",
  light: "bg-paper text-ink hover:text-paper",
  ghost: "border border-red text-red hover:text-paper",
};
const sweeps: Record<Variant, string> = {
  primary: "bg-ink",
  outline: "bg-ink",
  light: "bg-ink",
  ghost: "bg-red",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

function Inner({ variant, children }: { variant: Variant; children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 -translate-x-[101%] transition-transform duration-300 ease-out group-hover:translate-x-0 motion-reduce:transition-none ${sweeps[variant]}`}
      />
      {children}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
}: {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link to={to} onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

/* Scroll reveal. "flip" turns the section in like a page; "up" slides and fades. */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  variant?: "up" | "flip" | "fade";
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const anim =
    variant === "flip"
      ? "origin-top animate-page-in motion-reduce:animate-fade"
      : variant === "fade"
        ? "animate-fade"
        : "animate-rise motion-reduce:animate-fade";
  return (
    <Tag
      ref={ref as never}
      className={`${shown ? anim : "opacity-0"} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export function Stars({ rating, size = 14, showValue = true }: { rating: number; size?: number; showValue?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <span className="inline-flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={i <= Math.round(rating) ? "fill-red text-red" : "fill-line text-line"}
          />
        ))}
      </span>
      {showValue && <span className="text-xs font-semibold text-ink">{rating.toFixed(1)}</span>}
    </span>
  );
}

export function SectionHead({
  title,
  kicker,
  action,
}: {
  title: ReactNode;
  kicker?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
      <div>
        {kicker && <p className="mb-2 font-display text-lg italic text-red">{kicker}</p>}
        <h2 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
