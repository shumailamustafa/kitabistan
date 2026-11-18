import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Facebook, Instagram, Menu, Search, ShoppingBag, Twitter, X, Youtube } from "lucide-react";
import { GROUPS } from "../data/books";
import { useCart } from "../store/cart";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Kitabistan home">
      <span className="grid h-9 w-9 place-items-center rounded-book bg-red font-urdu text-lg leading-none text-paper">
        ک
      </span>
      <span className={`font-display text-2xl font-semibold tracking-tight ${light ? "text-paper" : "text-ink"}`}>
        Kitabistan
      </span>
    </Link>
  );
}

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop", end: false },
  { to: "/offers", label: "Offers and Pricing", end: false },
];

function Header() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const onShop = location.pathname === "/shop";
  const [q, setQ] = useState(onShop ? (params.get("q") ?? "") : "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMenu(false);
    if (!onShop) setQ("");
    else setQ(params.get("q") ?? "");
  }, [location.pathname, onShop, params]);

  const search = (v: string) => {
    setQ(v);
    const next = new URLSearchParams(onShop ? params : undefined);
    if (v) next.set("q", v);
    else next.delete("q");
    navigate(`/shop${next.toString() ? `?${next}` : ""}`, { replace: onShop });
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-paper transition-[padding] duration-300 ${scrolled ? "py-3 shadow-header" : "py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 md:px-8">
        <Logo />
        <nav className="ml-6 hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative py-1 text-sm font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-red after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive ? "text-ink after:scale-x-100" : "text-muted hover:text-ink after:scale-x-0"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <label className={`relative hidden ${onShop ? "" : "md:block"}`}>
            <span className="sr-only">Search books</span>
            <Search size={16} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -mt-2 text-muted" />
            <input
              value={q}
              onChange={(e) => search(e.target.value)}
              placeholder="Search title or author"
              className="w-64 rounded-btn border border-line bg-mist py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted focus:border-ink focus:bg-paper"
            />
          </label>
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-btn text-ink transition-colors hover:bg-mist"
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
          >
            <ShoppingBag size={20} strokeWidth={1.75} />
            {count > 0 && (
              <span
                key={count}
                className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-red px-1 text-[11px] font-bold text-paper animate-bump"
              >
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-btn hover:bg-mist lg:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            {menu ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      {menu && (
        <div className="animate-menu-in border-t border-line bg-paper px-5 pb-5 pt-3 lg:hidden">
          <label className="relative mb-3 block md:hidden">
            <span className="sr-only">Search books</span>
            <Search size={16} strokeWidth={2} className="pointer-events-none absolute left-3 top-1/2 -mt-2 text-muted" />
            <input
              value={q}
              onChange={(e) => search(e.target.value)}
              placeholder="Search title or author"
              className="w-full rounded-btn border border-line bg-mist py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ink"
            />
          </label>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className="block py-2.5 font-display text-xl">
              {n.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const socials = [
    { label: "Instagram", Icon: Instagram },
    { label: "Facebook", Icon: Facebook },
    { label: "X", Icon: Twitter },
    { label: "YouTube", Icon: Youtube },
  ];
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 font-display text-3xl italic text-paper">Read More. Dream Bigger.</p>
          <div className="mt-8 flex gap-2">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={`Kitabistan on ${label}`}
                className="grid h-10 w-10 place-items-center rounded-btn border border-paper/25 text-paper transition-colors hover:border-red hover:bg-red"
              >
                <Icon size={17} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
        <div className="md:col-span-3">
          <p className="mb-4 text-sm font-semibold text-red">Shop</p>
          <ul className="space-y-2.5 text-sm text-paper/75">
            {GROUPS.map((g) => (
              <li key={g.key}>
                <Link to={`/shop?category=${g.key}`} className="hover:text-paper">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-sm font-semibold text-red">Help</p>
          <ul className="space-y-2.5 text-sm text-paper/75">
            <li>
              <Link to="/offers" className="hover:text-paper">Offers and Pricing</Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-paper">Cash on Delivery</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-paper">Your cart</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="mb-4 text-sm font-semibold text-red">Pay</p>
          <p className="text-sm leading-relaxed text-paper/75">Cash on Delivery to 24 cities. Free delivery.</p>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 py-6 text-xs text-paper/60 md:px-8">
          <p>© 2026 Kitabistan</p>
          <p>Prices in PKR</p>
        </div>
      </div>
    </footer>
  );
}

function ToastHost() {
  const { toast, dismissToast } = useCart();
  const navigate = useNavigate();
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 md:justify-end md:px-8">
      <div
        key={toast.id}
        role="status"
        className="pointer-events-auto flex animate-toast-in items-center gap-5 rounded-btn bg-ink py-3 pl-5 pr-3 text-sm text-paper shadow-md"
      >
        <span>{toast.message}</span>
        {toast.action && (
          <button
            className="rounded-btn px-3 py-1.5 font-semibold text-red transition-colors hover:bg-paper/10"
            onClick={() => {
              toast.action?.onClick?.();
              if (toast.action?.to) navigate(toast.action.to);
              dismissToast();
            }}
          >
            {toast.action.label}
          </button>
        )}
        <button onClick={dismissToast} aria-label="Dismiss" className="grid h-7 w-7 place-items-center rounded-btn hover:bg-paper/10">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <Header />
      <main key={pathname} className="flex-1 origin-left animate-route-in motion-reduce:animate-fade">
        <Outlet />
      </main>
      <Footer />
      <ToastHost />
    </div>
  );
}
