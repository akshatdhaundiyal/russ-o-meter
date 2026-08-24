# Contributing & Extension Guide

Want to add new VC personas, satirical buzzwords, or sound effects to the **Russ-O-Meter**? Follow these guidelines.

---

## 1. Adding a New VC Persona

1. Open `src/lib/types.ts` and add your persona ID to `VCPersonaId`:
   ```ts
   export type VCPersonaId = "russ" | "gavin" | "crypto" | "yc" | "new_persona";
   ```

2. Open `src/lib/pitch.ts` and add persona metadata to `VC_PERSONAS`:
   ```ts
   {
     id: "new_persona",
     name: "Marc Hyper-Scale",
     role: "Software Is Eating Everything Capital",
     tagline: "It is time to build AGI in a submarine.",
     avatar: "https://...",
     accentColor: "#...",
     badge: "Techno-Optimist",
     favoritePhrase: "Build faster.",
   }
   ```

3. Add procedural dictionary arrays in `src/lib/pitch.ts` and update the AI system prompt in `src/lib/pitch.functions.ts`.

---

## 2. Adding a New Buzzword or Penalty

Open `src/components/ValuationLab.tsx` and add an entry to `BUZZWORDS`:
```ts
{
  id: "my_buzzword",
  name: "Biological Neural Organoids",
  category: "buzzword", // or "penalty"
  multiplier: 60,       // or 0.1 for a penalty
  description: "Growing mini brains on silicon wafers to train TikTok algorithms.",
  icon: "psychology",   // Material Symbols icon name
}
```

---

## 3. Adding a New Burn Rate Expense

Open `src/components/BurnRateSimulator.tsx` and add an entry to `DEFAULT_EXPENSES`:
```ts
{
  id: "private_jet",
  name: "Shared Gulfstream Fractional Ownership",
  category: "perks",
  monthlyCost: 220_000,
  active: false,
  flavorText: "Flying commercial would damage founder velocity.",
}
```
