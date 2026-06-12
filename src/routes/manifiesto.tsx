import { createFileRoute } from "@tanstack/react-router";
import { Manifesto, EventSection, Curaduria } from "@/components/bfw/sections";

export const Route = createFileRoute("/manifiesto")({
  head: () => ({
    meta: [
      { title: "Manifiesto — Badajoz Fashion Week" },
      { name: "description", content: "Filosofía, programa y curaduría de Badajoz Fashion Week. Seis ejes. Una semana. Fashion Shows, Showrooms, Business Meetings, International Talks, Networking, Brand Connections." },
    ],
  }),
  component: () => (
    <main className="overflow-clip bg-background text-foreground route-enter">
      <Manifesto />
      <EventSection />
      <Curaduria />
    </main>
  ),
});
