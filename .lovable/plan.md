# Russ-O-Meter

A one-page joke app that turns a boring app idea into an absurd VC pitch and an inflating valuation. Both HTML screens are the same product: desktop (side nav) and mobile (top bar + bottom nav), so this ships as one responsive page at `/`.

## What it does

- Hero: giant gold gradient "RUSS-O-METER" title and tagline.
- Valuation counter in a glass panel, animating up on load, with a "Live" pulse orb.
- Textarea for the boring idea.
- Two actions: "Hyper-Inflate Pitch" (neon blue) generates a buzzword pitch; "Add a Comma ($100M)" (gold) multiplies the valuation by 1000.
- Generated-pitch card: terminal-style header, italic pitch text, hashtag chips, Copy and Share buttons.
- After 3 commas: full-screen celebration overlay ("Welcome to the Three Comma Club") with hotlinked trophy image, plus a canvas confetti burst.
- Desktop side nav (avatar, Hype Engine / Valuation Lab / Burn Rate / LP Dashboard, PITCH NOW, Settings); mobile top app bar plus bottom nav (Inflate / Network / Exit).

Pitch generation is local and deterministic — a buzzword template engine seeded from the entered idea. No backend, no accounts, nothing stored.

## Design system

Port the prototype tokens into `src/styles.css`: dark abyssal background `#0b0f17` with cyan/gold radial glows, gold `#ffe16d`, cyan `#00dce6`, surface greys, glass panels (blur + top highlight edge), neon gold/blue glow shadows, gold and blue gradient text, rounded-xl/2xl corners. Fonts loaded via `<link>` in `__root.tsx`: Sora (display/headline), Space Grotesk (label caps), Plus Jakarta Sans (body), Material Symbols Outlined for icons.

## Technical notes

- Single route `src/routes/index.tsx` replacing the placeholder, with its own `head()` metadata (title, description, og/twitter).
- Components under `src/components/`: `SideNav`, `MobileTopBar`, `BottomNav`, `ValuationCounter`, `IdeaInput`, `ActionButtons`, `PitchCard`, `CelebrationOverlay`, `Confetti`.
- Valuation/comma/pitch state lives in the page component; counter animation and confetti use `requestAnimationFrame` inside `useEffect` (client-only, so no SSR mismatch).
- Images (avatar, trophy) hotlinked from the prototype URLs.
- Copy uses the clipboard API with a sonner toast; Share opens an X intent URL.