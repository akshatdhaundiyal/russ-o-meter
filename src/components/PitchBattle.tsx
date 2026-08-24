import { useState } from "react";
import { Icon } from "./Icon";
import { BORING_IDEAS, generateBattleRoast, generatePitch, VC_PERSONAS } from "@/lib/pitch";
import { VCPersonaId } from "@/lib/types";
import { sound } from "@/lib/audio";
import { Confetti } from "./Confetti";

interface PitchBattleProps {
  activePersonaId: VCPersonaId;
}

export function PitchBattle({ activePersonaId }: PitchBattleProps) {
  const [step, setStep] = useState<"p1_input" | "pass_device" | "p2_input" | "battling" | "result">("p1_input");
  const [p1Idea, setP1Idea] = useState("");
  const [p2Idea, setP2Idea] = useState("");
  const [burst, setBurst] = useState(0);
  const [battleResult, setBattleResult] = useState<ReturnType<typeof generateBattleRoast> | null>(null);
  const [p1Pitch, setP1Pitch] = useState<ReturnType<typeof generatePitch> | null>(null);
  const [p2Pitch, setP2Pitch] = useState<ReturnType<typeof generatePitch> | null>(null);

  const fallbackPersona = VC_PERSONAS[0]!;
  const persona = VC_PERSONAS.find((p) => p.id === activePersonaId) ?? fallbackPersona;

  const rollP1 = () => {
    sound.playPop();
    const random = BORING_IDEAS[Math.floor(Math.random() * BORING_IDEAS.length)] ?? BORING_IDEAS[0]!;
    setP1Idea(random);
  };

  const rollP2 = () => {
    sound.playPop();
    const random = BORING_IDEAS[Math.floor(Math.random() * BORING_IDEAS.length)] ?? BORING_IDEAS[0]!;
    setP2Idea(random);
  };

  const submitP1 = () => {
    if (!p1Idea.trim()) return;
    sound.playPop();
    setStep("pass_device");
  };

  const startP2 = () => {
    sound.playPop();
    setStep("p2_input");
  };

  const runBattle = () => {
    if (!p2Idea.trim()) return;
    sound.playRocketLaunch();
    setStep("battling");

    setTimeout(() => {
      const p1Generated = generatePitch(p1Idea, activePersonaId);
      const p2Generated = generatePitch(p2Idea, activePersonaId);
      const roastResult = generateBattleRoast(p1Idea, p2Idea, activePersonaId);

      setP1Pitch(p1Generated);
      setP2Pitch(p2Generated);
      setBattleResult(roastResult);
      setStep("result");
      setBurst((b) => b + 1);
      sound.playCelebrationFanfare();
    }, 1800);
  };

  const resetBattle = () => {
    sound.playPop();
    setP1Idea("");
    setP2Idea("");
    setBattleResult(null);
    setStep("p1_input");
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 pb-12">
      <Confetti burst={burst} />

      {/* Header */}
      <div className="text-center">
        <h2 className="text-gradient-gold font-display text-2xl font-bold uppercase tracking-tight md:text-4xl">
          2-Player Pitch Battle
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground md:text-sm">
          Pass your phone to a friend. Pitch your boring ideas head-to-head and see who gets funded or roasted by {persona.name}.
        </p>
      </div>

      {/* Step 1: Player 1 Input */}
      {step === "p1_input" && (
        <div className="glass-panel mx-auto max-w-xl rounded-3xl p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="label-caps rounded-full bg-cyan/15 px-3 py-1 text-xs font-bold text-cyan">
              Player 1 — Challenger
            </span>
            <button
              onClick={rollP1}
              className="label-caps flex items-center gap-1 text-[11px] text-gold hover:underline"
            >
              <Icon name="casino" className="text-sm" />
              Surprise Me 🎲
            </button>
          </div>

          <label className="label-caps mb-3 block text-xs text-muted-foreground" htmlFor="p1-input">
            Enter your boring app idea
          </label>
          <textarea
            id="p1-input"
            rows={3}
            value={p1Idea}
            onChange={(e) => setP1Idea(e.target.value)}
            placeholder="e.g., A spreadsheet plugin to calculate sales tax in Delaware"
            className="veblen-input w-full resize-none rounded-xl p-4 text-sm"
          />

          <button
            onClick={submitP1}
            disabled={!p1Idea.trim()}
            className="glow-blue label-caps mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan py-4 text-xs font-bold text-on-cyan disabled:opacity-50"
          >
            Lock in Pitch 1 & Pass Phone
            <Icon name="arrow_forward" />
          </button>
        </div>
      )}

      {/* Step 2: Pass Phone Screen */}
      {step === "pass_device" && (
        <div className="glass-panel mx-auto max-w-md rounded-3xl p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Icon name="phone_iphone" className="text-3xl animate-bounce" />
          </div>
          <h3 className="font-display text-xl font-extrabold text-gradient-gold">
            Pass the Phone to Player 2!
          </h3>
          <p className="mt-2 text-xs text-muted-foreground">
            No peeking at Player 1's idea. Hand the device over to lock in Challenger 2.
          </p>

          <button
            onClick={startP2}
            className="glow-gold label-caps mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-4 text-xs font-bold text-on-gold"
          >
            I am Player 2 — Let's Battle
            <Icon name="play_arrow" />
          </button>
        </div>
      )}

      {/* Step 3: Player 2 Input */}
      {step === "p2_input" && (
        <div className="glass-panel mx-auto max-w-xl rounded-3xl p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="label-caps rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
              Player 2 — Rival
            </span>
            <button
              onClick={rollP2}
              className="label-caps flex items-center gap-1 text-[11px] text-cyan hover:underline"
            >
              <Icon name="casino" className="text-sm" />
              Surprise Me 🎲
            </button>
          </div>

          <label className="label-caps mb-3 block text-xs text-muted-foreground" htmlFor="p2-input">
            Enter your boring app idea
          </label>
          <textarea
            id="p2-input"
            rows={3}
            value={p2Idea}
            onChange={(e) => setP2Idea(e.target.value)}
            placeholder="e.g., An alarm clock that sounds like seagulls"
            className="veblen-input w-full resize-none rounded-xl p-4 text-sm"
          />

          <button
            onClick={runBattle}
            disabled={!p2Idea.trim()}
            className="glow-gold label-caps mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-4 text-xs font-bold text-on-gold disabled:opacity-50"
          >
            Commence Head-to-Head Pitch Battle! 🥊
          </button>
        </div>
      )}

      {/* Battling Animation */}
      {step === "battling" && (
        <div className="glass-panel mx-auto flex max-w-md flex-col items-center rounded-3xl p-10 text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
            <Icon name="local_fire_department" className="text-5xl text-gold animate-pulse" />
          </div>
          <h3 className="font-display text-2xl font-black text-gradient-gold">
            VC DELIBERATION IN PROGRESS
          </h3>
          <p className="mt-2 text-xs text-muted-foreground">
            {persona.name} is calculating hype-to-burn ratios and tasting the tequila...
          </p>
        </div>
      )}

      {/* Step 4: Battle Result */}
      {step === "result" && battleResult && p1Pitch && p2Pitch && (
        <div className="space-y-6">
          {/* Winner Banner */}
          <div className="glass-panel border-2 border-gold p-6 text-center shadow-[0_0_50px_rgba(255,225,109,0.3)] md:p-8 rounded-3xl">
            <span className="label-caps text-xs text-gold">Judged by {persona.name} ({persona.badge})</span>
            <h3 className="font-display text-2xl font-black text-gradient-gold md:text-4xl mt-2">
              🏆 PLAYER {battleResult.winner} TAKES THE UNICORN ROUND!
            </h3>
            <p className="mt-3 text-xs italic text-cyan md:text-sm">
              "{battleResult.verdict}"
            </p>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Player 1 Card */}
            <div
              className={`glass-panel rounded-2xl p-6 ${
                battleResult.winner === 1 ? "border-2 border-cyan shadow-[0_0_30px_rgba(0,220,230,0.2)]" : "opacity-75"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label-caps text-xs font-bold text-cyan">Player 1</span>
                <span className="font-display text-base font-extrabold text-cyan">
                  ${battleResult.p1Valuation.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">"{p1Idea}"</p>
              <p className="my-3 text-xs italic leading-relaxed text-foreground">{p1Pitch.pitch}</p>
              <div className="rounded-xl bg-destructive/10 p-3 text-[11px] text-destructive">
                <strong>VC Roast:</strong> "{battleResult.roast1}"
              </div>
            </div>

            {/* Player 2 Card */}
            <div
              className={`glass-panel rounded-2xl p-6 ${
                battleResult.winner === 2 ? "border-2 border-gold shadow-[0_0_30px_rgba(255,225,109,0.2)]" : "opacity-75"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label-caps text-xs font-bold text-gold">Player 2</span>
                <span className="font-display text-base font-extrabold text-gold">
                  ${battleResult.p2Valuation.toLocaleString()}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">"{p2Idea}"</p>
              <p className="my-3 text-xs italic leading-relaxed text-foreground">{p2Pitch.pitch}</p>
              <div className="rounded-xl bg-destructive/10 p-3 text-[11px] text-destructive">
                <strong>VC Roast:</strong> "{battleResult.roast2}"
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-center pt-4">
            <button
              onClick={resetBattle}
              className="glow-gold label-caps flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-xs font-bold text-on-gold active:scale-95"
            >
              <Icon name="replay" />
              Rematch / Battle Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
