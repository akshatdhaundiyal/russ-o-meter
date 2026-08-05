import { Icon } from "./Icon";

const TROPHY =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBBJeZ_pHXbLP_6T-KO9dIrBlkOh1BOX1y0QI3zhxTVSiee90OVFoZiggUtQclaTKBUGgDxoyfmOaY_IyBJ7Ea8PTwS2JhOPHqSjSeovUHgTlIa4-FLb8gdeb2nNN4gP82l8MUGlHvwu1ylrQyE7MeKGjLvYbwOmGF3B-okKZt2RgoPrjTqCmJjEbu9ARSpjlNQ1AAHUIHs2yElct3OC35y1zLt7AXR6K1T9cWi7CoxVlyEOxSoeqihQy8rLVGE8VkpTA";

export function CelebrationOverlay({
  open,
  onClose,
  onTweet,
}: {
  open: boolean;
  onClose: () => void;
  onTweet: () => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-abyss/90 backdrop-blur-xl transition-opacity duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="glass-panel relative mx-4 flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-3xl border-2 border-gold p-8 text-center shadow-[0_0_100px_rgba(255,225,109,0.5)] md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,225,109,0.2),transparent_70%)]" />
        <div className="group relative mb-8">
          <div className="absolute -inset-4 rounded-full bg-gold/20 blur-2xl transition-all duration-700 group-hover:bg-gold/40" />
          <img
            alt="Three Commas Club"
            src={TROPHY}
            className="relative z-10 h-36 w-64 rounded-xl border border-gold object-cover shadow-[0_0_30px_rgba(255,225,109,0.4)]"
          />
        </div>
        <h2 className="font-display mb-4 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-2xl font-extrabold uppercase tracking-tight text-transparent md:text-4xl">
          Welcome to the Three Commas Club! 🥃
        </h2>
        <p className="mb-8 max-w-md text-muted-foreground">
          This app does not delete files from your server, but it will raise your valuation by $1B.
        </p>
        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={onTweet}
            className="glow-gold label-caps flex items-center justify-center rounded-xl bg-gold px-8 py-4 text-on-gold transition-transform hover:scale-105"
          >
            Pour a Glass &amp; Tweet Valuation
            <Icon name="share" className="ml-2 text-sm" />
          </button>
          <button
            onClick={onClose}
            className="label-caps rounded-xl border border-white/20 px-8 py-4 text-foreground transition-colors hover:bg-white/5"
          >
            Stay Humble
          </button>
        </div>
      </div>
    </div>
  );
}