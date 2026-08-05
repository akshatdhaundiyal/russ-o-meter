export function ValuationCounter({ value }: { value: number }) {
  return (
    <div className="glass-panel glow-gold group relative w-full max-w-4xl overflow-hidden rounded-2xl p-8">
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan/20 blur-[60px] transition-all duration-1000 group-hover:bg-cyan/30" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gold/20 blur-[60px] transition-all duration-1000 group-hover:bg-gold/30" />

      <div className="absolute right-4 top-4 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan shadow-[0_0_10px_#00dce6]" />
        </span>
        <span className="label-caps text-[10px] text-cyan">Live</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <h3 className="label-caps mb-4 text-cyan">Current Valuation</h3>
        <div className="text-gradient-gold font-display flex items-center text-5xl font-extrabold tracking-tight md:text-7xl">
          <span>$</span>
          <span>{value.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}