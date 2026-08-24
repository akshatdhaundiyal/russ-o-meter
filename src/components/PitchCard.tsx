import { toast } from "sonner";
import { Icon } from "./Icon";
import { sound } from "@/lib/audio";

interface PitchCardProps {
  pitch: string;
  tags: string[];
  onOpenSocialCard?: () => void;
}

export function PitchCard({ pitch, tags, onOpenSocialCard }: PitchCardProps) {
  const copy = async () => {
    sound.playPop();
    try {
      await navigator.clipboard.writeText(pitch);
      toast.success("Pitch copied. Go raise a round.");
    } catch {
      toast.error("Clipboard declined the term sheet.");
    }
  };

  const share = () => {
    sound.playPop();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `My valuation just got hyper-inflated on the Russ-O-Meter! ${pitch}`
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl p-6 md:p-8 shadow-[0_0_40px_rgba(0,220,230,0.1)]">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="label-caps flex items-center text-xs text-cyan">
          <Icon name="terminal" className="mr-2 text-base" filled />
          Silicon Valley VC Pitch Output
        </h3>
        <div className="flex space-x-2">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-gold/60" />
          <div className="h-2.5 w-2.5 rounded-full bg-cyan/60" />
        </div>
      </div>

      <p className="mb-6 text-base italic leading-relaxed text-foreground md:text-2xl md:leading-snug">
        {pitch}
      </p>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="label-caps rounded-full border border-white/5 bg-surface-high px-2.5 py-1 text-[10px] text-cyan"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex w-full gap-2 sm:w-auto">
          <button
            onClick={copy}
            title="Copy to clipboard"
            className="label-caps flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 px-3 py-2.5 text-[11px] text-foreground transition-colors hover:border-cyan hover:bg-cyan/10 hover:text-cyan sm:flex-none"
          >
            <Icon name="content_copy" className="text-sm" />
            <span>Copy</span>
          </button>

          {onOpenSocialCard && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenSocialCard();
              }}
              title="Generate shareable card image"
              className="glow-gold label-caps flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-gold bg-gold/15 px-3 py-2.5 text-[11px] text-gold hover:bg-gold/25 sm:flex-none"
            >
              <Icon name="image" className="text-sm" />
              <span>Card</span>
            </button>
          )}

          <button
            onClick={share}
            title="Share on X"
            className="label-caps flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 px-3 py-2.5 text-[11px] text-foreground transition-colors hover:border-cyan hover:bg-cyan/10 hover:text-cyan sm:flex-none"
          >
            <Icon name="share" className="text-sm" />
            <span>X / Tweet</span>
          </button>
        </div>
      </div>
    </div>
  );
}