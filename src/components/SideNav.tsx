import { NavTab, VCPersonaId } from "@/lib/types";
import { Icon } from "./Icon";
import { VC_PERSONAS } from "@/lib/pitch";
import { sound } from "@/lib/audio";

const NAV_ITEMS: { id: NavTab; icon: string; label: string }[] = [
  { id: "hype", icon: "rocket_launch", label: "Hype Engine" },
  { id: "valuation-lab", icon: "science", label: "Valuation Lab" },
  { id: "burn-rate", icon: "local_fire_department", label: "Burn Rate" },
  { id: "lp-dashboard", icon: "diamond", label: "LP Dashboard" },
  { id: "pitch-battle", icon: "sports_kabaddi", label: "Pitch Battle 🥊" },
];

interface SideNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  activePersonaId: VCPersonaId;
  onPitch: () => void;
  onOpenSettings: () => void;
}

export function SideNav({
  activeTab,
  onTabChange,
  activePersonaId,
  onPitch,
  onOpenSettings,
}: SideNavProps) {
  const currentPersona = VC_PERSONAS.find((p) => p.id === activePersonaId) ?? VC_PERSONAS[0]!;

  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col space-y-6 border-r border-white/5 bg-black/40 py-6 shadow-[10px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:flex">
      <div className="flex flex-col items-center border-b border-white/5 px-6 pb-4 pt-6 text-center">
        <img
          alt={currentPersona.name}
          className="mb-3 h-20 w-20 rounded-full border-2 border-gold object-cover shadow-[0_0_20px_rgba(255,225,109,0.3)]"
          src={currentPersona.avatar}
          loading="lazy"
        />
        <h2 className="label-caps text-xs text-gold font-bold">{currentPersona.name}</h2>
        <p className="label-caps mt-0.5 text-[10px] text-cyan">{currentPersona.badge}</p>
      </div>

      <div className="flex-1 space-y-1.5 px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                onTabChange(item.id);
              }}
              className={`flex w-full items-center rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? "border-r-4 border-cyan bg-cyan/10 font-bold text-cyan shadow-sm"
                  : "text-muted-foreground hover:bg-surface-high hover:text-foreground"
              }`}
            >
              <Icon name={item.icon} className="mr-3 text-lg" filled={isActive} />
              <span className="label-caps tracking-wider text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="px-4 pb-4">
        <button
          onClick={() => {
            onTabChange("hype");
            onPitch();
          }}
          className="glow-gold label-caps w-full rounded-xl bg-gold py-3 text-xs font-bold text-on-gold transition-all duration-300 active:scale-95"
        >
          Pitch Now 🚀
        </button>
        <button
          onClick={() => {
            sound.playPop();
            onOpenSettings();
          }}
          className="mt-3 flex w-full items-center rounded-xl px-4 py-2.5 text-muted-foreground transition-all hover:bg-surface-high hover:text-foreground"
        >
          <Icon name="settings" className="mr-3 text-base" />
          <span className="label-caps text-xs tracking-widest">Settings</span>
        </button>
      </div>
    </nav>
  );
}