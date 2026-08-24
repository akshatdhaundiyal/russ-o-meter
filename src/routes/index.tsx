import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { Confetti } from "@/components/Confetti";
import { Icon } from "@/components/Icon";
import { BottomNav, MobileTopBar } from "@/components/MobileBars";
import { PitchCard } from "@/components/PitchCard";
import { SideNav } from "@/components/SideNav";
import { ValuationCounter } from "@/components/ValuationCounter";
import { PersonaCarousel } from "@/components/PersonaCarousel";
import { ValuationLab } from "@/components/ValuationLab";
import { BurnRateSimulator } from "@/components/BurnRateSimulator";
import { LPDashboard } from "@/components/LPDashboard";
import { PitchBattle } from "@/components/PitchBattle";
import { TermSheetModal } from "@/components/TermSheetModal";
import { SocialCardExportModal } from "@/components/SocialCardExportModal";
import { SettingsModal } from "@/components/SettingsModal";
import { BORING_IDEAS, generatePitch } from "@/lib/pitch";
import { generatePitchAI } from "@/lib/pitch.functions";
import { NavTab, SavedPitch, VCPersonaId } from "@/lib/types";
import { sound } from "@/lib/audio";

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
  const [activeTab, setActiveTab] = useState<NavTab>("hype");
  const [activePersonaId, setActivePersonaId] = useState<VCPersonaId>("russ");
  const [valuation, setValuation] = useState(0);
  const [commas, setCommas] = useState(0);
  const [idea, setIdea] = useState("");
  const [pitch, setPitch] = useState(DEFAULT_PITCH);
  const [tags, setTags] = useState<string[]>(DEFAULT_TAGS);
  const [celebrating, setCelebrating] = useState(false);
  const [burst, setBurst] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  // Modals
  const [termSheetOpen, setTermSheetOpen] = useState(false);
  const [socialCardOpen, setSocialCardOpen] = useState(false);
  const [selectedPitchForCard, setSelectedPitchForCard] = useState<{
    pitch: string;
    valuation: number;
    tags: string[];
  } | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Saved Pitches Vault
  const [savedPitches, setSavedPitches] = useState<SavedPitch[]>([]);

  const rafRef = useRef(0);
  const askAI = useServerFn(generatePitchAI);

  // Load saved pitches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("russ_saved_pitches");
      if (stored) {
        try {
          setSavedPitches(JSON.parse(stored));
        } catch {
          // parse error
        }
      }
    }
  }, []);

  // Save pitches to localStorage
  const persistPitches = (updated: SavedPitch[]) => {
    setSavedPitches(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("russ_saved_pitches", JSON.stringify(updated));
    }
  };

  // Intro count-up to $1,000,000,000 on first load
  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
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

  const surpriseMe = () => {
    sound.playPop();
    const random = BORING_IDEAS[Math.floor(Math.random() * BORING_IDEAS.length)] ?? BORING_IDEAS[0]!;
    setIdea(random);
    toast.info("Idea loaded! Hit 'Hyper-Inflate Pitch' to raise capital.");
  };

  const inflate = async () => {
    if (loading) return;
    setLoading(true);
    sound.playRocketLaunch();

    let newPitch = "";
    let newTags = tags;
    let computedVal = valuation === 0 ? 5_000_000 : Math.floor(valuation * 1.7);

    try {
      const result = await askAI({ data: { idea, persona: activePersonaId } });
      newPitch = result.pitch;
      if (result.tags.length) newTags = result.tags;
      setPitch(newPitch);
      setTags(newTags);
    } catch {
      const fallback = generatePitch(idea, activePersonaId);
      newPitch = fallback.pitch;
      newTags = fallback.tags;
      computedVal = fallback.valuation;
      setPitch(newPitch);
      setTags(newTags);
      toast.info("AI model unavailable locally — using procedural VC hype matrix.");
    } finally {
      setLoading(false);
      setValuation(computedVal);

      // Save to portfolio vault
      const newSavedItem: SavedPitch = {
        id: "pitch_" + Date.now(),
        originalIdea: idea || "An app that reminds you to drink water",
        pitch: newPitch,
        tags: newTags,
        valuation: computedVal,
        persona: activePersonaId,
        createdAt: Date.now(),
      };
      persistPitches([newSavedItem, ...savedPitches.slice(0, 49)]);
    }
  };

  const addComma = () => {
    sound.playChaChing();
    setValuation((v) => (v === 0 ? 100_000_000 : v * 10));
    setCommas((c) => {
      const next = c + 1;
      if (next >= 3) {
        setTimeout(() => {
          sound.playCelebrationFanfare();
          setCelebrating(true);
          setBurst((b) => b + 1);
        }, 400);
      }
      return next;
    });
  };

  const closeCelebration = () => {
    sound.playPop();
    setCelebrating(false);
    setCommas(0);
  };

  const tweet = () => {
    sound.playPop();
    const text = `My valuation just hit $${valuation.toLocaleString()} on the Russ-O-Meter. ${pitch}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    closeCelebration();
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    toast.info(muted ? "Sound FX muted" : "Sound FX enabled 🔊");
  };

  const handleDeleteSavedPitch = (id: string) => {
    persistPitches(savedPitches.filter((p) => p.id !== id));
  };

  const handleClearAllPitches = () => {
    persistPitches([]);
  };

  const handleOpenSocialCard = (item?: { pitch: string; valuation: number; tags: string[] }) => {
    setSelectedPitchForCard(
      item || {
        pitch,
        valuation,
        tags,
      }
    );
    setSocialCardOpen(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Confetti burst={burst} />

      {/* Desktop Left Side Navigation */}
      <SideNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activePersonaId={activePersonaId}
        onPitch={inflate}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Mobile Top Header */}
      <MobileTopBar
        valuation={valuation}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="relative flex min-h-screen w-full flex-1 flex-col px-4 pb-32 pt-4 md:ml-64 md:w-[calc(100%-256px)] md:px-12 md:pb-12 md:pt-8">
        {/* VIEW 1: HYPE ENGINE (Default) */}
        {activeTab === "hype" && (
          <div className="mx-auto w-full max-w-4xl space-y-8">
            <header className="flex flex-col items-center justify-center text-center">
              <h1 className="text-gradient-gold font-display text-3xl font-extrabold uppercase tracking-tight drop-shadow-[0_0_15px_rgba(255,225,109,0.35)] md:text-6xl">
                Russ-O-Meter
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground md:text-sm">
                Turn your boring side-project into a Three-Comma VC valuation.
              </p>
            </header>

            {/* Persona Carousel */}
            <section>
              <PersonaCarousel
                selectedId={activePersonaId}
                onSelect={(id) => setActivePersonaId(id)}
              />
            </section>

            {/* Centerpiece Valuation Counter */}
            <section className="flex justify-center">
              <ValuationCounter value={valuation} />
            </section>

            {/* Input Section */}
            <section className="w-full">
              <div className="mb-2 flex items-center justify-between">
                <label
                  className="label-caps flex items-center gap-1.5 text-xs text-muted-foreground"
                  htmlFor="idea-input"
                >
                  <Icon name="edit_square" className="text-sm" />
                  Enter your boring app idea
                </label>
                <button
                  onClick={surpriseMe}
                  className="label-caps flex items-center gap-1 text-[11px] font-bold text-cyan hover:underline"
                >
                  <Icon name="casino" className="text-sm" />
                  Surprise Me 🎲
                </button>
              </div>

              <div className="relative">
                <textarea
                  id="idea-input"
                  rows={3}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g., An app that reminds me to drink water every hour"
                  className="veblen-input w-full resize-none rounded-2xl p-4 text-sm placeholder:text-muted-foreground/50 md:p-5 md:text-base"
                />
                <div className="pointer-events-none absolute bottom-4 right-4 text-outline-variant">
                  <Icon name="edit_note" />
                </div>
              </div>
            </section>

            {/* Action Buttons Grid */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <button
                onClick={inflate}
                disabled={loading}
                className="glow-blue label-caps group relative flex items-center justify-center overflow-hidden rounded-xl bg-cyan py-4 text-xs font-bold text-on-cyan transition-all duration-300 active:scale-95 disabled:opacity-70 md:py-5 md:text-sm"
              >
                <span className="relative z-10 flex items-center tracking-wider">
                  {loading ? "Inflating Valuation…" : "Hyper-Inflate Pitch"}
                  <Icon
                    name={loading ? "progress_activity" : "rocket_launch"}
                    className={`ml-2 text-base ${loading ? "animate-spin" : ""}`}
                  />
                </span>
                <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-white/20 transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
              </button>

              <button
                onClick={addComma}
                className="glow-gold label-caps flex items-center justify-center rounded-xl border border-gold bg-gold/15 py-4 text-xs font-bold text-gold transition-all duration-300 hover:bg-gold/25 active:scale-95 md:py-5 md:text-sm"
              >
                <span className="flex items-center tracking-wider">
                  Add a Comma ($100M)
                  <Icon name="monetization_on" className="ml-2 text-base" />
                </span>
              </button>
            </section>

            {/* Generated Output Card */}
            <section>
              <PitchCard
                pitch={pitch}
                tags={tags}
                onOpenSocialCard={() => handleOpenSocialCard()}
              />
            </section>
          </div>
        )}

        {/* VIEW 2: VALUATION LAB */}
        {activeTab === "valuation-lab" && (
          <ValuationLab
            onApplyValuation={(val) => {
              setValuation(val);
              setActiveTab("hype");
            }}
          />
        )}

        {/* VIEW 3: BURN RATE SIMULATOR */}
        {activeTab === "burn-rate" && <BurnRateSimulator />}

        {/* VIEW 4: LP DASHBOARD */}
        {activeTab === "lp-dashboard" && (
          <LPDashboard
            pitches={savedPitches}
            onDeletePitch={handleDeleteSavedPitch}
            onOpenTermSheet={() => setTermSheetOpen(true)}
            onOpenSocialCard={(item) => handleOpenSocialCard(item)}
          />
        )}

        {/* VIEW 5: PITCH BATTLE (PARTY MODE) */}
        {activeTab === "pitch-battle" && <PitchBattle activePersonaId={activePersonaId} />}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Modals & Overlays */}
      <CelebrationOverlay open={celebrating} onClose={closeCelebration} onTweet={tweet} />

      <TermSheetModal
        open={termSheetOpen}
        onClose={() => setTermSheetOpen(false)}
        valuation={valuation}
      />

      {selectedPitchForCard && (
        <SocialCardExportModal
          open={socialCardOpen}
          onClose={() => setSocialCardOpen(false)}
          pitch={selectedPitchForCard.pitch}
          valuation={selectedPitchForCard.valuation}
          tags={selectedPitchForCard.tags}
        />
      )}

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onClearPortfolio={handleClearAllPitches}
        onResetValuation={() => setValuation(0)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      <Toaster position="bottom-center" />
    </div>
  );
}
