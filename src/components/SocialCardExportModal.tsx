import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { toast } from "sonner";
import { sound } from "@/lib/audio";

interface SocialCardExportModalProps {
  open: boolean;
  onClose: () => void;
  pitch: string;
  valuation: number;
  tags: string[];
}

export function SocialCardExportModal({
  open,
  onClose,
  pitch,
  valuation,
  tags,
}: SocialCardExportModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background dark abyss gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
    bgGrad.addColorStop(0, "#0b0f17");
    bgGrad.addColorStop(0.5, "#131314");
    bgGrad.addColorStop(1, "#0b0f17");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 630);

    // Glowing corner accents
    const cyanRadial = ctx.createRadialGradient(150, 150, 10, 150, 150, 300);
    cyanRadial.addColorStop(0, "rgba(0, 220, 230, 0.25)");
    cyanRadial.addColorStop(1, "rgba(0, 220, 230, 0)");
    ctx.fillStyle = cyanRadial;
    ctx.fillRect(0, 0, 600, 400);

    const goldRadial = ctx.createRadialGradient(1050, 480, 10, 1050, 480, 350);
    goldRadial.addColorStop(0, "rgba(255, 225, 109, 0.2)");
    goldRadial.addColorStop(1, "rgba(255, 225, 109, 0)");
    ctx.fillStyle = goldRadial;
    ctx.fillRect(600, 200, 600, 430);

    // Inner Glass Card Frame
    ctx.strokeStyle = "rgba(255, 225, 109, 0.5)";
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, 1120, 550);

    // Header Logo & Badge
    ctx.font = "bold 32px Space Grotesk, sans-serif";
    ctx.fillStyle = "#ffe16d";
    ctx.fillText("RUSS-O-METER", 80, 100);

    ctx.font = "bold 18px Space Grotesk, sans-serif";
    ctx.fillStyle = "#00dce6";
    ctx.fillText("OFFICIAL THREE COMMAS CLUB CERTIFICATION", 80, 130);

    // Valuation Display
    ctx.font = "bold 76px Sora, sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`$${valuation.toLocaleString()}`, 80, 230);

    ctx.font = "bold 20px Space Grotesk, sans-serif";
    ctx.fillStyle = "#ffe16d";
    ctx.fillText("PRE-MONEY VALUATION", 80, 270);

    // Pitch Quote
    ctx.font = "italic 26px Plus Jakarta Sans, sans-serif";
    ctx.fillStyle = "#e5e2e2";

    // Text wrap helper
    const words = pitch.split(" ");
    let line = "";
    let y = 350;
    const maxWidth = 1000;
    const lineHeight = 38;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 80, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, y);

    // Tags
    ctx.font = "bold 18px Space Grotesk, sans-serif";
    ctx.fillStyle = "#00dce6";
    ctx.fillText(tags.join("   "), 80, 540);

    // Watermark
    ctx.font = "16px Space Grotesk, sans-serif";
    ctx.fillStyle = "#909096";
    ctx.fillText("russ-o-meter.lovable.app", 930, 540);

    const url = canvas.toDataURL("image/png");
    setDataUrl(url);
  }, [open, pitch, valuation, tags]);

  if (!open) return null;

  const downloadImage = () => {
    sound.playChaChing();
    const link = document.createElement("a");
    link.download = `russ-o-meter-unicorn-valuation.png`;
    link.href = dataUrl;
    link.click();
    toast.success("Unicorn Certificate image saved!");
  };

  const copyImage = async () => {
    sound.playPop();
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("Image copied to clipboard! Paste it anywhere.");
    } catch {
      // Fallback copy url
      toast.info("Click 'Download Image' to save the PNG file.");
    }
  };

  const nativeShare = async () => {
    sound.playPop();
    if (navigator.share) {
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "unicorn-pitch.png", { type: "image/png" });
        await navigator.share({
          title: "My Russ-O-Meter Valuation",
          text: `My startup valuation just hit $${valuation.toLocaleString()} on the Russ-O-Meter! ${pitch}`,
          files: [file],
        });
        toast.success("Shared successfully!");
      } catch {
        // user cancelled
      }
    } else {
      const tweetText = `My startup valuation just hit $${valuation.toLocaleString()} on the Russ-O-Meter. ${pitch}`;
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="glass-panel relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-cyan/40 p-6 shadow-[0_0_80px_rgba(0,220,230,0.3)] md:p-8">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white"
        >
          <Icon name="close" />
        </button>

        <div className="mb-4 text-center">
          <span className="label-caps text-xs text-cyan">Official Social Certification</span>
          <h3 className="font-display text-xl font-extrabold uppercase text-gold">
            Shareable Unicorn Card
          </h3>
        </div>

        {/* Card Preview */}
        {dataUrl && (
          <div className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img src={dataUrl} alt="Unicorn Share Card" className="h-auto w-full" />
          </div>
        )}

        {/* Actions Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            onClick={downloadImage}
            className="glow-gold label-caps flex items-center justify-center gap-2 rounded-xl bg-gold py-3 text-xs font-bold text-on-gold active:scale-95"
          >
            <Icon name="download" className="text-sm" />
            Save PNG
          </button>
          <button
            onClick={copyImage}
            className="glow-blue label-caps flex items-center justify-center gap-2 rounded-xl bg-cyan py-3 text-xs font-bold text-on-cyan active:scale-95"
          >
            <Icon name="content_copy" className="text-sm" />
            Copy Image
          </button>
          <button
            onClick={nativeShare}
            className="label-caps flex items-center justify-center gap-2 rounded-xl border border-white/20 py-3 text-xs font-bold text-foreground hover:bg-white/10 active:scale-95"
          >
            <Icon name="share" className="text-sm" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
