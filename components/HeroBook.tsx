/* Decorative hero: an open 3D book flipping pages in a loop, with floating books and drifting pages. */

function PageLines({ dropCap = false, mirrored = false }: { dropCap?: boolean; mirrored?: boolean }) {
  const widths = ["w-full", "w-11/12", "w-full", "w-10/12", "w-full", "w-9/12", "w-full", "w-11/12", "w-8/12", "w-full", "w-10/12", "w-7/12"];
  return (
    <div className={`flex h-full flex-col gap-[7px] px-[12%] py-[13%] ${mirrored ? "items-end" : ""}`}>
      {dropCap && (
        <div className="mb-1 flex items-end gap-2">
          <span className="font-display text-4xl font-semibold leading-none text-red">K</span>
          <span className="mb-1 h-[3px] w-1/2 rounded-full bg-ink/70" />
        </div>
      )}
      {widths.map((w, i) => (
        <span key={i} className={`h-[3px] rounded-full bg-ink/15 ${w}`} />
      ))}
      <span className="mt-auto self-center font-display text-[10px] italic text-ink/40">{mirrored ? "24" : "25"}</span>
    </div>
  );
}

function FloatingBook({
  className,
  tone,
  duration,
  delay,
  tilt,
}: {
  className: string;
  tone: "red" | "black" | "white";
  duration: number;
  delay: number;
  tilt: number;
}) {
  const color = tone === "red" ? "bg-red" : tone === "black" ? "bg-ink" : "bg-paper ring-1 ring-ink/15";
  const band = tone === "red" ? "bg-ink" : "bg-red";
  return (
    <div
      className={`absolute animate-float motion-reduce:animate-none ${className}`}
      style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div className={`relative h-full w-full rounded-book shadow-book ${color}`} style={{ rotate: `${tilt}deg` }}>
        <span className="absolute inset-y-0 left-0 w-[10%] bg-ink/25" />
        <span className={`absolute left-[22%] right-[14%] top-[18%] h-[6%] ${band}`} />
        <span className={`absolute left-[22%] right-[30%] top-[30%] h-[3%] ${band} opacity-60`} />
      </div>
    </div>
  );
}

const DRIFT = [
  { top: "12%", d: 22, delay: -2, w: 44 },
  { top: "34%", d: 27, delay: -14, w: 34 },
  { top: "58%", d: 19, delay: -7, w: 52 },
  { top: "76%", d: 31, delay: -20, w: 38 },
  { top: "88%", d: 24, delay: -11, w: 30 },
];

export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DRIFT.map((p, i) => (
        <div
          key={i}
          className="absolute left-0 animate-drift motion-reduce:hidden"
          style={{ top: p.top, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }}
        >
          <div
            className="rounded-[2px] border border-ink/15 bg-paper shadow-book"
            style={{ width: p.w, height: Math.round(p.w * 1.3) }}
          >
            <div className="mx-[18%] mt-[22%] h-[2px] bg-ink/20" />
            <div className="mx-[18%] mt-[10%] h-[2px] bg-red/40" />
            <div className="mx-[18%] mt-[10%] h-[2px] bg-ink/20" />
          </div>
        </div>
      ))}
      <FloatingBook className="left-[4%] top-[14%] h-28 w-20" tone="black" duration={8} delay={0} tilt={-14} />
      <FloatingBook className="left-[38%] top-[6%] h-20 w-14" tone="red" duration={6.5} delay={-2} tilt={12} />
      <FloatingBook className="bottom-[3%] left-[1%] h-20 w-14" tone="red" duration={7.5} delay={-4} tilt={18} />
      <FloatingBook className="bottom-[8%] left-[46%] h-16 w-12" tone="white" duration={9} delay={-1} tilt={-8} />
      <FloatingBook className="right-[4%] top-[10%] h-24 w-16" tone="white" duration={7} delay={-3} tilt={10} />
      <FloatingBook className="bottom-[12%] right-[6%] h-32 w-24" tone="black" duration={8.5} delay={-5} tilt={-12} />
    </div>
  );
}

export default function HeroBook() {
  const flippers = [0, 1, 2, 3];
  return (
    <div className="relative mx-auto aspect-[3/2] w-full max-w-[600px] perspective-[1800px]" aria-hidden="true">
      <div className="absolute inset-0 animate-float motion-reduce:animate-none" style={{ animationDuration: "9s" }}>
        <div
          className="relative h-full w-full transform-3d"
          style={{ transform: "rotateX(30deg) rotateZ(-7deg)" }}
        >
          {/* hard cover */}
          <div className="absolute -inset-[3%] rounded-[6px] bg-ink shadow-lift" style={{ transform: "translateZ(-6px)" }} />
          <div className="absolute -inset-y-[3%] left-1/2 -ml-[6px] w-[12px] bg-red" style={{ transform: "translateZ(-5px)" }} />

          {/* static spreads */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-[3px] bg-paper"
            style={{ transform: "translateZ(-2px)" }}
          >
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-ink/15 to-transparent" />
            <PageLines dropCap mirrored />
          </div>
          <div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-r-[3px] bg-paper"
            style={{ transform: "translateZ(-2px)" }}
          >
            <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-ink/15 to-transparent" />
            <PageLines />
          </div>

          {/* flipping pages */}
          {flippers.map((i) => (
            <div
              key={i}
              className="absolute inset-y-0 left-1/2 w-1/2 origin-left animate-flip-page transform-3d motion-reduce:hidden"
              style={{ animationDelay: `${-i * 1.5}s` }}
            >
              <div className="absolute inset-0 overflow-hidden rounded-r-[3px] bg-paper backface-hidden">
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ink/10 to-transparent" />
                <PageLines dropCap={i % 2 === 0} />
              </div>
              <div
                className="absolute inset-0 overflow-hidden rounded-l-[3px] bg-paper backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ink/10 to-transparent" />
                <PageLines mirrored />
              </div>
            </div>
          ))}

          {/* ribbon marker */}
          <div className="absolute -bottom-[14%] left-1/2 ml-[10px] h-[18%] w-[10px] bg-red" style={{ transform: "translateZ(1px)" }} />
        </div>
      </div>
      {/* ground shadow */}
      <div className="absolute -bottom-[6%] left-[12%] right-[12%] h-[10%] rounded-full bg-ink/15 blur-2xl" />
    </div>
  );
}
