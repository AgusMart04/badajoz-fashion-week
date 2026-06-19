import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  Manifesto,
  RunwayBreaker,
  Destination,
  EventSection,
  Curaduria,
  BadajozMap,
  Sponsors,
  Future,
  Contact,
  Reveal,
} from "@/components/bfw/sections";

const description =
  "Demo conceptual de Badajoz Fashion Week: la plataforma ibérica que conecta moda, negocio y cultura entre España y Portugal. Edición 01 — Oct 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Badajoz Fashion Week — Iberian Corridor of Fashion, Business & Culture" },
      { name: "description", content: description },
      { property: "og:title", content: "Badajoz Fashion Week — Edition 01" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Badajoz Fashion Week" },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Badajoz Fashion Week",
              url: "/",
              description,
              areaServed: ["ES", "PT"],
            },
            {
              "@type": "Event",
              name: "Badajoz Fashion Week — Edition 01",
              startDate: "2026-10-01",
              endDate: "2026-10-09",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Badajoz",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Badajoz",
                  addressRegion: "Extremadura",
                  addressCountry: "ES",
                },
                geo: { "@type": "GeoCoordinates", latitude: 38.8794, longitude: -6.9707 },
              },
              description,
            },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="overflow-clip bg-background text-foreground route-enter">
      <Hero />
      <Reveal>
        <Manifesto />
      </Reveal>
      <Reveal>
        <RunwayBreaker />
      </Reveal>
      <Reveal>
        <Destination />
      </Reveal>
      <Reveal>
        <EventSection />
      </Reveal>
      <Reveal>
        <Curaduria />
      </Reveal>
      <Reveal>
        <BadajozMap />
      </Reveal>
      <Reveal>
        <Sponsors />
      </Reveal>
      <Reveal>
        <Future />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
    </main>
  );
}
