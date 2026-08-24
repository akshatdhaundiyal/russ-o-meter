import { useState } from "react";
import { Icon } from "./Icon";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

interface BuzzwordItem {
  id: string;
  name: string;
  category: "buzzword" | "penalty";
  multiplier: number;
  description: string;
  icon: string;
}

const BUZZWORDS: BuzzwordItem[] = [
  {
    id: "ai_agents",
    name: "Autonomous AI Agent Swarm",
    category: "buzzword",
    multiplier: 15,
    description: "Replaces all human judgment with 10,000 parallel sub-agents.",
    icon: "smart_toy",
  },
  {
    id: "quantum",
    name: "Quantum-Resilient Mesh",
    category: "buzzword",
    multiplier: 25,
    description: "Immune to threats that won't exist for 400 years.",
    icon: "lock_open",
  },
  {
    id: "defense",
    name: "Pivot to Autonomous Defense Tech",
    category: "buzzword",
    multiplier: 50,
    description: "Suddenly you build smart missile firmware. Infinite federal budget.",
    icon: "shield",
  },
  {
    id: "depin",
    name: "DePIN Sovereign GPU Nodes",
    category: "buzzword",
    multiplier: 35,
    description: "Decentralized gaming PCs mining synthetic intelligence.",
    icon: "hub",
  },
  {
    id: "physical_ai",
    name: "Physical Intelligence & Humanoids",
    category: "buzzword",
    multiplier: 40,
    description: "Backflip robots doing your laundry in zero gravity.",
    icon: "precision_manufacturing",
  },
  {
    id: "penalty_revenue",
    name: "Having Actual Paying Customers",
    category: "penalty",
    multiplier: 0.15, // -85%
    description: "CRITICAL ERROR: Real revenue caps your addressable fantasy market.",
    icon: "receipt_long",
  },
  {
    id: "penalty_profit",
    name: "Generating Net Profit",
    category: "penalty",
    multiplier: 0.05, // -95%
    description: "VC ANOMALY: Profits indicate a severe lack of ambition and burn.",
    icon: "savings",
  },
];

const STAGES = [
  { name: "Pre-Seed", base: 10_000_000 },
  { name: "Seed", base: 35_000_000 },
  { name: "Series A", base: 120_000_000 },
  { name: "Series B", base: 450_000_000 },
  { name: "Unicorn Round", base: 1_000_000_000 },
  { name: "Tres Comas Club", base: 10_000_000_000 },
];

export function ValuationLab({ onApplyValuation }: { onApplyValuation: (val: number) => void }) {
  const [stageIndex, setStageIndex] = useState(2); // Series A default
  const [activeItems, setActiveItems] = useState<string[]>(["ai_agents", "depin"]);

  const toggleItem = (id: string) => {
    sound.playPop();
    setActiveItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentStage = STAGES[stageIndex] ?? STAGES[0]!;
  const baseVal = currentStage.base;

  // Calculate composite multiplier
  let totalMultiplier = 1;
  activeItems.forEach((id) => {
    const item = BUZZWORDS.find((b) => b.id === id);
    if (item) {
      if (item.category === "buzzword") {
        totalMultiplier += item.multiplier;
      } else {
        totalMultiplier *= item.multiplier;
      }
    }
  });

  const computedValuation = Math.floor(baseVal * totalMultiplier);

  const handleApply = () => {
    sound.playChaChing();
    onApplyValuation(computedValuation);
    toast.success(`Applied $${computedValuation.toLocaleString()} to Main Valuation!`);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-gradient-gold font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
          Valuation Multiplier Lab
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground md:text-sm">
          Stack frontier buzzwords and discover why having real revenue will destroy your seed-stage valuation.
        </p>
      </div>

      {/* Live Computed Value Display Card */}
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6 text-center shadow-[0_0_40px_rgba(0,220,230,0.15)] md:p-8">
        <div className="label-caps mb-2 flex items-center justify-center gap-2 text-cyan">
          <Icon name="science" className="text-sm" />
          <span>Synthetic Valuation Engine</span>
        </div>
        <div className="font-display text-3xl font-extrabold text-gradient-gold md:text-6xl">
          ${computedValuation.toLocaleString()}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-white/5 px-3 py-1">Stage: {currentStage.name}</span>
          <span className="rounded-full bg-cyan/10 px-3 py-1 font-semibold text-cyan">
            Multiplier: {totalMultiplier.toFixed(2)}x
          </span>
          {activeItems.includes("penalty_revenue") && (
            <span className="rounded-full bg-destructive/20 px-3 py-1 font-bold text-destructive">
              Revenue Penalty (-85%)
            </span>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleApply}
            className="glow-gold label-caps flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-xs font-bold text-on-gold transition-all duration-300 active:scale-95 md:text-sm"
          >
            <Icon name="bolt" className="text-base" />
            Apply to Main Russ-O-Meter
          </button>
        </div>
      </div>

      {/* Stage Slider */}
      <div className="glass-panel rounded-2xl p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <label className="label-caps text-xs text-foreground">Funding Round Stage</label>
          <span className="label-caps font-bold text-cyan">{currentStage.name}</span>
        </div>
        <input
          type="range"
          min="0"
          max={STAGES.length - 1}
          step="1"
          value={stageIndex}
          onChange={(e) => {
            sound.playPop();
            setStageIndex(parseInt(e.target.value, 10));
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-high accent-gold"
        />
        <div className="mt-3 flex justify-between text-[10px] text-muted-foreground">
          {STAGES.map((s, i) => (
            <span
              key={s.name}
              className={`cursor-pointer ${i === stageIndex ? "font-bold text-gold" : "hover:text-foreground"}`}
              onClick={() => {
                sound.playPop();
                setStageIndex(i);
              }}
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Buzzword Modifier Cards */}
      <div>
        <h3 className="label-caps mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="tune" className="text-sm" />
          Hype Multipliers & Anti-Revenue Penalties
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {BUZZWORDS.map((item) => {
            const active = activeItems.includes(item.id);
            const isPenalty = item.category === "penalty";

            return (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`relative flex items-start gap-3.5 rounded-2xl p-4 text-left transition-all duration-200 ${
                  active
                    ? isPenalty
                      ? "border-2 border-destructive bg-destructive/10 shadow-[0_0_20px_rgba(255,100,100,0.2)]"
                      : "border-2 border-cyan bg-cyan/10 shadow-[0_0_20px_rgba(0,220,230,0.2)]"
                    : "border border-white/10 bg-surface-high/40 opacity-70 hover:border-white/20 hover:opacity-100"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    active
                      ? isPenalty
                        ? "bg-destructive text-white"
                        : "bg-cyan text-on-cyan"
                      : "bg-surface-high text-muted-foreground"
                  }`}
                >
                  <Icon name={item.icon} className="text-lg" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-foreground">{item.name}</h4>
                    <span
                      className={`label-caps text-[10px] font-black ${
                        isPenalty ? "text-destructive" : "text-cyan"
                      }`}
                    >
                      {isPenalty ? "-85% PENALTY" : `+${item.multiplier}x`}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
