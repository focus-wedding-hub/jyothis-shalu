import { createFileRoute } from "@tanstack/react-router";
import coupleTraditional from "@/assets/couple-traditional.png.asset.json";
import { WeddingSite } from "@/components/WeddingSite";

export const Route = createFileRoute("/wedding")({
  head: () => ({
    meta: [
      { title: "Jyothis weds Shalu — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of Jyothis Koshy Thomas & Shalu Varghese on 24th August at St. Mary's Orthodox Church, Mulakuzha." },
      { property: "og:title", content: "Jyothis weds Shalu — 24 August" },
      { property: "og:description", content: "Wedding · 24 August · 11:00 AM · St. Mary's Orthodox Church, Mulakuzha" },
      { property: "og:image", content: coupleTraditional.url },
    ],
  }),
  component: () => <WeddingSite variant="wedding" />,
});