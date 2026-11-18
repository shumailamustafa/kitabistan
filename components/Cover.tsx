import type { Book, Motif } from "../data/books";

/* Typographic cover art, drawn in the Kitabistan palette. Swap for real cover photos when available. */

function MotifArt({ motif }: { motif: Motif }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motif) {
    case "sun":
      return (
        <g {...common}>
          <circle cx="50" cy="50" r="18" fill="currentColor" stroke="none" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI) / 6;
            return <line key={i} x1={50 + Math.cos(a) * 26} y1={50 + Math.sin(a) * 26} x2={50 + Math.cos(a) * 36} y2={50 + Math.sin(a) * 36} />;
          })}
          <path d="M8 86 Q30 72 50 84 T92 82" />
        </g>
      );
    case "eye":
      return (
        <g {...common}>
          <path d="M10 50 Q50 14 90 50 Q50 86 10 50 Z" />
          <circle cx="50" cy="50" r="15" fill="currentColor" stroke="none" />
          <circle cx="50" cy="50" r="5" className="fill-ink" stroke="none" />
        </g>
      );
    case "rings":
      return (
        <g {...common}>
          <circle cx="40" cy="50" r="22" />
          <circle cx="60" cy="50" r="22" />
          <path d="M50 18 l4 6 l-4 6 l-4 -6 z" fill="currentColor" />
        </g>
      );
    case "steps":
      return (
        <g fill="currentColor">
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x={12 + i * 11} y={82 - (i + 1) * 9} width="8" height={(i + 1) * 9} />
          ))}
        </g>
      );
    case "coins":
      return (
        <g {...common}>
          {[0, 1, 2, 3, 4].map((i) => (
            <ellipse key={i} cx="50" cy={74 - i * 10} rx="24" ry="7" fill={i === 4 ? "currentColor" : "none"} />
          ))}
        </g>
      );
    case "focus":
      return (
        <g {...common}>
          {[36, 27, 18, 9].map((r) => (
            <rect key={r} x={50 - r} y={50 - r} width={r * 2} height={r * 2} />
          ))}
          <rect x="46" y="46" width="8" height="8" fill="currentColor" stroke="none" />
        </g>
      );
    case "braces":
      return (
        <g {...common} strokeWidth={3}>
          <path d="M36 18 Q24 18 24 30 V42 Q24 50 16 50 Q24 50 24 58 V70 Q24 82 36 82" />
          <path d="M64 18 Q76 18 76 30 V42 Q76 50 84 50 Q76 50 76 58 V70 Q76 82 64 82" />
          <circle cx="50" cy="50" r="5" fill="currentColor" stroke="none" />
        </g>
      );
    case "snake":
      return (
        <g {...common} strokeWidth={4}>
          <path d="M14 70 Q26 40 40 60 T66 50 T86 30" />
          <circle cx="86" cy="30" r="4" fill="currentColor" stroke="none" />
        </g>
      );
    case "database":
      return (
        <g {...common}>
          <ellipse cx="50" cy="24" rx="26" ry="8" fill="currentColor" />
          <path d="M24 24 V76 Q50 92 76 76 V24" />
          <path d="M24 42 Q50 58 76 42" />
          <path d="M24 59 Q50 75 76 59" />
        </g>
      );
    case "crescent":
      return (
        <g>
          <path d="M58 16 A34 34 0 1 0 58 84 A27 27 0 1 1 58 16 Z" fill="currentColor" />
          <path d="M74 36 l3 7 l7 1 l-5 5 l1.5 7 l-6.5 -3.5 l-6.5 3.5 l1.5 -7 l-5 -5 l7 -1 z" fill="currentColor" />
        </g>
      );
    case "vulture":
      return (
        <g {...common} strokeWidth={3}>
          <path d="M8 46 Q28 30 50 50 Q72 30 92 46" />
          <path d="M20 58 Q34 48 50 62 Q66 48 80 58" />
          <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
        </g>
      );
    case "kite":
      return (
        <g {...common}>
          <path d="M50 10 L74 40 L50 70 L26 40 Z" fill="currentColor" />
          <path d="M50 70 Q58 78 50 84 Q42 90 50 96" />
          <path d="M26 40 H74 M50 10 V70" className="stroke-paper" />
        </g>
      );
  }
}

export default function Cover({ book, className = "" }: { book: Book; className?: string }) {
  const t = book.cover.theme;
  const surface =
    t === "red" ? "bg-red text-paper" : t === "black" ? "bg-ink text-paper" : "bg-paper text-ink ring-1 ring-inset ring-line";
  const art = t === "red" ? "text-ink" : "text-red";
  const rule = t === "white" ? "bg-red" : t === "red" ? "bg-paper" : "bg-red";

  return (
    <div
      className={`@container relative aspect-[2/3] w-full overflow-hidden rounded-book ${surface} ${className}`}
      role="img"
      aria-label={`${book.title} by ${book.author}`}
    >
      {/* spine shading */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[7%] bg-gradient-to-r from-ink/30 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-[7%] w-px bg-paper/15" />

      <div className="absolute inset-0 flex flex-col pl-[13%] pr-[9%] pb-[9%] pt-[10%]">
        <p className="text-[6.5cqw] font-semibold leading-tight opacity-85">{book.author}</p>
        <div className={`mt-[4cqw] h-[1.4cqw] w-[14cqw] ${rule}`} />
        <div className={`flex flex-1 items-center justify-center py-[6cqw] ${art}`}>
          <svg viewBox="0 0 100 100" className="h-auto w-[62%]" aria-hidden="true">
            <MotifArt motif={book.cover.motif} />
          </svg>
        </div>
        {book.urduTitle ? (
          <>
            <p dir="rtl" lang="ur" className="font-urdu text-[13cqw] leading-[1.9]">
              {book.urduTitle}
            </p>
            <p className="font-display text-[8cqw] italic leading-tight">{book.title}</p>
          </>
        ) : (
          <p
            className={`font-display font-semibold leading-[1.02] tracking-tight ${
              book.title.length > 18 ? "text-[11cqw]" : "text-[14cqw]"
            }`}
          >
            {book.title}
          </p>
        )}
      </div>
    </div>
  );
}
