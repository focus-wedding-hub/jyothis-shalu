import { createFileRoute } from "@tanstack/react-router";
import coupleWatercolor from "@/assets/couple-watercolor.png.asset.json";
import { WeddingSite } from "@/components/WeddingSite";

export const Route = createFileRoute("/engagement")({
  head: () => ({
    meta: [
      { title: "Jyothis & Shalu — Engagement Invitation" },
      { name: "description", content: "Join us for the engagement of Jyothis Koshy Thomas & Shalu Varghese on 15th August at St. Stephen's Church Auditorium, Kattanam." },
      { property: "og:title", content: "Engagement · Jyothis & Shalu — 15 August" },
      { property: "og:description", content: "Engagement · 15 August · St. Stephen's Church Auditorium, Kattanam" },
      { property: "og:image", content: coupleWatercolor.url },
    ],
  }),
  component: () => <WeddingSite variant="engagement" />,
});