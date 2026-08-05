import { Icon } from "./Icon";

const AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCkYL75zyffkBFSs8R2BvNqqk4YoR9POVqBzEbKxKLOcCS1gBjbbe_VGS9LlRjHf3ZK9A7lQJCq61Tpka5y5Zpkbe8dYEkgvI06Pf-w9jVM2xfffst6JuKBzivYCG9gRuU5zHUTpIJkVvK64ehuFOHKuPGJPeEQNbo3RvYv4bOFgWzy57JySymzouc6px0YXmFmjWcglU7GYPMfxHNxVj8elpnxCRH1kmTSLqOwBnZoMYweb3V0pzg6";

const items = [
  { icon: "rocket_launch", label: "Hype Engine", active: true },
  { icon: "show_chart", label: "Valuation Lab" },
  { icon: "local_fire_department", label: "Burn Rate" },
  { icon: "diamond", label: "LP Dashboard" },
];

export function SideNav({ onPitch }: { onPitch: () => void }) {
  return (
    <nav className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col space-y-6 border-r border-white/5 bg-black/40 py-6 shadow-[10px_0_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:flex">
      <div className="flex flex-col items-center border-b border-white/5 px-6 pb-4 pt-8">
        <img
          alt="Principal VC avatar"
          className="mb-4 h-20 w-20 rounded-full border-2 border-gold object-cover shadow-[0_0_20px_rgba(255,225,109,0.3)]"
          src={AVATAR}
          loading="lazy"
        />
        <h2 className="label-caps text-gold">Series A+ Only</h2>
        <p className="label-caps mt-1 text-[10px] text-cyan">Unicorn Hunter Mode</p>
      </div>

      <div className="flex-1 space-y-2 px-4">
        {items.map((item) => (
          <a
            key={item.label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={
              item.active
                ? "flex items-center rounded-lg border-r-4 border-cyan bg-cyan/10 px-4 py-3 text-cyan transition-all duration-200"
                : "flex items-center rounded-lg px-4 py-3 text-outline transition-all duration-200 hover:bg-surface-high hover:text-foreground"
            }
          >
            <Icon name={item.icon} className="mr-4" filled={item.active} />
            <span className="label-caps tracking-widest">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="px-4 pb-8">
        <button
          onClick={onPitch}
          className="glow-gold label-caps w-full rounded-lg bg-gold py-3 text-on-gold transition-all duration-300"
        >
          Pitch Now
        </button>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-4 flex items-center rounded-lg px-4 py-3 text-outline transition-all duration-200 hover:bg-surface-high hover:text-foreground"
        >
          <Icon name="settings" className="mr-4" />
          <span className="label-caps tracking-widest">Settings</span>
        </a>
      </div>
    </nav>
  );
}