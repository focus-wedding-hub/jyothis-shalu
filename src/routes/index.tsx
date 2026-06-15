import { createFileRoute } from "@tanstack/react-router";
import coupleIllustration from "@/assets/couple-illustration.png.asset.json";
import { WeddingSite } from "@/components/WeddingSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jyothis & Shalu — Wedding Invitation" },
      { name: "description", content: "Celebrate the engagement and wedding of Jyothis Koshy Thomas & Shalu Varghese." },
      { property: "og:title", content: "Jyothis weds Shalu" },
      { property: "og:description", content: "Engagement 15 August · Wedding 24 August" },
      { property: "og:image", content: coupleIllustration.url },
    ],
  }),
  component: () => <WeddingSite variant="both" />,
});
