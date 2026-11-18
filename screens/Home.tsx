import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { BESTSELLERS, BOOKS, FEATURED, GROUPS, NEW_ARRIVALS, getBook, type GroupKey } from "../data/books";
import { formatPKR } from "../data/pricing";
import { useCart } from "../store/cart";
import BookCard from "../components/BookCard";
import Cover from "../components/Cover";
import HeroBook, { HeroBackdrop } from "../components/HeroBook";
import { Button, ButtonLink, Reveal, SectionHead, Stars } from "../components/ui";

function Hero() {
  const toCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden bg-paper">
      <HeroBackdrop />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <p className="animate-rise text-left font-urdu text-2xl leading-loose text-red motion-reduce:animate-fade" dir="rtl" lang="ur">
            کتابستان
          </p>
          <h1
            className="mt-2 animate-rise font-display text-6xl font-medium leading-[0.95] tracking-tight text-ink motion-reduce:animate-fade sm:text-7xl xl:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            Kitabistan
          </h1>
          <p
            className="mt-5 animate-rise font-display text-3xl font-light italic tracking-tight text-ink sm:text-4xl motion-reduce:animate-fade"
            style={{ animationDelay: "240ms" }}
          >
            Read More. <span className="text-red">Dream Bigger.</span>
          </p>
          <p
            className="mt-6 max-w-md animate-rise text-base leading-relaxed text-muted motion-reduce:animate-fade"
            style={{ animationDelay: "360ms" }}
          >
            Fiction, self-help, computer science, Urdu literature and kids' books, delivered free to your door. Pay in cash when they arrive.
          </p>
          <div className="mt-9 flex animate-rise flex-wrap gap-3 motion-reduce:animate-fade" style={{ animationDelay: "480ms" }}>
            <ButtonLink to="/shop" size="lg">
              Shop Now
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink to="/#categories" variant="outline" size="lg" onClick={toCategories}>
              Browse Categories
            </ButtonLink>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <HeroBook />
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduce) return setN(to);
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1800);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <div ref={ref} className="px-6 py-10 md:py-12">
      <p className="font-display text-5xl font-medium tracking-tight tabular-nums text-paper md:text-6xl">
        {n.toLocaleString("en-US")}
        <span className="text-red">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-paper/70">{label}</p>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-ink">
      <div className="mx-auto grid max-w-7xl divide-y divide-paper/15 px-5 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-8">
        <Counter to={5000} suffix="+" label="Books" />
        <Counter to={10000} suffix="+" label="Readers" />
        <Counter to={24} suffix="" label="Cities" />
      </div>
    </section>
  );
}

function Featured() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };
  return (
    <Reveal as="section" variant="flip" className="mx-auto max-w-7xl px-5 pt-24 md:px-8">
      <SectionHead
        kicker="Hand-picked this month"
        title="Featured books"
        action={
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous books"
              className="grid h-11 w-11 place-items-center rounded-btn border border-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next books"
              className="grid h-11 w-11 place-items-center rounded-btn bg-red text-paper transition-colors hover:bg-ink"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        }
      />
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] md:-mx-8 md:px-8"
      >
        {FEATURED.map((id) => (
          <div key={id} className="w-64 shrink-0 snap-start md:w-72">
            <BookCard book={getBook(id)} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function Categories() {
  const tone: Record<GroupKey, string> = {
    fiction: "bg-red text-paper",
    "self-help-business": "bg-ink text-paper",
    "cs-academic": "bg-mist text-ink",
    urdu: "bg-ink text-paper",
    kids: "bg-red text-paper",
  };
  const span: Record<GroupKey, string> = {
    fiction: "md:col-span-3 md:row-span-2",
    "self-help-business": "md:col-span-3",
    "cs-academic": "md:col-span-3",
    urdu: "md:col-span-4",
    kids: "md:col-span-2",
  };
  return (
    <section id="categories" className="scroll-mt-24 mx-auto max-w-7xl px-5 pt-28 md:px-8">
      <Reveal variant="flip">
        <SectionHead kicker="Find your shelf" title="Shop by category" />
      </Reveal>
      <div className="grid gap-4 md:grid-cols-6">
        {GROUPS.map((g, i) => {
          const books = BOOKS.filter((b) => b.group === g.key);
          return (
            <Reveal key={g.key} delay={i * 90} className={span[g.key]}>
              <Link
                to={`/shop?category=${g.key}`}
                className={`group/cat relative flex h-full min-h-56 flex-col justify-between overflow-hidden rounded-book p-7 transition-shadow duration-300 hover:shadow-lift ${tone[g.key]}`}
              >
                <div className="relative z-10 max-w-[60%]">
                  <p className={`text-sm ${g.key === "urdu" ? "font-urdu leading-loose" : ""} opacity-75`}>{g.line}</p>
                  <h3 className="mt-1 font-display text-3xl font-medium leading-tight tracking-tight">{g.name}</h3>
                </div>
                <p className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold">
                  {books.length} {books.length === 1 ? "book" : "books"}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/cat:-translate-y-0.5 group-hover/cat:translate-x-0.5" />
                </p>
                <div className="absolute -bottom-6 right-6 flex items-end">
                  {books.slice(0, 3).map((b, j) => (
                    <div
                      key={b.id}
                      className={`w-20 shadow-book transition-transform duration-500 ease-out md:w-24 ${
                        j === 0
                          ? "-rotate-6 group-hover/cat:-translate-y-3 group-hover/cat:-rotate-12"
                          : j === 1
                            ? "-ml-8 rotate-3 group-hover/cat:-translate-y-5"
                            : "-ml-8 rotate-12 group-hover/cat:-translate-y-2 group-hover/cat:rotate-[18deg]"
                      }`}
                    >
                      <Cover book={b} />
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 md:px-8">
      <Reveal variant="flip">
        <SectionHead
          kicker="Just in"
          title="New arrivals"
          action={
            <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-red">
              View all books <ArrowRight size={16} />
            </Link>
          }
        />
      </Reveal>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {NEW_ARRIVALS.map((id, i) => (
          <Reveal key={id} delay={i * 100}>
            <BookCard book={getBook(id)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LaunchBanner() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("READ15");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  return (
    <Reveal as="section" variant="flip" className="mt-28">
      <div className="relative overflow-hidden bg-red text-paper">
        <div className="pointer-events-none absolute -right-10 top-1/2 -mt-40 select-none font-display text-[20rem] font-semibold leading-none text-paper/10" aria-hidden="true">
          15%
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-display text-lg italic">Launch Offer: 15% OFF with code READ15</p>
            <p className="mt-3 font-display text-5xl font-medium tracking-tight md:text-6xl">15% off your first order</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={copy}
              className="inline-flex items-center gap-3 rounded-btn border-2 border-dashed border-paper/70 px-5 py-3.5 font-mono text-lg font-semibold tracking-widest transition-colors hover:border-paper hover:bg-paper/10"
              aria-label="Copy code READ15"
            >
              READ15
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <ButtonLink to="/shop" variant="light" size="lg">
              Shop Now
            </ButtonLink>
          </div>
        </div>
        {copied && <p className="sr-only" role="status">Code copied</p>}
      </div>
    </Reveal>
  );
}

function Bestsellers() {
  const { add, showToast } = useCart();
  const [first, ...rest] = BESTSELLERS.map(getBook);
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 md:px-8">
      <Reveal variant="flip">
        <SectionHead kicker="What readers are buying" title="Bestsellers" />
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <Link to={`/books/${first.slug}`} className="group/best grid grid-cols-5 items-end gap-8">
            <div className="col-span-2 shadow-lift transition-transform duration-500 group-hover/best:-translate-y-2 group-hover/best:-rotate-2">
              <Cover book={first} />
            </div>
            <div className="col-span-3 pb-2">
              <p className="font-display text-8xl font-light leading-none text-red">01</p>
              <h3 className="mt-4 font-display text-3xl font-medium tracking-tight group-hover/best:text-red">{first.title}</h3>
              <p className="text-muted">{first.author}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{first.short}</p>
              <div className="mt-4 flex items-center gap-4">
                <Stars rating={first.rating} />
                <span className="font-display text-xl font-semibold">{formatPKR(first.price)}</span>
              </div>
            </div>
          </Link>
        </Reveal>
        <ol className="lg:col-span-6">
          {rest.map((b, i) => (
            <Reveal as="li" key={b.id} delay={i * 110} className="border-b border-line first:border-t">
              <div className="group/row flex items-center gap-5 py-5">
                <span className="w-12 font-display text-4xl font-light text-ink/30 transition-colors group-hover/row:text-red">
                  0{i + 2}
                </span>
                <div className="w-14 shrink-0 shadow-book">
                  <Cover book={b} />
                </div>
                <div className="min-w-0 flex-1">
                  <Link to={`/books/${b.slug}`} className="font-display text-xl font-medium tracking-tight hover:text-red">
                    {b.title}
                  </Link>
                  <p className="text-sm text-muted">
                    {b.author} · {b.category}
                  </p>
                </div>
                <span className="hidden font-semibold sm:block">{formatPKR(b.price)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`Add ${b.title} to cart`}
                  onClick={() => {
                    add(b.id);
                    showToast({ message: `${b.title} added to cart`, action: { label: "View cart", to: "/cart" } });
                  }}
                >
                  Add
                </Button>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    { title: "Original books", text: "Publisher-printed copies only. No photocopies or reprints." },
    { title: "Cash on Delivery", text: "Pay the rider in cash when your books reach your door." },
    { title: "Student discount", text: "10% off academic and computer science books for students." },
    { title: "Free delivery", text: "No delivery charge on any order, in any of our 24 cities." },
  ];
  return (
    <section className="mt-28 border-y border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal variant="flip">
          <h2 className="max-w-2xl font-display text-4xl font-medium tracking-tight md:text-5xl">
            Why choose <span className="italic text-red">Kitabistan</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <p className="font-display text-sm italic text-red">No. {i + 1}</p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Sample testimonials. Replace with real customer reviews before launch. */
function Reviews() {
  const main = {
    quote:
      "Ordered Peer-e-Kamil and Clean Code on Monday and paid cash at the door. Both were original copies and packed like gifts.",
    name: "Ayesha Siddiqui",
    meta: "Lahore",
  };
  const others = [
    {
      quote: "The student discount took 10% off Database System Concepts. For a book that price, it really mattered.",
      name: "Hamza Tariq",
      meta: "Computer science student, Islamabad",
    },
    {
      quote: "Bought the Little Explorer set for my daughter. She asks for one story every night now.",
      name: "Sana Malik",
      meta: "Karachi",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 pt-28 md:px-8">
      <Reveal variant="flip">
        <SectionHead kicker="From our readers" title="Reviews" />
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <figure>
            <span className="block font-display text-8xl leading-[0.6] text-red" aria-hidden="true">
              “
            </span>
            <blockquote className="mt-4 font-display text-3xl font-light leading-snug tracking-tight md:text-4xl">
              {main.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Stars rating={5} showValue={false} />
              <span className="font-semibold">{main.name}</span>
              <span className="text-sm text-muted">{main.meta}</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="space-y-10 lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
          {others.map((r, i) => (
            <Reveal key={r.name} delay={150 + i * 120}>
              <figure>
                <Stars rating={5} showValue={false} size={12} />
                <blockquote className="mt-3 text-lg leading-relaxed text-ink-soft">{r.quote}</blockquote>
                <figcaption className="mt-3 text-sm">
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-muted"> · {r.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Enter an email like name@example.com");
      return;
    }
    setError("");
    setDone(email.trim());
  };
  return (
    <Reveal as="section" variant="flip" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
      <div className="grid items-center gap-10 rounded-book bg-mist px-8 py-14 md:px-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
            New books, <span className="italic text-red">first.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted">One email when new titles land or an offer starts. Unsubscribe any time.</p>
        </div>
        {done ? (
          <div role="status" className="animate-rise border-l-2 border-red pl-5">
            <p className="font-display text-2xl">You're subscribed</p>
            <p className="mt-1 text-sm text-muted">New arrivals will reach {done}</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <label htmlFor="nl-email" className="mb-2 block text-sm font-semibold">
              Email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? "nl-error" : undefined}
                className={`flex-1 rounded-btn border bg-paper px-4 py-3.5 outline-none transition-colors focus:border-ink ${
                  error ? "border-red" : "border-line"
                }`}
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </div>
            {error && (
              <p id="nl-error" className="mt-2 text-sm text-red">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Featured />
      <Categories />
      <NewArrivals />
      <LaunchBanner />
      <Bestsellers />
      <WhyUs />
      <Reviews />
      <Newsletter />
    </>
  );
}
