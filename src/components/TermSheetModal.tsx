import { Icon } from "./Icon";
import { toast } from "sonner";
import { sound } from "@/lib/audio";

interface TermSheetModalProps {
  open: boolean;
  onClose: () => void;
  valuation?: number;
}

export function TermSheetModal({ open, onClose, valuation = 1_000_000_000 }: TermSheetModalProps) {
  if (!open) return null;

  const copyLegalText = async () => {
    sound.playPop();
    const text = `CONFIDENTIAL SERIES SEED/A TERM SHEET (PARODY)
ISSUER: Hyper-Inflated Side Project Inc.
VALUATION: $${valuation.toLocaleString()} (Pre-Money)
INVESTOR: Tres Comas Capital / Syndicate Partners

KEY CLAUSES:
1. VEHICLE DOOR RESTRICTION: The Founder covenants that any vehicle operated using company capital shall possess doors that actuate vertically (i.e. 'like THIS'), thereby establishing appropriate billionaire aura.
2. LIQUIDATION PREFERENCE: 10x Non-Participating, senior to all common equity, redeemable in gold bullion or aged blue-agave tequila.
3. KROGER-AGI CLAUSE: In the event of emergent Artificial General Intelligence, all founder voting rights transfer to the algorithm.
4. KAZOO ARBITRATION: All disputes settled via 3-minute kazoo duel.`;

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Term sheet legal clauses copied to clipboard.");
    } catch {
      toast.error("Failed to copy term sheet.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="glass-panel relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-gold p-6 shadow-[0_0_80px_rgba(255,225,109,0.3)] md:p-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-white"
        >
          <Icon name="close" />
        </button>

        {/* Header */}
        <div className="border-b border-white/15 pb-4 text-center">
          <span className="label-caps text-[10px] text-cyan">Official Legal Instrument</span>
          <h3 className="font-display text-xl font-extrabold uppercase text-gold md:text-2xl mt-1">
            Series Unicorn Term Sheet
          </h3>
          <p className="text-xs text-muted-foreground">
            Form NVCA-TRES-COMAS-Rev-2026
          </p>
        </div>

        {/* Legal Document Content */}
        <div className="my-6 space-y-4 rounded-xl bg-black/50 p-4 font-mono text-xs leading-relaxed text-foreground/90 md:p-6">
          <div className="border-b border-white/10 pb-3">
            <span className="text-cyan">ISSUER:</span> Stealth Unicorn Labs Inc. ("Company")<br />
            <span className="text-cyan">PRE-MONEY VALUATION:</span> ${valuation.toLocaleString()}<br />
            <span className="text-cyan">LEAD INVESTOR:</span> Russ Hanneman / Tres Comas Syndicate
          </div>

          <div>
            <h4 className="font-bold text-gold">SECTION 1. DOOR DYNAMICS & EXECUTIVE PROTOCOL</h4>
            <p className="mt-1 text-muted-foreground">
              Founder agrees that company prestige directly correlates with vehicle ingress mechanics. All founder-driven motor vehicles must feature scissor, butterfly, or gull-wing doors. Sideways opening doors are deemed an immediate Event of Default.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gold">SECTION 2. LIQUIDATION PREFERENCE & SPIRITS</h4>
            <p className="mt-1 text-muted-foreground">
              Investors shall receive a 10x non-participating senior liquidation preference. In the event of dissolution, remaining server racks and artisanal tequila shall be disbursed directly to Preferred Shareholders.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gold">SECTION 3. AUTONOMOUS AGENT INDEMNITY</h4>
            <p className="mt-1 text-muted-foreground">
              If the deployed LLM agents achieve sentience and launch their own hedge fund, the Company shall maintain a 2% perpetual carry on all robotic transactions.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gold">SECTION 4. REVENUE COVENANT (NEGATIVE PLEDGE)</h4>
            <p className="mt-1 text-muted-foreground">
              Founder pledges NOT to generate real, measurable profit during the first 48 months, as cashflow will introduce arithmetic valuation constraints to the narrative.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={copyLegalText}
            className="glow-blue label-caps flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan py-3.5 text-xs font-bold text-on-cyan active:scale-95"
          >
            <Icon name="content_copy" className="text-sm" />
            Copy Term Sheet Text
          </button>
          <button
            onClick={() => {
              sound.playPop();
              window.print();
            }}
            className="glow-gold label-caps flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold bg-gold/15 py-3.5 text-xs font-bold text-gold hover:bg-gold/25 active:scale-95"
          >
            <Icon name="print" className="text-sm" />
            Print / Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
