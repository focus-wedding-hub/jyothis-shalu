import { useEffect, useMemo, useRef, useState } from "react";
import coupleIllustration from "@/assets/couple-illustration.png.asset.json";
import groomImg from "@/assets/groom.png.asset.json";
import brideImg from "@/assets/bride-new.png.asset.json";
import coupleWatercolor from "@/assets/couple-watercolor.png.asset.json";
import coupleTraditional from "@/assets/couple-traditional.png.asset.json";
import focusLogo from "@/assets/focus-media-logo.png.asset.json";
import musicAsset from "@/assets/love-me-like-you-do.mp3.asset.json";

const MUSIC_URL = musicAsset.url;

const ENGAGEMENT_DATE = new Date("2026-08-15T10:00:00+05:30");
const WEDDING_DATE = new Date("2026-08-24T11:00:00+05:30");

export type WeddingVariant = "both" | "engagement" | "wedding";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        size: 8 + Math.random() * 14,
        hue: Math.random() > 0.5 ? 130 : 150,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: `radial-gradient(circle at 30% 30%, oklch(0.92 0.07 ${p.hue}), oklch(0.72 0.13 ${p.hue}))`,
          }}
        />
      ))}
    </div>
  );
}

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
        <path d="M10 190 C 40 140, 70 120, 120 100" />
        <path d="M10 190 C 50 170, 90 160, 140 150" />
        <path d="M10 190 C 30 130, 50 80, 70 30" />
      </g>
      <g fill="currentColor" opacity="0.7">
        <circle cx="120" cy="100" r="6" />
        <circle cx="115" cy="92" r="4" />
        <circle cx="128" cy="95" r="4" />
        <circle cx="140" cy="150" r="5" />
        <circle cx="70" cy="30" r="5" />
        <circle cx="62" cy="40" r="3.5" />
        <circle cx="80" cy="38" r="3.5" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.4">
        <path d="M50 190 L 60 170" />
        <path d="M90 180 L 100 160" />
      </g>
    </svg>
  );
}

function Countdown({ target }: { target: Date }) {
  const { days, hours, minutes, seconds } = useCountdown(target);
  const items = [
    { v: days, l: "Days" },
    { v: hours, l: "Hours" },
    { v: minutes, l: "Minutes" },
    { v: seconds, l: "Seconds" },
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {items.map((it) => (
        <div
          key={it.l}
          className="min-w-[68px] sm:min-w-[88px] rounded-xl bg-card/70 backdrop-blur border border-border/60 px-3 py-3 sm:py-4 shadow-sm"
        >
          <div className="font-display text-2xl sm:text-4xl font-medium text-primary">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}

function EventCard({
  title,
  date,
  dateLabel,
  venue,
  address,
  mapQuery,
}: {
  title: string;
  date: Date;
  dateLabel: string;
  venue: string;
  address?: string;
  mapQuery: string;
}) {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  return (
    <div className="relative rounded-2xl bg-card/80 backdrop-blur border border-border/70 p-6 sm:p-8 card-shimmer">
      <div className="text-center">
        <div className="font-script text-3xl sm:text-4xl text-primary">{title}</div>
        <div className="mt-2 h-px w-16 mx-auto bg-primary/30" />
        <div className="mt-4 font-display text-xl sm:text-2xl">{dateLabel}</div>
        <div className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Venue</div>
        <div className="mt-1 font-display text-lg sm:text-xl">{venue}</div>
        {address && <div className="text-sm text-muted-foreground mt-1">{address}</div>}
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-[0.18em] hover:opacity-90 transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s-7-7.58-7-12a7 7 0 1 1 14 0c0 4.42-7 12-7 12Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          View Location
        </a>
      </div>
      <div className="mt-6">
        <Countdown target={date} />
      </div>
    </div>
  );
}

export function WeddingSite({ variant }: { variant: WeddingVariant }) {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const openInvitation = () => {
    setOpened(true);
    setTimeout(() => {
      const a = audioRef.current;
      if (a) {
        a.volume = 0.4;
        a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    }, 600);
  };

  const toggleMusic = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <audio ref={audioRef} src={MUSIC_URL} loop preload="none" />
      {!opened ? (
        <EnvelopeScreen onOpen={openInvitation} />
      ) : (
        <>
          <Petals />
          <button
            onClick={toggleMusic}
            aria-label="Toggle music"
            className="fixed top-4 right-4 z-50 w-11 h-11 rounded-full bg-card/80 backdrop-blur border border-border shadow-md flex items-center justify-center hover:scale-105 transition"
          >
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M19 5a9 9 0 0 1 0 14" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <line x1="22" y1="9" x2="16" y2="15" />
                <line x1="16" y1="9" x2="22" y2="15" />
              </svg>
            )}
          </button>
          <Site variant={variant} />
        </>
      )}
    </div>
  );
}

function EnvelopeScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-[oklch(0.97_0.02_145)] via-background to-[oklch(0.94_0.03_100)]">
      <FloralCorner className="absolute top-0 left-0 w-40 sm:w-64 text-primary/60" />
      <FloralCorner className="absolute bottom-0 right-0 w-40 sm:w-64 text-primary/60 rotate-180" />
      <div className="relative max-w-md w-full text-center fade-up">
        <div className="text-xs tracking-[0.4em] uppercase text-muted-foreground">Wedding Invitation</div>
        <div className="font-script text-5xl sm:text-6xl text-primary mt-4">Jyothis</div>
        <div className="font-display italic text-2xl my-1">weds</div>
        <div className="font-script text-5xl sm:text-6xl text-primary">Shalu</div>

        <div className="relative mx-auto mt-8 envelope-pulse">
          <div className="relative w-64 h-44 sm:w-80 sm:h-52 mx-auto rounded-md bg-gradient-to-br from-[oklch(0.95_0.03_145)] to-[oklch(0.88_0.06_145)] shadow-2xl border border-primary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={coupleIllustration.url} alt="Couple" className="h-32 sm:h-40 object-contain opacity-90" />
            </div>
            <div
              className="absolute top-0 left-0 w-full h-1/2"
              style={{
                background: "linear-gradient(135deg, oklch(0.75 0.1 145) 0%, oklch(0.65 0.12 145) 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-script text-xl shadow-lg">
              J&S
            </div>
          </div>
        </div>

        <button
          onClick={onOpen}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground tracking-[0.2em] uppercase text-xs hover:opacity-90 shadow-lg hover:shadow-xl transition"
        >
          Open Invitation
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-24 px-4 ${className}`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      {eyebrow && (
        <div className="text-xs tracking-[0.35em] uppercase text-muted-foreground">{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl sm:text-5xl text-primary mt-3">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-4">
        <span className="h-px w-10 bg-primary/30" />
        <svg width="14" height="14" viewBox="0 0 24 24" className="text-primary/70" fill="currentColor">
          <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z" />
        </svg>
        <span className="h-px w-10 bg-primary/30" />
      </div>
    </div>
  );
}

function Site({ variant }: { variant: WeddingVariant }) {
  const showEngagement = variant === "engagement" || variant === "both";
  const showWedding = variant === "wedding" || variant === "both";
  return (
    <div className="relative z-10">
      <Section className="pt-20 sm:pt-28">
        <div className="text-center fade-up">
          <div className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            Together with our families
          </div>
          <h1 className="font-script text-6xl sm:text-8xl text-primary mt-6 leading-none">
            Jyothis <span className="font-display italic text-3xl sm:text-5xl text-foreground">&</span> Shalu
          </h1>
          <p className="font-display italic text-lg sm:text-xl mt-6 text-muted-foreground max-w-xl mx-auto">
            "Therefore what God has joined together, let no one separate." — Mark 10:9
          </p>
          <div className="mt-10 flex justify-center float-slow">
            <img
              src={coupleIllustration.url}
              alt="Jyothis and Shalu illustration"
              className="w-64 sm:w-80 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid sm:grid-cols-2 gap-8">
          <PersonCard
            image={groomImg.url}
            name="Jyothis Koshy Thomas"
            role="The Groom"
            family={
              <>
                S/o M K Thomas (Sabu) & Annamma Thomas (Jiji)
                <br />
                Malayil Ayrookuzhiyil, Angadical South (PO),
                <br />
                Anjilimood, Chengannur
              </>
            }
          />
          <PersonCard
            image={brideImg.url}
            name="Shalu Varghese"
            role="The Bride"
            family={
              <>
                D/o Varghese S (Shaji) & Mini Varghese
                <br />
                Kizhakkadath Shaji Bhavanam,
                <br />
                Pallickal Naduvilemuri (PO),
                <br />
                Olakettiyambalam, Kayamkulam
              </>
            }
          />
        </div>
      </Section>

      {showEngagement && (
        <Section className="bg-gradient-to-b from-transparent via-[oklch(0.96_0.02_145)] to-transparent">
          <SectionTitle eyebrow="Save the Date" title="Engagement" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={coupleWatercolor.url} alt="Engagement" className="w-full h-full object-cover" />
            </div>
            <EventCard
              title="Engagement"
              dateLabel="Friday, 15th August · 10:00 AM"
              date={ENGAGEMENT_DATE}
              venue="St. Stephen's Church Auditorium"
              address="Kattanam, Kerala"
              mapQuery="St. Stephen's Church Auditorium Kattanam Kerala"
            />
          </div>
        </Section>
      )}

      {showWedding && (
        <Section>
          <SectionTitle eyebrow="The Holy Matrimony" title="Wedding" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <EventCard
              title="Wedding"
              dateLabel="Monday, 24th August · 11:00 AM onwards"
              date={WEDDING_DATE}
              venue="St. Mary's Orthodox Church"
              address="Mulakuzha, Kerala"
              mapQuery="St Mary's Orthodox Church Mulakuzha"
            />
            <div className="rounded-2xl overflow-hidden shadow-xl order-first md:order-last">
              <img src={coupleTraditional.url} alt="Wedding" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="mt-10">
            <div className="max-w-xl mx-auto">
              <EventCard
                title="Reception"
                dateLabel="Sunday, 24th August"
                date={WEDDING_DATE}
                venue="St. Thomas Mar Thoma Syrian Church Auditorium"
                address="Mulakuzha, Kerala"
                mapQuery="St. Thomas Mar Thoma Syrian Church Mulakuzha"
              />
            </div>
          </div>
        </Section>
      )}

      <Section className="text-center">
        <div className="font-script text-4xl sm:text-5xl text-primary">With Love & Blessings</div>
        <p className="font-display italic text-lg sm:text-xl mt-4 max-w-xl mx-auto text-muted-foreground">
          Your presence and prayers will be the most cherished gift on our special day.
        </p>
        <div className="mt-6 font-display text-xl">— Jyothis & Shalu</div>
      </Section>

      <Footer />
    </div>
  );
}

function PersonCard({
  image,
  name,
  role,
  family,
}: {
  image: string;
  name: string;
  role: string;
  family: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card/80 backdrop-blur border border-border/60 overflow-hidden shadow-lg">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 text-center">
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{role}</div>
        <div className="font-display text-2xl text-primary mt-2">{name}</div>
        <div className="mt-3 h-px w-12 mx-auto bg-primary/30" />
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{family}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border/60 bg-card/40 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col items-center text-center gap-3">
        <div className="font-script text-2xl sm:text-3xl text-primary">
          Best compliments from Family &amp; Friends
        </div>
        <div className="h-px w-16 bg-primary/30 my-2" />
        <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">Designed by</div>
        <img src={focusLogo.url} alt="Focus Media" className="h-16 w-16 object-contain" />
        <div className="font-display text-lg">Focus Media</div>
        <a
          href="https://instagram.com/focusmediahere"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary hover:underline"
        >
          @focusmediahere
        </a>
        <div className="text-sm text-muted-foreground">
          <a href="tel:+917907730080" className="hover:text-primary">+91 79077 30080</a>
          <span className="mx-2">·</span>
          <a href="tel:+917559000136" className="hover:text-primary">+91 75590 00136</a>
        </div>
      </div>
    </footer>
  );
}