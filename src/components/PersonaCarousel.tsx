import { VC_PERSONAS } from "@/lib/pitch";
import { VCPersonaId } from "@/lib/types";
import { sound } from "@/lib/audio";

interface PersonaCarouselProps {
  selectedId: VCPersonaId;
  onSelect: (id: VCPersonaId) => void;
}

export function PersonaCarousel({ selectedId, onSelect }: PersonaCarouselProps) {
  const handleSelect = (id: VCPersonaId) => {
    sound.playPop();
    onSelect(id);
  };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="label-caps flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
          Lead Investor Persona
        </span>
        <span className="text-[11px] font-semibold text-gold">
          {VC_PERSONAS.find((p) => p.id === selectedId)?.badge}
        </span>
      </div>

      {/* Horizontal Story Carousel */}
      <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 pt-1 md:mx-0 md:px-0">
        {VC_PERSONAS.map((persona) => {
          const isSelected = persona.id === selectedId;
          return (
            <button
              key={persona.id}
              onClick={() => handleSelect(persona.id)}
              className={`group relative flex min-w-[155px] flex-1 flex-col items-center rounded-2xl p-3.5 text-center transition-all duration-300 md:min-w-[180px] ${
                isSelected
                  ? "border-2 border-gold bg-gold/10 shadow-[0_0_25px_rgba(255,225,109,0.25)] scale-[1.02]"
                  : "border border-white/10 bg-surface-high/40 hover:border-white/20 hover:bg-surface-high/70 opacity-75 hover:opacity-100"
              }`}
            >
              {isSelected && (
                <span className="absolute -top-2.5 rounded-full bg-gold px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-on-gold shadow-md">
                  Active
                </span>
              )}

              <div className="relative mb-2.5">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className={`h-14 w-14 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    isSelected
                      ? "ring-2 ring-gold ring-offset-2 ring-offset-black"
                      : "ring-1 ring-white/20"
                  }`}
                />
              </div>

              <div className="w-full">
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{persona.name}</h4>
                <p className="label-caps mt-0.5 text-[9px] text-cyan line-clamp-1">{persona.role}</p>
                <p className="mt-1.5 text-[10px] italic text-muted-foreground line-clamp-2 leading-tight">
                  "{persona.favoritePhrase}"
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
