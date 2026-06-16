import { createFileRoute } from "@tanstack/react-router";
import coupleIllustration from "@/assets/couple-illustration.png.asset.json";
import { WeddingSite } from "@/components/WeddingSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jyothis & Shalu — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of Jyothis Koshy Thomas & Shalu Varghese on 24th August at St. Mary's Orthodox Church, Mulakuzha." },
      { property: "og:title", content: "Jyothis weds Shalu — 24 August" },
      { property: "og:description", content: "Wedding · Monday, 24 August · 11:00 AM onwards · St. Mary's Orthodox Church, Mulakuzha" },
      { property: "og:image", content: coupleIllustration.url },
    ],
  }),
  component: () => <WeddingSite variant="wedding" />,
});
