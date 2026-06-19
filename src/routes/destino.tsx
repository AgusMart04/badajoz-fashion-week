import { createFileRoute } from "@tanstack/react-router";
import { Destination, BadajozMap } from "@/components/bfw/sections";

export const Route = createFileRoute("/destino")({
  head: () => ({
    meta: [
      { title: "Destino — Badajoz Fashion Week" },
      {
        name: "description",
        content:
          "Badajoz: capital ibérica entre dos países. Patrimonio, industria conectada y mapa interactivo de la ciudad.",
      },
    ],
  }),
  component: () => (
    <main className="overflow-clip bg-background text-foreground route-enter">
      <Destination />
      <BadajozMap />
    </main>
  ),
});
