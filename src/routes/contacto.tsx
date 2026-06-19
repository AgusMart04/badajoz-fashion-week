import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/bfw/sections";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Badajoz Fashion Week" },
      {
        name: "description",
        content:
          "Formar parte del proyecto. Una conversación, un dossier, una alianza. Las plazas estratégicas son limitadas por diseño.",
      },
    ],
  }),
  component: () => (
    <main className="overflow-clip bg-background text-foreground route-enter">
      <Contact />
    </main>
  ),
});
