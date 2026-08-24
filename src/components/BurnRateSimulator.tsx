import { useState } from "react";
import { Icon } from "./Icon";
import { BurnExpense } from "@/lib/types";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

const DEFAULT_EXPENSES: BurnExpense[] = [
  {
    id: "gpus",
    name: "Unoptimized H100 GPU Clusters Running Idle",
    category: "compute",
    monthlyCost: 350_000,
    active: true,
    flavorText: "Nobody knows what model they are training, but Jensen Huang sent a thank you card.",
  },
  {
    id: "kombucha",
    name: "Artisan Kombucha & Cold Brew Taps",
    category: "perks",
    monthlyCost: 18_000,
    active: true,
    flavorText: "Guaranteed organic fermentation is essential for 10x engineering flow states.",
  },
  {
    id: "vests",
    name: "Patagonia Micro-Puff Team Vests",
    category: "swag",
    monthlyCost: 42_000,
    active: true,
    flavorText: "Custom embroidered with corporate buzzwords for cold San Francisco summers.",
  },
  {
    id: "aspen",
    name: "Aspen Q3 Strategic Sound-Bath Retreat",
    category: "perks",
    monthlyCost: 175_000,
    active: true,
    flavorText: "Executive team needed to align their chakras with the macro-economic cycle.",
  },
  {
    id: "pr_firm",
    name: "Boutique Crisis PR Firm on Retainer",
    category: "marketing",
    monthlyCost: 85_000,
    active: true,
    flavorText: "Ready to draft apologies in case founder tweets at 3 AM again.",
  },
  {
    id: "influencer",
    name: "Crypto Celebrity Podcast Sponsorships",
    category: "marketing",
    monthlyCost: 120_000,
    active: false,
    flavorText: "They have no idea what your app does, but they shouted 'WAGMI' 40 times.",
  },
];

export function BurnRateSimulator() {
  const [bankBalance, setBankBalance] = useState(5_000_000);
  const [expenses, setExpenses] = useState<BurnExpense[]>(DEFAULT_EXPENSES);

  const toggleExpense = (id: string) => {
    sound.playPop();
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    );
  };

  const monthlyBurn = expenses
    .filter((e) => e.active)
    .reduce((sum, e) => sum + e.monthlyCost, 0);

  const runwayMonths = monthlyBurn > 0 ? (bankBalance / monthlyBurn).toFixed(1) : "Infinite";

  // Panic actions
  const emergencyPivot = () => {
    sound.playRocketLaunch();
    setBankBalance((b) => b + 2_000_000);
    toast.success("Pivot Successful! VCs poured in $2M for 'Spatial Autonomous Robotics'.");
  };

  const emergencyLayoff = () => {
    sound.playBuzzer();
    setExpenses((prev) =>
      prev.map((e) => (e.category === "perks" || e.category === "swag" ? { ...e, active: false } : e))
    );
    toast.warning("Laid off non-AI staff and cut kombucha. TechCrunch called you 'Lean & Visionary'.");
  };

  const emergencyBridge = () => {
    sound.playChaChing();
    setBankBalance((b) => b + 15_000_000);
    toast.success("Signed $15M Bridge Note from a Sovereign Wealth Fund! Runway extended!");
  };

  const isLowRunway = typeof runwayMonths === "string" && parseFloat(runwayMonths) < 6;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-gradient-gold font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
          Silicon Valley Burn Rate & Runway
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground md:text-sm">
          Simulate how fast your $5M seed round evaporates on idle H100 GPUs and Aspen sound baths.
        </p>
      </div>

      {/* Runway Status Hero */}
      <div className="glass-panel relative overflow-hidden rounded-3xl p-6 shadow-[0_0_40px_rgba(255,225,109,0.15)] md:p-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="text-center sm:text-left">
            <span className="label-caps text-[11px] text-muted-foreground">Bank Reserves</span>
            <div className="mt-1 font-display text-2xl font-extrabold text-foreground md:text-3xl">
              ${bankBalance.toLocaleString()}
            </div>
          </div>

          <div className="text-center">
            <span className="label-caps text-[11px] text-destructive">Monthly Burn</span>
            <div className="mt-1 font-display text-2xl font-extrabold text-destructive md:text-3xl">
              -${monthlyBurn.toLocaleString()}/mo
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="label-caps text-[11px] text-cyan">Estimated Runway</span>
            <div
              className={`mt-1 font-display text-3xl font-extrabold md:text-4xl ${
                isLowRunway ? "text-destructive animate-pulse" : "text-gradient-gold"
              }`}
            >
              {runwayMonths} {typeof runwayMonths === "string" && runwayMonths !== "Infinite" ? "Months" : ""}
            </div>
          </div>
        </div>

        {/* Progress meter */}
        <div className="mt-6">
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-high">
            <div
              className={`h-full transition-all duration-500 ${
                isLowRunway ? "bg-destructive" : "bg-gradient-to-r from-cyan to-gold"
              }`}
              style={{
                width: `${Math.min(
                  100,
                  Math.max(5, (typeof runwayMonths === "string" && runwayMonths !== "Infinite" ? parseFloat(runwayMonths) / 24 : 1) * 100)
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Panic Action Bar */}
      <div>
        <h3 className="label-caps mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="warning" className="text-sm text-gold" />
          Emergency Founder Panic Actions
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={emergencyPivot}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/10 p-3.5 text-xs font-bold text-cyan transition-all hover:bg-cyan/20 active:scale-95"
          >
            <Icon name="alt_route" />
            Pivot to Spatial AI (+$2M)
          </button>
          <button
            onClick={emergencyLayoff}
            className="flex items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3.5 text-xs font-bold text-destructive transition-all hover:bg-destructive/20 active:scale-95"
          >
            <Icon name="person_remove" />
            AI-Native Restructuring
          </button>
          <button
            onClick={emergencyBridge}
            className="glow-gold flex items-center justify-center gap-2 rounded-xl border border-gold bg-gold/15 p-3.5 text-xs font-bold text-gold transition-all hover:bg-gold/25 active:scale-95"
          >
            <Icon name="attach_money" />
            Sovereign Bridge (+$15M)
          </button>
        </div>
      </div>

      {/* Expense Line Items List */}
      <div>
        <h3 className="label-caps mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="receipt" className="text-sm" />
          Monthly Burn Breakdown
        </h3>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() => toggleExpense(expense.id)}
              className={`flex cursor-pointer items-center justify-between rounded-2xl p-4 transition-all duration-200 ${
                expense.active
                  ? "border border-white/15 bg-surface-high/60 shadow-sm"
                  : "border border-white/5 bg-surface-high/20 opacity-40 hover:opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                    expense.active
                      ? "border-cyan bg-cyan text-on-cyan"
                      : "border-white/20 bg-transparent"
                  }`}
                >
                  {expense.active && <Icon name="check" className="text-sm font-bold" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground md:text-sm">{expense.name}</h4>
                  <p className="mt-0.5 text-[11px] italic text-muted-foreground">{expense.flavorText}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display text-xs font-bold text-destructive md:text-sm">
                  -${expense.monthlyCost.toLocaleString()}/mo
                </span>
                <p className="label-caps text-[9px] uppercase text-muted-foreground">
                  {expense.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
