import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-alcazaba.jpg";
import stoneImg from "@/assets/badajoz-stone.jpg";
import corridorImg from "@/assets/fashion-corridor.jpg";
import guadianaImg from "@/assets/guadiana.jpg";
import runway01 from "@/assets/runway-01.jpg";
import runway02 from "@/assets/runway-02.jpg";
import runway03 from "@/assets/runway-03.jpg";
import runway04 from "@/assets/runway-04.jpg";
import runway05 from "@/assets/runway-05.jpg";
import runway06 from "@/assets/runway-06.jpg";
import runwayBreaker from "@/assets/runway-breaker.jpg";
import background08 from "@/assets/background-08.jpg";
import logoSimple from "@/assets/logo-blanco-png.jpg";
import logoCompleto from "@/assets/logo-completo-png.jpg";

/* ============================================================
 * Shared atoms
 * ============================================================ */

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        overflow: visible ? "visible" : "hidden",
        transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ target, duration = 1500 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="label-coord">{children}</span>;
}

function SectionIndex({ n, kicker }: { n: string; kicker: string }) {
  return (
    <div className="flex items-baseline gap-4 sm:gap-6">
      <span className="label-coord text-sand">— {n}</span>
      <span className="h-px flex-1 bg-sand/25" />
      <span className="label-coord">{kicker}</span>
    </div>
  );
}

/* ============================================================
 * NAV
 * ============================================================ */

export function Nav() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const links: [string, string][] = [
    ["Manifiesto", "/manifiesto"],
    ["Destino", "/destino"],
    ["Sponsors", "/sponsors"],
    ["Contacto", "/contacto"],
  ];

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 500);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-8 lg:grid-cols-[auto_1fr_auto]">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img src={logoSimple} alt="Badajoz Fashion Week" className="h-8 w-auto" />
            <span className="truncate text-base tracking-[0.16em] sm:text-lg">
              Badajoz <span className="text-sand">/</span> Fashion Week
            </span>
          </Link>
          <nav className="hidden justify-center lg:flex">
            <ul className="flex items-center gap-10">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-mono text-stone-cream/70 transition-colors hover:text-sand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/sponsors"
              className="group hidden items-center gap-2 text-mono text-sand transition-colors hover:text-stone-cream sm:inline-flex"
            >
              <span>Sponsor</span>
              <span className="h-px w-5 bg-current transition-all group-hover:w-8" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center border hairline text-sand lg:hidden"
            >
              <span className="text-mono">≡</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className={`fixed inset-0 z-[60] bg-graphite/95 backdrop-blur-lg lg:hidden ${closing ? "slide-down" : "slide-up"}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <img src={logoSimple} alt="Badajoz Fashion Week" className="h-6 w-auto" />
            <span className="text-base tracking-[0.16em]">
              Badajoz <span className="text-sand">/</span> Fashion Week
            </span>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="grid h-10 w-10 place-items-center border hairline text-sand"
            >
              <span className="text-mono">✕</span>
            </button>
          </div>
          <nav className="flex h-[calc(100svh-72px)] flex-col justify-center px-8">
            <ul className="space-y-6">
              {links.map(([label, href], i) => (
                <li
                  key={href}
                  className="menu-item-in"
                  style={{ animationDelay: `${200 + i * 120}ms` }}
                >
                  <Link
                    to={href}
                    onClick={closeMenu}
                    className="block text-4xl font-light tracking-[0.04em] text-stone-cream sm:text-5xl"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div
              className="menu-item-in mt-12 border-t hairline pt-6 text-mono text-stone-cream/55"
              style={{ animationDelay: `${200 + links.length * 120}ms` }}
            >
              badajozfashionweek.oficial@gmail.com
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/* ============================================================
 * 01 — HERO
 * ============================================================ */

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden grain">
      <img
        src={heroImg}
        alt="Murallas monumentales de la Alcazaba de Badajoz"
        width={1920}
        height={1280}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "hero-zoom 3.5s cubic-bezier(0.16, 1, 0.3, 1) both" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/35 via-graphite/55 to-graphite" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-4 pb-20 pt-24 sm:justify-end sm:px-8 sm:pb-28 sm:pt-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <Reveal delay={150}>
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-12 bg-sand" />
                <span className="font-serif-italic text-base text-sand sm:text-lg">
                  Edición 01 — Octubre 2026
                </span>
              </div>
            </Reveal>
            <Reveal delay={350}>
              <h1 className="text-[18vw] leading-[1.02] tracking-[0.005em] sm:text-[11vw] lg:text-[9.5vw]">
                Badajoz
                <br />
                <span className="font-serif-italic text-sand">Fashion</span>{" "}
                <span className="font-serif-italic text-sand">Week</span>
              </h1>
            </Reveal>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 sm:space-x-6">
              {["Moda", "Negocio", "Cultura", "Conexión Ibérica"].map((word, i) => (
                <Reveal key={word} delay={650 + i * 100}>
                  <div className="flex items-center gap-3 sm:gap-0">
                    <span className="h-1 w-1 rounded-full bg-sand/60 sm:hidden" />
                    <span className="text-lg tracking-[0.08em] text-stone-cream/75 sm:text-xl">
                      {i > 0 && <span className="hidden sm:inline">· </span>}
                      {word}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={950}>
              <p className="hidden border-l hairline pl-5 text-sm leading-relaxed text-stone-cream/70 sm:block">
                La plataforma que conecta creatividad, industria y oportunidades entre España y
                Portugal. Una pasarela. Un mercado. Una conversación.
              </p>
            </Reveal>
            <Reveal delay={1150}>
              <div className="mt-10 flex flex-col gap-5">
                <MinimalCTA scrollTo="manifiesto">Explorar el proyecto</MinimalCTA>
                <MinimalCTA scrollTo="sponsors" muted>
                  Oportunidades sponsors
                </MinimalCTA>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function MinimalCTA({
  href,
  scrollTo,
  children,
  muted,
}: {
  href?: string;
  scrollTo?: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  const className = `group inline-flex items-center gap-4 py-2 text-mono transition-colors duration-700 ease-out ${
    muted ? "text-stone-cream/65 hover:text-sand" : "text-stone-cream hover:text-sand"
  }`;

  const arrow = (
    <>
      <span>{children}</span>
      <span className="relative inline-block h-px w-12 bg-current transition-all duration-700 ease-out group-hover:w-20">
        <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] -rotate-45 border-r border-t border-current" />
      </span>
    </>
  );

  if (scrollTo) {
    return (
      <a
        href={`#${scrollTo}`}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
        }}
        className={className}
      >
        {arrow}
      </a>
    );
  }

  return (
    <Link to={href!} className={className}>
      {arrow}
    </Link>
  );
}

/* ============================================================
 * 02 — MANIFIESTO
 * ============================================================ */

export function Manifesto() {
  return (
    <section id="manifiesto" className="relative border-t hairline bg-background py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="02" kicker="Manifiesto" />
        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-2 lg:block">
            <span className="font-serif-italic text-2xl text-sand">i.</span>
          </div>
          <div className="lg:col-span-10">
            <h2 className="text-[8vw] leading-[1.05] tracking-[0.005em] sm:text-6xl lg:text-[5.5rem]">
              Badajoz no es solo el lugar
              <br />
              donde ocurre <span className="font-serif-italic text-sand">la pasarela.</span>
            </h2>
            <div className="mt-16 grid gap-12 border-t hairline pt-12 lg:grid-cols-3">
              <p className="text-lg leading-[1.75] text-stone-cream/80">
                Badajoz es <em>parte del producto</em>. Un corredor entre dos países, una piedra que
                ya tiene mil años de marca.
              </p>
              <p className="text-lg leading-[1.75] text-stone-cream/80">
                La Fashion Week es la <em>excusa estratégica</em> para conectar diseñadores,
                empresas, instituciones y mercados.
              </p>
              <p className="text-lg leading-[1.75] text-stone-cream/80">
                Un evento que no compite con Madrid ni con Lisboa. Los <em>une</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * BREAKER — Full-bleed runway pause (entre Manifiesto y Destino)
 * ============================================================ */

export function RunwayBreaker() {
  return (
    <section
      aria-hidden="true"
      className="relative h-[80svh] w-full overflow-hidden bg-graphite duotone"
    >
      <div className="absolute -inset-[10%]">
        <img src={runwayBreaker} alt="" className="h-full w-full object-cover parallax-slow" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite/60" />
    </section>
  );
}

/* ============================================================
 * 03 — DESTINO
 * ============================================================ */

export function Destination() {
  const pillars: [string, string][] = [
    ["Capital Ibérica", "Posición geográfica equidistante entre dos capitales europeas."],
    ["Patrimonio Activo", "Murallas, Alcazaba y Plaza Alta como escenarios de pasarela."],
    ["Industria Conectada", "Hub de moda, agroalimentación premium y exportación bilateral."],
  ];
  const metrics: { label: string; value: number; suffix: string; prefix?: string; desc: string }[] =
    [
      { label: "Mercado ibérico", value: 59, suffix: " M", desc: "Población combinada ES + PT" },
      { label: "Patrimonio", value: 9, suffix: " sitios", desc: "UNESCO en el eje Mérida — Évora" },
      {
        label: "Turismo transfronterizo",
        value: 18,
        suffix: " %",
        prefix: "+",
        desc: "Visitantes 2023 → 2024",
      },
    ];
  const guestCountries = [
    {
      name: "Argentina",
      code: "ar",
      desc: "Buenos Aires como hub de diseño emergente del Cono Sur.",
    },
    {
      name: "España",
      code: "es",
      desc: "Referente europeo de moda, industria textil y comercio ibérico.",
    },
    {
      name: "Portugal",
      code: "pt",
      desc: "Manufactura de alto valor y diseño lusófono con proyección global.",
    },
    {
      name: "Paraguay",
      code: "py",
      desc: "Industria textil en crecimiento con enlace productivo ES — PT — PY.",
    },
    {
      name: "Uruguay",
      code: "uy",
      desc: "Diseño sostenible y producción artesanal con identidad rioplatense.",
    },
    {
      name: "Panamá",
      code: "pa",
      desc: "Puerta comercial de las Américas y centro de distribución regional.",
    },
    {
      name: "Brasil",
      code: "br",
      desc: "Mercado más grande de Latinoamérica. Moda, textile y retail.",
    },
    {
      name: "Bolivia",
      code: "bo",
      desc: "Textiles ancestrales y materias primas con valor cultural.",
    },
    { name: "Perú", code: "pe", desc: "Alpaca, algodón Pima y una escena de diseño en auge." },
    {
      name: "Colombia",
      code: "co",
      desc: "Hub textile de las Américas. Moda, confección y exportación.",
    },
    {
      name: "Venezuela",
      code: "ve",
      desc: "Tradición de haute couture y mercado de lujo en reconstrucción.",
    },
    {
      name: "R. D. del Congo",
      code: "cd",
      desc: "Textiles artesanales y recursos minerales de alto potencial.",
    },
    {
      name: "Italia",
      code: "it",
      desc: "Capital mundial del lujo. Alta costura, cuero y manufacturing premium.",
    },
    {
      name: "Singapur",
      code: "sg",
      desc: "Puerta financiera de Asia y plataforma de diseño contemporáneo.",
    },
    {
      name: "Kazajistán",
      code: "kz",
      desc: "Corredor euroasiático textil y mercado emergente de moda.",
    },
    {
      name: "Francia",
      code: "fr",
      desc: "París como epicentro de la moda y la industria de lujo global.",
    },
    {
      name: "Reino Unido",
      code: "gb",
      desc: "Londres: moda vanguardista, industria creativa y comercio bilateral.",
    },
    {
      name: "México",
      code: "mx",
      desc: "Industria textil masiva y escena de diseño con raíces artesanales.",
    },
    {
      name: "Hungría",
      code: "hu",
      desc: "Budapest como centro de diseño emergente de Europa Central.",
    },
    {
      name: "Indonesia",
      code: "id",
      desc: "Producción textil de escala y artesanías de alto valor.",
    },
    {
      name: "E. A. U.",
      code: "ae",
      desc: "Dubái como plataforma comercial entre Europa, Asia y África.",
    },
    {
      name: "India",
      code: "in",
      desc: "Segundo productor textil del mundo. Artesanía e industria a escala.",
    },
    {
      name: "Costa Rica",
      code: "cr",
      desc: "Moda sostenible y producción responsable en Centroamérica.",
    },
    {
      name: "Puerto Rico",
      code: "pr",
      desc: "Puente cultural y comercial entre el Caribe y el mercado americano.",
    },
    {
      name: "Serbia",
      code: "rs",
      desc: "Diseño balcánico con costos competitivos y mano de obra cualificada.",
    },
    {
      name: "Canadá",
      code: "ca",
      desc: "Vancouver como puerta del Pacífico y mercado de moda sostenible.",
    },
    {
      name: "Montenegro",
      code: "me",
      desc: "Turismo de lujo y producción artesanal del Adriático.",
    },
    {
      name: "Estados Unidos",
      code: "us",
      desc: "Mayor mercado de consumo del mundo. Moda, retail y tecnología.",
    },
  ];
  const [selectedCountry, setSelectedCountry] = useState<(typeof guestCountries)[number] | null>(
    null,
  );
  const [overlayClosing, setOverlayClosing] = useState(false);

  const openCountry = (c: (typeof guestCountries)[number]) => {
    setSelectedCountry(c);
    setOverlayClosing(false);
  };

  const closeOverlay = () => {
    setOverlayClosing(true);
    setTimeout(() => {
      setSelectedCountry(null);
      setOverlayClosing(false);
    }, 500);
  };
  return (
    <section id="destino" className="relative border-t hairline bg-graphite-soft py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="03" kicker="Destino" />
        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-6xl lg:text-7xl">
              Una ciudad
              <br />
              <span className="font-serif-italic text-sand">entre dos capitales.</span>
            </h2>
            <p className="mt-10 max-w-md text-lg leading-[1.8] text-stone-cream/75">
              Badajoz opera como pivote ibérico. Una posición que ninguna otra ciudad de su escala
              puede reclamar.
            </p>
          </div>
          <div className="lg:col-span-6 lg:pt-6">
            <div className="space-y-10 border-t hairline pt-10">
              {pillars.map(([t, d]) => (
                <div key={t} className="grid grid-cols-[auto_1fr] gap-6">
                  <span className="font-serif-italic text-xl text-sand">·</span>
                  <div>
                    <div className="text-xl tracking-[0.01em]">{t}</div>
                    <div className="mt-2 text-stone-cream/70">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t hairline pt-12 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="label-coord">{m.label}</div>
              <div className="mt-4 text-5xl tracking-[0.005em]">
                {m.prefix && <span>{m.prefix}</span>}
                <CountUp target={m.value} />
                <span>{m.suffix}</span>
              </div>
              <div className="mt-3 text-sm text-stone-cream/60">{m.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t hairline pt-12">
          <SectionIndex n="03b" kicker="Países invitados" />
          <div className="mt-10">
            <h3 className="text-4xl leading-[1.1] tracking-[0.005em] sm:text-5xl">
              La moda <span className="font-serif-italic text-sand">no tiene fronteras.</span>
            </h3>
            <p className="mt-4 max-w-md text-stone-cream/65">
              28 países conectados a la pasarela de Badajoz.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3 lg:grid-cols-7">
            {guestCountries.map((c, i) => (
              <Reveal key={c.name} delay={Math.min(i * 40, 400)} className="block w-full">
                <button
                  type="button"
                  onClick={() => openCountry(c)}
                  className="group flex w-full flex-col items-center gap-2 border border-sand/10 bg-background/30 px-2 py-3 transition-all duration-300 hover:border-sand/40 hover:bg-background/60 hover:-translate-y-0.5 sm:px-3 sm:py-4"
                >
                  <img
                    src={`https://flagcdn.com/w80/${c.code}.png`}
                    alt={`Bandera de ${c.name}`}
                    loading="lazy"
                    className="h-6 w-9 object-cover shadow-sm transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-12"
                  />
                  <span className="text-[0.65rem] leading-tight tracking-wide text-stone-cream/70 sm:text-xs">
                    {c.name}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {selectedCountry && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-graphite/80 backdrop-blur-sm px-4 transition-all duration-500 ${
            overlayClosing ? "opacity-0 backdrop-blur-0" : "opacity-100"
          }`}
          onClick={closeOverlay}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeOverlay();
          }}
          role="button"
          tabIndex={-1}
        >
          <div
            className={`relative w-full max-w-sm border border-sand/15 bg-graphite p-8 text-center transition-all duration-500 ease-out ${
              overlayClosing
                ? "scale-90 translate-y-4 opacity-0"
                : "scale-100 translate-y-0 opacity-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeOverlay}
              className="absolute right-4 top-4 text-stone-cream/50 transition-colors hover:text-stone-cream"
            >
              ✕
            </button>
            <img
              src={`https://flagcdn.com/w320/${selectedCountry.code}.png`}
              alt={`Bandera de ${selectedCountry.name}`}
              className="mx-auto h-24 w-36 object-cover shadow-lg"
            />
            <h4 className="mt-6 text-2xl tracking-[0.005em]">{selectedCountry.name}</h4>
            <p className="mt-3 text-sm leading-[1.8] text-stone-cream/70">{selectedCountry.desc}</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
 * 04 — PROGRAMA — Split sticky desktop / horizontal snap mobile
 * ============================================================ */

const AXES: { i: string; t: string; d: string; img: string }[] = [
  {
    i: "01",
    t: "Fashion Shows",
    d: "Pasarelas en escenarios patrimoniales: Alcazaba, Plaza Alta, claustros.",
    img: runway01,
  },
  {
    i: "02",
    t: "Showrooms",
    d: "Espacios curados de marcas emergentes y consolidadas ES — PT.",
    img: runway03,
  },
  {
    i: "03",
    t: "Business Meetings",
    d: "B2B agendados entre compradores, marcas e inversores.",
    img: runway02,
  },
  {
    i: "04",
    t: "International Talks",
    d: "Foros sobre internacionalización, sostenibilidad y producto.",
    img: runway04,
  },
  {
    i: "05",
    t: "Networking",
    d: "Cenas y encuentros editoriales en ubicaciones cerradas.",
    img: runway05,
  },
  {
    i: "06",
    t: "Brand Connections",
    d: "Cápsulas y colaboraciones con sello Badajoz.",
    img: runway06,
  },
];

export function EventSection() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mobileProgress, setMobileProgress] = useState(0);

  // Desktop: scroll-mapped sticky — maps scroll position to active axis
  useEffect(() => {
    const section = document.getElementById("evento");
    if (!section) return;

    const handleScroll = () => {
      if (window.innerWidth < 1024) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > 0) return;

      const scrollable = section.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const idx = Math.min(AXES.length - 1, Math.floor(progress * AXES.length));
      setActive(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile: horizontal scroll progress + active card detection
  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setMobileProgress(max > 0 ? el.scrollLeft / max : 0);

    const cardWidth = el.scrollWidth / AXES.length;
    const center = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.min(AXES.length - 1, Math.max(0, Math.floor(center / cardWidth)));
    setActive(idx);
  };

  return (
    <section id="evento" className="relative border-t hairline bg-background">
      {/* Header */}
      <div className="mx-auto max-w-[1600px] px-4 pt-28 sm:px-8 sm:pt-40">
        <SectionIndex n="04" kicker="Programa" />
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-6xl lg:col-span-7 lg:text-7xl">
            Seis ejes.
            <br />
            <span className="font-serif-italic text-sand">Una semana.</span>
          </h2>
          <p className="text-lg leading-[1.8] text-stone-cream/70 lg:col-span-5">
            La programación se organiza en módulos autónomos. Cada uno opera por sí mismo, pero suma
            a la narrativa del corredor ibérico.
          </p>
        </div>
      </div>

      {/* DESKTOP: two-column sticky layout */}
      <div className="mx-auto mt-16 hidden max-w-[1600px] px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-0">
        {/* Left column — sticky image */}
        <div className="sticky top-[10svh] h-[80svh] w-full overflow-hidden">
          {AXES.map((a, i) => (
            <img
              key={a.i}
              src={a.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out"
              style={{ opacity: active === i ? 1 : 0 }}
            />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-graphite/20" />
          {/* Progress indicator */}
          <div className="pointer-events-none absolute bottom-8 left-6 right-6 z-10">
            <div className="flex items-center justify-between">
              <span className="font-serif-italic text-sm text-stone-cream/60">
                {AXES[active].t}
              </span>
              <span className="label-coord text-sand">
                {String(active + 1).padStart(2, "0")} / {AXES.length}
              </span>
            </div>
            <div className="mt-2 h-px w-full bg-sand/15">
              <div
                className="h-px bg-sand transition-[width] duration-200 ease-out"
                style={{ width: `${((active + 1) / AXES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right column — scrolling text articles */}
        <div className="relative">
          {AXES.map((it, idx) => (
            <article
              key={it.i}
              className="flex min-h-[60svh] flex-col justify-center pl-12 transition-opacity duration-700 ease-out"
              style={{ opacity: active === idx ? 1 : 0.3 }}
            >
              <div className="flex items-baseline gap-5 border-t hairline pt-5">
                <span className="label-coord text-sand">{it.i}</span>
                <span className="h-px flex-1 bg-sand/15" />
              </div>
              <h3 className="mt-8 text-5xl leading-[1.05] tracking-[0.005em] xl:text-6xl">
                {it.t}
              </h3>
              <p className="mt-6 max-w-md text-lg leading-[1.85] text-stone-cream/75">{it.d}</p>
            </article>
          ))}
        </div>
      </div>

      {/* MOBILE: horizontal scroll-snap row */}
      <div className="mt-12 lg:hidden">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {AXES.map((it, i) => {
            const isActive = active === i;
            return (
              <article
                key={it.i}
                className={`snap-start shrink-0 basis-[78%] overflow-hidden transition-all duration-500 ease-out sm:basis-[55%] ${
                  isActive ? "scale-100 opacity-100" : "scale-[0.95] opacity-70"
                }`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <img
                    src={it.img}
                    alt={it.t}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-baseline gap-3">
                      <span className="label-coord text-sand">{it.i}</span>
                      <span className="h-px flex-1 bg-sand/15" />
                    </div>
                    <h3 className="mt-4 text-2xl leading-[1.1] tracking-[0.005em]">{it.t}</h3>
                    <p className="mt-3 text-sm leading-[1.7] text-stone-cream/70">{it.d}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {AXES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-sand" : "w-1.5 bg-sand/30"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="h-28 sm:h-40" />
    </section>
  );
}

/* ============================================================
 * 05 — CURADURÍA
 * ============================================================ */

function CuraduriaDesktopGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = [
    { src: stoneImg, title: "Materia", from: "-translate-x-[15%] opacity-0" },
    { src: corridorImg, title: "Industria", from: "translate-y-[12%] opacity-0" },
    { src: guadianaImg, title: "Territorio", from: "translate-x-[15%] opacity-0" },
  ];

  return (
    <div ref={ref} className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
      {items.map((it, i) => (
        <figure key={it.title} className="group relative overflow-hidden">
          <img
            src={it.src}
            alt={it.title}
            loading="lazy"
            className={`aspect-[4/5] w-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] ${
              visible ? "translate-x-0 translate-y-0 opacity-100" : it.from
            }`}
            style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-graphite/95 to-transparent p-6">
            <span className="font-serif-italic text-xl text-stone-cream">{it.title}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function Curaduria() {
  const blocks: [string, string, string][] = [
    [
      "Dirección artística",
      "Curaduría",
      "Una selección rigurosa de diseñadores ibéricos y firmas internacionales, con foco en autoría, materialidad y narrativa.",
    ],
    [
      "Industria textil",
      "Producto",
      "Conversación con manufactura local, ateliers y casas que sostienen el savoir-faire del corredor.",
    ],
    [
      "Cumbre de moda",
      "Negocio",
      "Encuentros privados con compradores internacionales, prensa especializada e inversión institucional.",
    ],
  ];
  return (
    <section
      id="curaduria"
      className="relative overflow-clip border-t hairline bg-graphite py-28 sm:py-40"
    >
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="05" kicker="Curaduría" />

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-7xl lg:text-[6.5rem]">
              La pasarela
              <br />
              como <span className="font-serif-italic text-sand">disciplina.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8">
            <p className="text-lg leading-[1.85] text-stone-cream/75">
              Badajoz Fashion Week no es un calendario de desfiles. Es un ejercicio editorial: una
              curaduría que articula <em>diseño, industria y mercado</em> en torno a una misma idea
              ibérica.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-x-12 gap-y-16 border-t hairline pt-16 lg:grid-cols-3">
          {blocks.map(([title, kicker, body], i) => (
            <div key={title} className={`relative ${i === 1 ? "lg:pt-12" : ""}`}>
              <div className="label-coord text-sand">— {kicker}</div>
              <h3 className="mt-6 text-3xl leading-[1.1] tracking-[0.005em] sm:text-4xl">
                {title}
              </h3>
              <p className="mt-5 max-w-sm text-stone-cream/70 leading-[1.85]">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          {/* Mobile: sticky stacking */}
          <div className="mb-32 sm:hidden">
            {[
              { src: stoneImg, title: "Materia" },
              { src: corridorImg, title: "Industria" },
              { src: guadianaImg, title: "Territorio" },
            ].map((it, i) => (
              <figure
                key={it.title}
                className="group relative overflow-hidden border-4 border-graphite shadow-lg"
                style={{
                  position: "sticky",
                  top: `${80 + i * 24}px`,
                  zIndex: i + 1,
                  marginTop: i === 0 ? 0 : "-16px",
                }}
              >
                <img
                  src={it.src}
                  alt={it.title}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-graphite/95 to-transparent p-6">
                  <span className="font-serif-italic text-xl text-stone-cream">{it.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Desktop: 3-col grid with scroll entrance */}
          <CuraduriaDesktopGrid />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 06 — BADAJOZ MAP — rich SVG, gold/sand pins (system unchanged)
 * ============================================================ */

type Pin = {
  id: string;
  x: number; // 0..1000
  y: number; // 0..625
  label: string;
  concept: string;
  color: string;
  info: string;
  mapsUrl: string;
};

const PINS: Pin[] = [
  {
    id: "p1",
    x: 320,
    y: 238,
    label: "Alcazaba",
    concept: "Historical Hub",
    color: "#E0C892",
    info: "Pasarela monumental en murallas árabes del s. IX.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8828,-6.9683",
  },
  {
    id: "p2",
    x: 410,
    y: 290,
    label: "Plaza Alta",
    concept: "Networking Point",
    color: "#E8D9B8",
    info: "Showrooms y encuentros en el corazón histórico.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8813,-6.9683",
  },
  {
    id: "p3",
    x: 580,
    y: 325,
    label: "Puentes Guadiana",
    concept: "Iberian Axis",
    color: "#C6B17A",
    info: "Eje simbólico entre las dos orillas del corredor.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8825,-6.9775",
  },
  {
    id: "p4",
    x: 470,
    y: 205,
    label: "Casco Histórico",
    concept: "Concept Store",
    color: "#D8B98A",
    info: "Cápsulas curadas en arquitectura patrimonial.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8795,-6.9725",
  },
  {
    id: "p5",
    x: 700,
    y: 250,
    label: "Recinto Ferial",
    concept: "Industry Hall",
    color: "#E0C892",
    info: "Business meetings y B2B internacional.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8745,-6.9585",
  },
  {
    id: "p6",
    x: 220,
    y: 375,
    label: "La Galera",
    concept: "Gastronomy Lab",
    color: "#E8D9B8",
    info: "Cenas editoriales y producto local premium.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8795,-6.9725",
  },
  {
    id: "p7",
    x: 800,
    y: 175,
    label: "Frontera PT",
    concept: "Iberian Gate",
    color: "#C6B17A",
    info: "Programación bilateral España — Portugal.",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=38.8735,-6.9990",
  },
];

export function BadajozMap() {
  const [active, setActive] = useState<Pin>(PINS[0]);
  const [zoomed, setZoomed] = useState<Pin | null>(null);

  const handlePinClick = (pin: Pin) => {
    setActive(pin);
    setZoomed((prev) => (prev?.id === pin.id ? null : pin));
  };

  const zoomStyle = zoomed
    ? {
        transformOrigin: `${zoomed.x / 10}% ${(zoomed.y / 625) * 100}%`,
        transform: "scale(2)",
      }
    : {};

  return (
    <section id="ciudad" className="relative border-t hairline bg-background py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="06" kicker="Ciudad" />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-6xl lg:col-span-8 lg:text-7xl">
            La ciudad
            <br />
            <span className="font-serif-italic text-sand">como pasarela.</span>
          </h2>
          <p className="text-lg leading-[1.8] text-stone-cream/70 lg:col-span-4">
            Cada localización opera como escenario, showroom o sala de reuniones. La pasarela no se
            monta — se descubre.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div
              className="relative w-full overflow-hidden border border-sand/15 bg-background blueprint-grid-fine aspect-[4/3] sm:aspect-[16/10]"
              onClick={(e) => {
                if (e.target === e.currentTarget) setZoomed(null);
              }}
            >
              <svg
                viewBox="0 0 1000 625"
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out"
                preserveAspectRatio="xMidYMid meet"
                style={zoomStyle}
              >
                {/* Guadiana — thick alpha base */}
                <path
                  d="M0,360 C160,330 290,400 470,360 C660,318 800,420 1000,380"
                  stroke="oklch(0.94 0.012 75 / 0.20)"
                  strokeWidth="40"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Guadiana — fine line */}
                <path
                  d="M0,360 C160,330 290,400 470,360 C660,318 800,420 1000,380"
                  stroke="oklch(0.74 0.045 65 / 0.55)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* Irregular city polygon */}
                <polygon
                  points="280,140 520,110 700,170 780,290 720,420 560,470 380,450 260,360 220,240"
                  fill="oklch(0.18 0.005 60 / 0.6)"
                  stroke="oklch(0.94 0.012 75 / 0.35)"
                  strokeWidth="1"
                />

                {/* Dashed topo references */}
                <g
                  stroke="oklch(0.74 0.045 65 / 0.28)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  fill="none"
                >
                  <path d="M120,80 L900,560" />
                  <path d="M100,520 L920,90" />
                  <path d="M500,40 L500,600" />
                  <path d="M40,300 L960,300" />
                </g>

                {/* Influence ellipse */}
                <ellipse
                  cx="500"
                  cy="310"
                  rx="380"
                  ry="220"
                  fill="none"
                  stroke="oklch(0.74 0.045 65 / 0.35)"
                  strokeWidth="1"
                  strokeDasharray="2 5"
                />

                {/* Pins */}
                {PINS.map((p) => {
                  const isActive = active.id === p.id;
                  return (
                    <g
                      key={p.id}
                      onMouseEnter={() => setActive(p)}
                      onClick={() => handlePinClick(p)}
                      onFocus={() => setActive(p)}
                      tabIndex={0}
                      role="button"
                      aria-label={p.label}
                      className="cursor-pointer outline-none"
                    >
                      {/* Core */}
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isActive ? 14 : 10}
                        fill={p.color}
                        stroke="oklch(0.14 0.005 60)"
                        strokeWidth="1"
                        style={{ transition: "r 600ms cubic-bezier(0.16,1,0.3,1)" }}
                      />
                      {/* Label */}
                      <text
                        x={p.x}
                        y={p.y + 32}
                        textAnchor="middle"
                        fill="oklch(0.94 0.012 75)"
                        fontFamily="Archivo, sans-serif"
                        fontWeight={300}
                        fontSize="13"
                        opacity={isActive ? 1 : 0.85}
                        style={{ transition: "opacity 500ms" }}
                      >
                        {p.label}
                      </text>
                      <text
                        x={p.x}
                        y={p.y + 48}
                        textAnchor="middle"
                        fill="oklch(0.74 0.045 65)"
                        fontFamily="Cormorant Garamond, serif"
                        fontStyle="italic"
                        fontSize="11"
                        opacity={isActive ? 1 : 0.7}
                      >
                        {p.concept}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {zoomed && (
                <button
                  onClick={() => setZoomed(null)}
                  className="absolute right-3 top-3 z-10 border hairline bg-background/80 px-3 py-1.5 text-mono text-xs text-sand backdrop-blur-sm transition-colors hover:bg-background"
                >
                  ✕ Alejar
                </button>
              )}

              <span className="absolute bottom-3 left-3 font-serif-italic text-xs text-stone-cream/50 sm:text-sm">
                Río Guadiana
              </span>
              <span className="absolute right-3 top-3 font-serif-italic text-xs text-stone-cream/50 sm:text-sm">
                Frontera Portugal ↑
              </span>
            </div>
          </div>

          {/* Info panel — system intact */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between border-t hairline pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div key={active.id} className="overlay-in" style={{ animationDuration: "700ms" }}>
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: active.color }}
                />
                <div className="mt-6 text-3xl leading-[1.1] tracking-[0.01em] sm:text-4xl">
                  {active.label.toUpperCase()}
                </div>
                <div className="mt-3 font-serif-italic text-2xl text-sand">{active.concept}</div>
                <p className="mt-6 break-words text-stone-cream/70 leading-[1.85]">{active.info}</p>
                <a
                  href={active.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-3 text-mono text-sand transition-colors hover:text-stone-cream"
                >
                  <span>Ver ubicación</span>
                  <span className="relative inline-block h-px w-5 bg-current transition-all duration-300 group-hover:w-8">
                    <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] -rotate-45 border-r border-t border-current" />
                  </span>
                </a>
              </div>

              <div className="mt-10 space-y-3 border-t hairline pt-6">
                {PINS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handlePinClick(p)}
                    onMouseEnter={() => setActive(p)}
                    className={`flex w-full min-w-0 items-center gap-3 text-left text-mono transition-colors duration-500 ${
                      active.id === p.id
                        ? "text-sand"
                        : "text-stone-cream/55 hover:text-stone-cream"
                    }`}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 07 — SPONSORS
 * ============================================================ */

export function Sponsors() {
  const tiers = [
    {
      tier: "Title Sponsor",
      n: "01",
      slots: "1 disponible",
      bullets: [
        "Naming exclusivo: presented by",
        "Visibilidad nacional e internacional",
        "Espacio editorial propio en campaña",
        "Acceso institucional preferente ES — PT",
      ],
      cta: "Solicitar dossier",
      featured: true,
    },
    {
      tier: "Strategic Partner",
      n: "02",
      slots: "3 disponibles",
      bullets: [
        "Branding en escenarios clave",
        "Networking de industria",
        "Programa B2B exclusivo",
        "Acceso a editoriales",
      ],
      cta: "Reservar tier",
    },
    {
      tier: "Institutional Partner",
      n: "03",
      slots: "Abierto",
      bullets: [
        "Cobertura institucional regional",
        "Programa cultural compartido",
        "Alianza ES — PT",
        "Sello oficial",
      ],
      cta: "Aplicar",
    },
    {
      tier: "Media Partner",
      n: "04",
      slots: "Selección curada",
      bullets: [
        "Acceso editorial premium",
        "Co-branding en piezas oficiales",
        "Newsroom dedicada",
        "Distribución ibérica",
      ],
      cta: "Aplicar",
    },
  ];

  return (
    <section id="sponsors" className="relative border-t hairline bg-graphite-soft py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="07" kicker="Sponsors" />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-7xl lg:col-span-8 lg:text-8xl">
            Un club de
            <br />
            <span className="font-serif-italic text-sand">oportunidades</span> ibéricas.
          </h2>
          <p className="text-lg leading-[1.8] text-stone-cream/70 lg:col-span-4">
            No vendemos espacio publicitario. Construimos una posición de marca con peso
            institucional, visibilidad transfronteriza y networking real.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px bg-sand/15 lg:grid-cols-4">
          {tiers.map((t) => (
            <article
              key={t.tier}
              className={`flex flex-col justify-between p-8 transition-colors duration-500 ${
                t.featured ? "bg-stone-cream text-graphite" : "bg-graphite hover:bg-graphite-soft"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-mono ${t.featured ? "text-graphite/60" : "text-sand"}`}>
                    {t.n}
                  </span>
                  <span
                    className={`text-mono ${t.featured ? "text-graphite/60" : "text-stone-cream/50"}`}
                  >
                    {t.slots}
                  </span>
                </div>
                <h3
                  className={`mt-8 text-3xl tracking-[0.005em] ${t.featured ? "text-graphite" : ""}`}
                >
                  {t.tier}
                </h3>
                <ul
                  className={`mt-8 space-y-4 border-t pt-6 ${t.featured ? "border-graphite/15" : "hairline"}`}
                >
                  {t.bullets.map((b) => (
                    <li
                      key={b}
                      className={`flex gap-3 text-sm leading-[1.7] ${t.featured ? "text-graphite/80" : "text-stone-cream/75"}`}
                    >
                      <span className={t.featured ? "text-graphite" : "text-sand"}>·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/contacto"
                className={`group mt-10 inline-flex items-center gap-3 text-mono transition-colors duration-700 ${
                  t.featured
                    ? "text-graphite hover:text-graphite/60"
                    : "text-sand hover:text-stone-cream"
                }`}
              >
                <span>{t.cta}</span>
                <span className="h-px w-8 bg-current transition-all duration-700 group-hover:w-14" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 08 — VISIÓN DE FUTURO / INTERNACIONAL — runway bg + grain
 * ============================================================ */

export function Future() {
  return (
    <section className="relative overflow-hidden border-t hairline bg-background py-28 sm:py-40 grain">
      <img
        src={background08}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover duotone opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-transparent to-graphite/90" />
      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="08" kicker="Internacional" />
        <h2 className="mt-12 font-serif-italic text-3xl text-sand sm:text-4xl">
          Hoja de ruta ibérica
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-[1.85] text-stone-cream/85">
          La hoja de ruta apunta a una plataforma anual ibérica de moda, turismo cultural y negocio
          transfronterizo, con sede permanente en Badajoz y programación distribuida en Mérida,
          Évora y Lisboa.
        </p>
        <div className="mt-16">
          {[
            ["2026", "Edición inaugural — Badajoz"],
            ["2027", "Programación pública — Edición 02"],
            ["2028", "Expansión PT — sede satélite Évora"],
            ["2030", "Plataforma anual ibérica consolidada"],
          ].map(([y, d]) => (
            <div key={y} className="grid grid-cols-[100px_1fr] gap-8 border-t hairline py-6">
              <span className="text-mono text-sand">{y}</span>
              <span className="text-lg leading-[1.7] text-stone-cream/80">{d}</span>
            </div>
          ))}
        </div>
        <p className="mt-16 text-mono text-stone-cream/45">
          Madrid · Badajoz · Mérida · Évora · Lisboa
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * 09 — CONTACTO
 * ============================================================ */

export function Contact() {
  const [purpose, setPurpose] = useState("Quiero patrocinar");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: "", org: "", email: "", city: "", msg: "" });
  const purposes = ["Quiero patrocinar", "Quiero participar", "Institución", "Prensa"];

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field])
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.email.trim()) e.email = "El email es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email no válido.";
    if (!form.msg.trim()) e.msg = "El mensaje es obligatorio.";
    return e;
  };

  return (
    <section id="contacto" className="relative border-t hairline bg-graphite-soft py-28 sm:py-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <SectionIndex n="09" kicker="Contacto" />
        <div className="mt-20 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-5xl leading-[1.05] tracking-[0.005em] sm:text-6xl lg:text-7xl">
              Formar parte
              <br />
              del <span className="font-serif-italic text-sand">proyecto.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-[1.85] text-stone-cream/75">
              Una conversación, un dossier, una alianza. Las plazas estratégicas son limitadas por
              diseño.
            </p>
            <div className="mt-12 space-y-6 border-t hairline pt-8">
              <div className="min-w-0">
                <Kicker>Email institucional</Kicker>
                <a
                  href="mailto:badajozfashionweek.oficial@gmail.com"
                  className="mt-3 block break-all text-xl tracking-[0.01em] text-stone-cream transition-colors hover:text-sand sm:text-2xl"
                >
              badajozfashionweek.oficial@gmail.com
                </a>
              </div>
              <div>
                <Kicker>Sede</Kicker>
                <div className="mt-3 text-stone-cream/80">Badajoz, Extremadura · ES</div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <form
              className={`grid gap-6 transition-all duration-700 ease-out ${
                submitted ? "pointer-events-none opacity-0 translate-y-2" : "opacity-100"
              }`}
              onSubmit={(e) => {
                e.preventDefault();
                const v = validate();
                if (Object.keys(v).length > 0) {
                  setErrors(v);
                  return;
                }
                setSubmitted(true);
              }}
              aria-hidden={submitted}
            >
              <div>
                <Kicker>Propósito</Kicker>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {purposes.map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPurpose(p)}
                      className={`border hairline px-3 py-3 text-mono transition-colors duration-500 ${
                        purpose === p
                          ? "bg-sand text-graphite"
                          : "text-stone-cream/70 hover:bg-graphite"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Nombre"
                  id="name"
                  placeholder="Tu nombre completo"
                  required
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                />
                <Field
                  label="Organización"
                  id="org"
                  placeholder="Marca · Institución · Medio"
                  value={form.org}
                  onChange={(v) => update("org", v)}
                />
                <Field
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="tucorreo@dominio.com"
                  required
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                />
                <Field
                  label="Ciudad / País"
                  id="city"
                  placeholder="Madrid, ES · Lisboa, PT"
                  value={form.city}
                  onChange={(v) => update("city", v)}
                />
              </div>
              <div>
                <label className="label-coord" htmlFor="msg">
                  Mensaje
                </label>
                <textarea
                  id="msg"
                  rows={5}
                  placeholder="Cuéntanos qué buscas en esta conversación."
                  value={form.msg}
                  onChange={(e) => update("msg", e.target.value)}
                  className={`mt-3 w-full border-b bg-transparent p-3 leading-[1.7] text-stone-cream placeholder:text-stone-cream/35 focus:outline-none ${errors.msg ? "border-red-500 focus:border-red-500" : "hairline focus:border-sand"}`}
                />
                {errors.msg && <p className="mt-1 text-xs text-red-400">{errors.msg}</p>}
              </div>
              <button
                type="submit"
                className="group mt-4 inline-flex items-center gap-4 self-start py-3 text-mono text-stone-cream transition-colors duration-700 ease-out hover:text-sand"
              >
                <span>Enviar solicitud</span>
                <span className="relative inline-block h-px w-12 bg-current transition-all duration-700 ease-out group-hover:w-24">
                  <span className="absolute -right-1 -top-[3px] h-[7px] w-[7px] -rotate-45 border-r border-t border-current" />
                </span>
              </button>
            </form>

            {submitted && (
              <div
                className="absolute inset-0 flex items-center overlay-in"
                style={{ animationDelay: "200ms", animationDuration: "900ms" }}
              >
                <div className="w-full border-y hairline py-16 text-center">
                  <div className="label-coord text-sand">Confirmación</div>
                  <h3 className="mt-6 text-4xl leading-[1.1] tracking-[0.02em] sm:text-5xl">
                    Solicitud <span className="font-serif-italic text-sand">procesada.</span>
                  </h3>
                  <p className="mx-auto mt-8 max-w-md text-stone-cream/75 leading-[1.9]">
                    La Dirección Creativa evaluará sus credenciales institucionales. Nos pondremos
                    en contacto a la brevedad a través de los canales oficiales.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  error?: string;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="label-coord">
        {label} {required && <span className="text-sand">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`mt-3 w-full border-b bg-transparent py-3 text-stone-cream placeholder:text-stone-cream/35 focus:outline-none ${error ? "border-red-500 focus:border-red-500" : "hairline focus:border-sand"}`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ============================================================
 * FOOTER
 * ============================================================ */

export function Footer() {
  return (
    <footer className="border-t hairline bg-background">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-20 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img src={logoCompleto} alt="Badajoz Fashion Week" className="h-12 w-auto" />
          <p className="mt-5 max-w-sm leading-[1.85] text-stone-cream/65">
            Plataforma ibérica de moda, negocio y cultura.
            <br />
            <span className="font-serif-italic text-sand">Edición 01 — Octubre 2026.</span>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-3">
          <FooterCol
            title="Proyecto"
            links={[
              ["Manifiesto", "/manifiesto"],
              ["Destino", "/destino"],
              ["Sponsors", "/sponsors"],
            ]}
          />
          <FooterCol
            title="Contacto"
            links={[
              ["Institucional", "/contacto"],
              ["Prensa", "/contacto"],
              ["Patrocinio", "/sponsors"],
            ]}
          />
        </div>
        <div className="lg:col-span-2">
          <Kicker>© 2026</Kicker>
          <p className="mt-3 text-mono text-stone-cream/45">
            Badajoz Fashion Week.
            <br />
            All rights reserved.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="https://www.instagram.com/badajozfashionweek/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-sand/20 px-4 py-3 transition-all duration-300 hover:border-sand/50 hover:bg-sand/10"
            >
              <svg className="h-5 w-5 fill-stone-cream/70 transition-colors group-hover:fill-sand" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-mono text-xs tracking-wider text-stone-cream/80 transition-colors group-hover:text-sand">Instagram</span>
            </a>
            <a
              href="https://www.tiktok.com/@badajozfashionweek"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 border border-sand/20 px-4 py-3 transition-all duration-300 hover:border-sand/50 hover:bg-sand/10"
            >
              <svg className="h-5 w-5 fill-stone-cream/70 transition-colors group-hover:fill-sand" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 005.58 2.17v-3.4a4.85 4.85 0 01-3.77-1.57z" />
              </svg>
              <span className="text-mono text-xs tracking-wider text-stone-cream/80 transition-colors group-hover:text-sand">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="min-w-0">
      <div className="text-mono text-xs text-sand">{title}</div>
      <ul className="mt-5 space-y-3">
        {links.map(([l, h]) => (
          <li key={l + h}>
            <Link
              to={h}
              className="block truncate text-stone-cream/70 transition-colors hover:text-sand"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
