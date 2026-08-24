import { useState } from "react";
import { Icon } from "./Icon";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onClearPortfolio: () => void;
  onResetValuation: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function SettingsModal({
  open,
  onClose,
  onClearPortfolio,
  onResetValuation,
  isMuted,
  onToggleMute,
}: SettingsModalProps) {
  const [volume, setVolume] = useState(sound.getVolume());

  if (!open) return null;

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    sound.setVolume(v);
  };

  const handleClearPitches = () => {
    sound.playPop();
    if (window.confirm("Are you sure you want to liquidate all saved portfolio pitches?")) {
      onClearPortfolio();
      toast.success("Portfolio vault cleared.");
    }
  };

  const handleResetVal = () => {
    sound.playPop();
    onResetValuation();
    toast.info("Valuation reset to $0.");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="glass-panel relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl border border-white/20 p-6 shadow-[0_0_80px_rgba(0,0,0,0.8)] md:p-8">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white"
        >
          <Icon name="close" />
        </button>

        <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
          <Icon name="settings" className="text-xl text-gold" />
          <h3 className="font-display text-lg font-bold uppercase text-foreground">
            App Settings & Preferences
          </h3>
        </div>

        <div className="space-y-6">
          {/* Audio FX Settings */}
          <div>
            <span className="label-caps text-xs text-cyan">Audio & Hype FX</span>
            <div className="mt-3 space-y-4 rounded-2xl bg-surface-high/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">Sound Synthesizer</h4>
                  <p className="text-[11px] text-muted-foreground">Cha-chings, rocket whooshes, and fanfare</p>
                </div>
                <button
                  onClick={() => {
                    onToggleMute();
                    sound.playPop();
                  }}
                  className={`flex h-8 w-14 items-center rounded-full p-1 transition-colors ${
                    !isMuted ? "bg-cyan justify-end" : "bg-surface-high justify-start"
                  }`}
                >
                  <div className="h-6 w-6 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {!isMuted && (
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface-high accent-cyan"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Reset Actions */}
          <div>
            <span className="label-caps text-xs text-destructive">Data & Portfolio Controls</span>
            <div className="mt-3 space-y-3">
              <button
                onClick={handleResetVal}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-surface-high/30 p-3.5 text-xs text-foreground transition-colors hover:bg-white/5"
              >
                <span>Reset Live Valuation Counter to $0</span>
                <Icon name="restart_alt" className="text-sm text-muted-foreground" />
              </button>
              <button
                onClick={handleClearPitches}
                className="flex w-full items-center justify-between rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive transition-colors hover:bg-destructive/20"
              >
                <span>Liquidate Saved Pitch Vault</span>
                <Icon name="delete_forever" className="text-sm" />
              </button>
            </div>
          </div>

          {/* About / Lore */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
            <p className="text-[11px] text-muted-foreground">
              "This app does not delete files from your server, but it will raise your valuation by $1B."
            </p>
            <p className="mt-1 label-caps text-[9px] text-gold">Inspired by Russ Hanneman & Silicon Valley</p>
          </div>
        </div>
      </div>
    </div>
  );
}
