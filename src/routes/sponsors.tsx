import { createFileRoute } from "@tanstack/react-router";
import { Sponsors } from "@/components/bfw/sections";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — Badajoz Fashion Week" },
      { name: "description", content: "Un club de oportunidades ibéricas. No vendemos espacio publicitario. Construimos una posición de marca con peso institucional." },
    ],
  }),
  component: () => (
    <main className="overflow-clip bg-background text-foreground route-enter">
      <Sponsors />
    </main>
  ),
});
