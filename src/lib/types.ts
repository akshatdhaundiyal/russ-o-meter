export type NavTab = "hype" | "valuation-lab" | "burn-rate" | "lp-dashboard" | "pitch-battle";

export type VCPersonaId = "russ" | "gavin" | "crypto" | "yc";

export interface VCPersona {
  id: VCPersonaId;
  name: string;
  role: string;
  tagline: string;
  avatar: string;
  accentColor: string;
  badge: string;
  favoritePhrase: string;
}

export interface SavedPitch {
  id: string;
  originalIdea: string;
  pitch: string;
  tags: string[];
  valuation: number;
  persona: VCPersonaId;
  createdAt: number;
}

export interface BurnExpense {
  id: string;
  name: string;
  category: "perks" | "compute" | "marketing" | "swag";
  monthlyCost: number;
  active: boolean;
  flavorText: string;
}

export interface BattlePlayer {
  name: string;
  idea: string;
  pitch?: string;
  tags?: string[];
  valuation?: number;
  roast?: string;
}

export interface BattleResult {
  winner: 1 | 2 | "tie";
  verdict: string;
  p1: BattlePlayer;
  p2: BattlePlayer;
}
