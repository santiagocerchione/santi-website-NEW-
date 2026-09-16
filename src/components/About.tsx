import Gallery from "./Gallery";

export default function About() {
  return (
    <section className="min-h-screen lg:h-screen px-4 lg:px-6 pt-8 pb-8 flex flex-col gap-8 lg:gap-0 lg:justify-between">
      {/* Top — Text */}
      <div className="lg:flex lg:justify-between">
        {/* Left — Heading + paragraph */}
        <div className="max-w-md">
          <h2 className="text-3xl lg:text-4xl font-medium uppercase leading-[1.1] tracking-tight text-foreground">
            ABOUT
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
            Santiago started on stage early, debuting as lead guitarist in
            Andrew Lloyd Webber&apos;s School of Rock on the West End, playing
            Zack Mooneyham for eighteen months. From there, things kept
            moving: ITV&apos;s Saturday Night Takeaway, a set in front of
            15,000 at Live at Chelsea, and shows scattered across London and
            Europe.
          </p>

          {/* Upcoming Events (desktop only) */}
          <div className="hidden lg:block mt-6">
            <h3 className="text-xl lg:text-2xl font-medium uppercase leading-[1.1] tracking-tight text-foreground">
              Upcoming Events
            </h3>
            <div className="mt-2 flex flex-col gap-3 text-xs font-medium uppercase tracking-widest leading-relaxed text-foreground-secondary">
              <a href="#" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
                10 October: Something Blue at SoHo Live, New York
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
                6 November: Something Blue at Arlene&apos;s Grocery, New York
              </a>
            </div>
          </div>
        </div>

        {/* Right — Paragraph (desktop only) */}
        <div className="hidden lg:block max-w-md text-right">
          <p className="text-base leading-relaxed text-foreground-secondary">
            Now based in Philadelphia, he splits time between BlueShade, a
            live band playing venues across New York and Philly, and his own
            solo work layering live guitar over electronic production. In 2024
            he co-founded Knossos Music. The label exists for the stuff that
            doesn&apos;t fit anywhere else.
          </p>
        </div>

        {/* Mobile-only — second paragraph */}
        <p className="lg:hidden mt-3 text-base leading-relaxed text-foreground-secondary max-w-md">
          Now based in Philadelphia, he splits time between BlueShade, a
          live band playing venues across New York and Philly, and his own
          solo work layering live guitar over electronic production. In 2024
          he co-founded Knossos Music. The label exists for the stuff that
          doesn&apos;t fit anywhere else.
        </p>

        {/* Upcoming Events (mobile only) */}
        <div className="lg:hidden mt-6">
          <h3 className="text-xl font-medium uppercase leading-[1.1] tracking-tight text-foreground">
            Upcoming Events
          </h3>
          <div className="mt-2 flex flex-col gap-3 text-xs font-medium uppercase tracking-widest leading-relaxed text-foreground-secondary">
            <a href="#" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
              10 October: Something Blue at SoHo Live, New York
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">
              6 November: Something Blue at Arlene&apos;s Grocery, New York
            </a>
          </div>
        </div>
      </div>

      {/* Center — Image carousel */}
      <div className="mt-6 lg:mt-0">
        <Gallery />
      </div>

      {/* Bottom — Stats */}
      <div className="flex flex-col gap-3 mt-auto lg:mt-0 lg:flex-row lg:justify-between lg:items-end">
        <div className="flex items-baseline justify-between lg:block">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            7+
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary whitespace-nowrap">
            Countries
          </p>
        </div>
        <div className="flex items-baseline justify-between lg:block lg:text-center">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            200+
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary">
            Shows played
          </p>
        </div>
        <div className="flex items-baseline justify-between lg:block lg:text-right">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            8 Years
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary">
            Years active
          </p>
        </div>
      </div>
    </section>
  );
}
