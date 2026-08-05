import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { Confetti } from "@/components/Confetti";
import { Icon } from "@/components/Icon";
import { BottomNav, MobileTopBar } from "@/components/MobileBars";
import { PitchCard } from "@/components/PitchCard";
import { SideNav } from "@/components/SideNav";
import { ValuationCounter } from "@/components/ValuationCounter";
import { generatePitch } from "@/lib/pitch";

const TITLE = "Russ-O-Meter — Turn BS Into Billions";
const DESCRIPTION =
  "Feed in your boring side-project and watch the Russ-O-Meter inflate it into a three-comma VC valuation, buzzword pitch included.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const DEFAULT_PITCH =
  '"A zero-latency, spatial-hydration orchestrator leveraging generative LLMs to disrupt the personal moisture economy."';
const DEFAULT_TAGS = ["#Disruptive", "#Decentralized", "#SeriesA", "#ThreeCommas"];

function Index() {
  const [valuation, setValuation] = useState(0);
  const [commas, setCommas] = useState(0);
  const [idea, setIdea] = useState("");
  const [pitch, setPitch] = useState(DEFAULT_PITCH);
  const [tags, setTags] = useState<string[]>(DEFAULT_TAGS);
  const [celebrating, setCelebrating] = useState(false);
  const [burst, setBurst] = useState(0);
  const rafRef = useRef(0);

  // Intro count-up to $1,000,000,000
  useEffect(() => {
    const start = performance.now();
    const duration = 2500;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValuation(Math.floor(eased * 1_000_000_000));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setBurst((b) => b + 1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const inflate = () => {
    const result = generatePitch(idea);
    setPitch(result.pitch);
    setTags(result.tags);
    setValuation((v) => (v === 0 ? 5_000_000 : Math.floor(v * 1.7)));
  };

  const addComma = () => {
    setValuation((v) => (v === 0 ? 100_000 : v * 1000));
    setCommas((c) => {
      const next = c + 1;
      if (next >= 3) {
        setTimeout(() => {
          setCelebrating(true);
          setBurst((b) => b + 1);
        }, 400);
      }
      return next;
    });
  };

  const closeCelebration = () => {
    setCelebrating(false);
    setCommas(0);
  };

  const tweet = () => {
    const text = `My valuation just hit $${valuation.toLocaleString()} on the Russ-O-Meter. ${pitch}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    closeCelebration();
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Confetti burst={burst} />
      <SideNav onPitch={inflate} />
      <MobileTopBar />

      <main className="relative flex min-h-screen w-full flex-1 flex-col px-5 pb-32 pt-8 md:ml-64 md:w-[calc(100%-256px)] md:px-16 md:pb-8">
        <header className="mb-10 flex flex-col items-center justify-center pt-4 text-center md:mb-12 md:pt-8">
          <h1 className="text-gradient-gold font-display text-4xl font-extrabold uppercase tracking-tight drop-shadow-[0_0_10px_rgba(255,225,109,0.35)] md:text-7xl">
            Russ-O-Meter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Turn your boring side-project into a Three-Comma VC valuation.
          </p>
        </header>

        <section className="mb-12 flex justify-center md:mb-16">
          <ValuationCounter value={valuation} />
        </section>

        <section className="mx-auto mb-10 w-full max-w-4xl">
          <label
            className="label-caps mb-4 flex items-center gap-2 text-muted-foreground"
            htmlFor="idea-input"
          >
            <Icon name="edit_square" className="text-sm" />
            Enter your boring app idea
          </label>
          <div className="relative">
            <textarea
              id="idea-input"
              rows={3}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., An app that reminds me to drink water every hour"
              className="veblen-input w-full resize-none rounded-xl p-5 placeholder:text-muted-foreground/50 md:p-6"
            />
            <div className="pointer-events-none absolute bottom-4 right-4 text-outline-variant">
              <Icon name="edit_note" />
            </div>
          </div>
        </section>

        <section className="mx-auto mb-12 grid w-full max-w-4xl grid-cols-1 gap-4 md:mb-16 md:grid-cols-2 md:gap-6">
          <button
            onClick={inflate}
            className="glow-blue label-caps group relative flex items-center justify-center overflow-hidden rounded-xl bg-cyan py-5 text-on-cyan transition-all duration-300 active:scale-95 md:py-6"
          >
            <span className="relative z-10 flex items-center tracking-widest">
              Hyper-Inflate Pitch
              <Icon name="rocket_launch" className="ml-2 text-lg" />
            </span>
            <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          </button>
          <button
            onClick={addComma}
            className="glow-gold label-caps flex items-center justify-center rounded-xl border border-gold bg-transparent py-5 text-gold transition-all duration-300 hover:bg-gold/10 active:scale-95 md:py-6"
          >
            <span className="flex items-center tracking-widest">
              Add a Comma ($100M)
              <Icon name="monetization_on" className="ml-2 text-lg" />
            </span>
          </button>
        </section>

        <section className="mx-auto mb-16 w-full max-w-4xl">
          <PitchCard pitch={pitch} tags={tags} />
        </section>
      </main>

      <BottomNav />
      <CelebrationOverlay open={celebrating} onClose={closeCelebration} onTweet={tweet} />
      <Toaster />
    </div>
  );
}
