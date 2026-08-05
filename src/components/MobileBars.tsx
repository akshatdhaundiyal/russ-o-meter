import { Icon } from "./Icon";

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-white/10 bg-abyss/60 px-5 shadow-[0_0_30px_rgba(0,220,230,0.15)] backdrop-blur-xl md:hidden">
      <h1 className="font-display text-2xl font-extrabold text-gold drop-shadow-[0_0_10px_rgba(255,225,109,0.5)]">
        Russ-O-Meter
      </h1>
      <div className="flex gap-4">
        <button className="text-gold transition-colors duration-300 hover:text-cyan" aria-label="Money">
          <Icon name="monetization_on" />
        </button>
        <button className="text-gold transition-colors duration-300 hover:text-cyan" aria-label="Wallet">
          <Icon name="account_balance_wallet" />
        </button>
      </div>
    </header>
  );
}

const tabs = [
  { icon: "trending_up", label: "Inflate", active: true },
  { icon: "groups", label: "Network" },
  { icon: "exit_to_app", label: "Exit" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-xl border-t border-white/20 bg-surface-high/40 px-4 py-3 shadow-[0_-10px_40px_rgba(255,225,109,0.1)] backdrop-blur-lg md:hidden">
      {tabs.map((tab) => (
        <a
          key={tab.label}
          href="#"
          onClick={(e) => e.preventDefault()}
          className={
            tab.active
              ? "flex w-20 flex-col items-center justify-center rounded-xl bg-gold/20 p-2 text-gold transition-transform active:scale-90"
              : "flex w-20 flex-col items-center justify-center p-2 text-muted-foreground transition-transform active:scale-90"
          }
        >
          <Icon name={tab.icon} className="mb-1" filled={tab.active} />
          <span className="label-caps text-[10px] tracking-normal">{tab.label}</span>
        </a>
      ))}
    </nav>
  );
}