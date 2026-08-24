import { NavTab } from "@/lib/types";
import { Icon } from "./Icon";
import { sound } from "@/lib/audio";

interface MobileTopBarProps {
  valuation: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSettings: () => void;
}

export function MobileTopBar({
  valuation,
  isMuted,
  onToggleMute,
  onOpenSettings,
}: MobileTopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-white/10 bg-abyss/80 px-4 shadow-[0_0_30px_rgba(0,220,230,0.15)] backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-2">
        <h1 className="font-display text-lg font-extrabold text-gold drop-shadow-[0_0_10px_rgba(255,225,109,0.5)]">
          Russ-O-Meter
        </h1>
        <span className="label-caps rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold text-gold">
          {valuation >= 1_000_000_000 ? "🦄 3-Commas" : "🔥 Series A"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Audio Mute/Unmute Pill */}
        <button
          onClick={() => {
            onToggleMute();
            sound.playPop();
          }}
          className={`flex h-8 items-center gap-1 rounded-full px-2.5 text-xs font-bold transition-all ${
            !isMuted
              ? "bg-cyan/15 text-cyan border border-cyan/30"
              : "bg-surface-high text-muted-foreground border border-white/10"
          }`}
          title={isMuted ? "Unmute sound FX" : "Mute sound FX"}
        >
          <Icon name={!isMuted ? "volume_up" : "volume_off"} className="text-sm" />
          <span className="text-[10px]">{!isMuted ? "FX ON" : "MUTED"}</span>
        </button>

        {/* Settings button */}
        <button
          onClick={() => {
            sound.playPop();
            onOpenSettings();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-surface-high text-gold hover:text-cyan"
          aria-label="Settings"
        >
          <Icon name="settings" className="text-sm" />
        </button>
      </div>
    </header>
  );
}

const TABS: { id: NavTab; icon: string; label: string }[] = [
  { id: "hype", icon: "rocket_launch", label: "Hype" },
  { id: "valuation-lab", icon: "science", label: "Lab" },
  { id: "burn-rate", icon: "local_fire_department", label: "Burn" },
  { id: "lp-dashboard", icon: "diamond", label: "LP Vault" },
  { id: "pitch-battle", icon: "sports_kabaddi", label: "Battle 🥊" },
];

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between gap-1 border-t border-white/20 bg-surface-high/70 px-2 py-2 shadow-[0_-10px_40px_rgba(255,225,109,0.1)] backdrop-blur-xl md:hidden">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              sound.playPop();
              onTabChange(tab.id);
            }}
            className={`flex flex-1 flex-col items-center justify-center rounded-xl py-1.5 transition-all duration-200 ${
              isActive
                ? "bg-gold/20 text-gold shadow-[0_0_15px_rgba(255,225,109,0.2)] scale-105"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon name={tab.icon} className="text-base" filled={isActive} />
            <span className="label-caps mt-0.5 text-[9px] font-bold tracking-tight">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}