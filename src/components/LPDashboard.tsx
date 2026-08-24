import { SavedPitch } from "@/lib/types";
import { Icon } from "./Icon";
import { VC_PERSONAS } from "@/lib/pitch";
import { sound } from "@/lib/audio";
import { toast } from "sonner";

interface LPDashboardProps {
  pitches: SavedPitch[];
  onDeletePitch: (id: string) => void;
  onOpenTermSheet: () => void;
  onOpenSocialCard: (pitch: SavedPitch) => void;
}

export function LPDashboard({
  pitches,
  onDeletePitch,
  onOpenTermSheet,
  onOpenSocialCard,
}: LPDashboardProps) {
  const totalValuation = pitches.reduce((sum, p) => sum + p.valuation, 0);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    onDeletePitch(id);
    toast.info("Pitch liquidated from portfolio.");
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-gradient-gold font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
          Limited Partner (LP) Portfolio
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground md:text-sm">
          Track your imaginary fund returns, diluted cap table, and generated unicorn ventures.
        </p>
      </div>

      {/* Portfolio Stats & Cap Table Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Total Assets Under Management */}
        <div className="glass-panel relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 shadow-[0_0_30px_rgba(255,225,109,0.1)] md:p-8">
          <div>
            <span className="label-caps text-xs text-gold">Total Fund Valuation (AUM)</span>
            <div className="mt-2 font-display text-3xl font-extrabold text-gradient-gold md:text-5xl">
              ${totalValuation.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Across {pitches.length} hyper-inflated portfolio venture{pitches.length === 1 ? "" : "s"}.
            </p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                sound.playChaChing();
                onOpenTermSheet();
              }}
              className="glow-gold label-caps flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3 text-xs font-bold text-on-gold transition-all hover:brightness-110 active:scale-95"
            >
              <Icon name="description" />
              Generate Parody Term Sheet
            </button>
          </div>
        </div>

        {/* Cap Table Breakdown */}
        <div className="glass-panel rounded-3xl p-6 md:p-8">
          <span className="label-caps text-xs text-cyan">Standard Diluted Cap Table</span>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold text-foreground">
                <span>Lead VC Syndicate</span>
                <span>68.0%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-surface-high">
                <div className="h-full rounded-full bg-cyan" style={{ width: "68%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-foreground">
                <span>Employee Stock Option Pool (Unvested)</span>
                <span>15.0%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-surface-high">
                <div className="h-full rounded-full bg-gold" style={{ width: "15%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-foreground">
                <span>Founder Equity (Diluted & Pledged)</span>
                <span>12.0%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-surface-high">
                <div className="h-full rounded-full bg-white/40" style={{ width: "12%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-foreground">
                <span>Tres Comas Tequila Royalty Reserve</span>
                <span>5.0%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-surface-high">
                <div className="h-full rounded-full bg-destructive" style={{ width: "5%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Pitch Vault */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="label-caps flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="folder_special" className="text-sm" />
            Inflated Pitch Vault ({pitches.length})
          </h3>
        </div>

        {pitches.length === 0 ? (
          <div className="glass-panel flex flex-col items-center justify-center rounded-2xl p-10 text-center">
            <Icon name="rocket_launch" className="mb-3 text-3xl text-muted-foreground/50" />
            <p className="text-sm font-semibold text-foreground">No pitches in your portfolio yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Go to the Hype Engine, inflate your boring idea, and it will be saved here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pitches.map((item) => {
              const persona = VC_PERSONAS.find((p) => p.id === item.persona);
              return (
                <div
                  key={item.id}
                  className="glass-panel group relative overflow-hidden rounded-2xl p-5 transition-all hover:border-white/20"
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2">
                      {persona && (
                        <span className="label-caps rounded-full bg-white/5 px-2.5 py-0.5 text-[9px] text-cyan">
                          {persona.name}
                        </span>
                      )}
                      <span className="text-[11px] text-muted-foreground">
                        Origin: "{item.originalIdea || "Untitled Idea"}"
                      </span>
                    </div>
                    <span className="font-display text-sm font-extrabold text-gold">
                      ${item.valuation.toLocaleString()}
                    </span>
                  </div>

                  <p className="my-3 text-sm italic leading-relaxed text-foreground">
                    {item.pitch}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="label-caps rounded-md bg-surface-high px-2 py-0.5 text-[9px] text-cyan">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          sound.playPop();
                          onOpenSocialCard(item);
                        }}
                        className="label-caps flex items-center gap-1 rounded-lg border border-white/15 px-3 py-1.5 text-[10px] text-foreground hover:bg-white/10"
                      >
                        <Icon name="share" className="text-xs" />
                        Card
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="rounded-lg border border-white/10 p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive"
                        title="Delete from vault"
                      >
                        <Icon name="delete" className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
