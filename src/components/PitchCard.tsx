import { toast } from "sonner";
import { Icon } from "./Icon";

export function PitchCard({ pitch, tags }: { pitch: string; tags: string[] }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      toast.success("Pitch copied. Go raise a round.");
    } catch {
      toast.error("Clipboard declined the term sheet.");
    }
  };

  const share = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(pitch)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
        <h3 className="label-caps flex items-center text-cyan">
          <Icon name="terminal" className="mr-2 text-base" filled />
          Silicon Valley VC Pitch
        </h3>
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-destructive/50" />
          <div className="h-3 w-3 rounded-full bg-gold/50" />
          <div className="h-3 w-3 rounded-full bg-cyan/50" />
        </div>
      </div>

      <p className="mb-8 text-lg italic leading-relaxed text-foreground md:text-3xl md:leading-snug">
        {pitch}
      </p>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="label-caps rounded-full border border-white/5 bg-surface-high px-3 py-1 text-[10px] text-cyan"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex w-full gap-4 sm:w-auto">
          <button
            onClick={copy}
            title="Copy to clipboard"
            className="label-caps flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-[10px] text-foreground transition-colors hover:border-cyan hover:bg-cyan/10 hover:text-cyan sm:h-10 sm:w-10 sm:flex-none sm:rounded-full sm:p-0"
          >
            <Icon name="content_copy" className="text-sm" />
            <span className="sm:hidden">Copy</span>
          </button>
          <button
            onClick={share}
            title="Share on X"
            className="label-caps flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-[10px] text-foreground transition-colors hover:border-cyan hover:bg-cyan/10 hover:text-cyan sm:h-10 sm:w-10 sm:flex-none sm:rounded-full sm:p-0"
          >
            <Icon name="share" className="text-sm" />
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}