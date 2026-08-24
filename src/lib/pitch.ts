import { VCPersona, VCPersonaId } from "./types";

export const VC_PERSONAS: VCPersona[] = [
  {
    id: "russ",
    name: "Russ Hanneman",
    role: "Tres Comas Capital",
    tagline: "Car doors that go like THIS. Not like this.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkYL75zyffkBFSs8R2BvNqqk4YoR9POVqBzEbKxKLOcCS1gBjbbe_VGS9LlRjHf3ZK9A7lQJCq61Tpka5y5Zpkbe8dYEkgvI06Pf-w9jVM2xfffst6JuKBzivYCG9gRuU5zHUTpIJkVvK64ehuFOHKuPGJPeEQNbo3RvYv4bOFgWzy57JySymzouc6px0YXmFmjWcglU7GYPMfxHNxVj8elpnxCRH1kmTSLqOwBnZoMYweb3V0pzg6",
    accentColor: "#ffe16d",
    badge: "3-Commas Legend",
    favoritePhrase: "ROI = Radio On Internet!",
  },
  {
    id: "gavin",
    name: "Gavin Belson",
    role: "Hooli Ecosystems",
    tagline: "I don't want to live in a world where someone else makes the world a better place.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBJeZ_pHXbLP_6T-KO9dIrBlkOh1BOX1y0QI3zhxTVSiee90OVFoZiggUtQclaTKBUGgDxoyfmOaY_IyBJ7Ea8PTwS2JhOPHqSjSeovUHgTlIa4-FLb8gdeb2nNN4gP82l8MUGlHvwu1ylrQyE7MeKGjLvYbwOmGF3B-okKZt2RgoPrjTqCmJjEbu9ARSpjlNQ1AAHUIHs2yElct3OC35y1zLt7AXR6K1T9cWi7CoxVlyEOxSoeqihQy8rLVGE8VkpTA",
    accentColor: "#00dce6",
    badge: "Holistic Visionary",
    favoritePhrase: "Nucleus compression paradigm.",
  },
  {
    id: "crypto",
    name: "Chad DePIN-DAO",
    role: "Proof-of-Hype Ventures",
    tagline: "Decentralized physical intelligence rollup on zero-knowledge GPU nodes.",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    accentColor: "#ff007f",
    badge: "WAGMI Principal",
    favoritePhrase: "Bullish on autonomous node liquidity.",
  },
  {
    id: "yc",
    name: "Garry Sequoia",
    role: "Orange Circle Capital",
    tagline: "Talk to users. Build something AI-native. Default alive.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    accentColor: "#ff8c00",
    badge: "Batch S26 Partner",
    favoritePhrase: "Is this growing 10% WoW organically?",
  },
];

export const BORING_IDEAS = [
  "An app that reminds you to drink water every hour",
  "A spreadsheet plugin to calculate sales tax in Delaware",
  "A to-do list for tracking cat naps and feeding times",
  "An alarm clock that sounds like seagulls until you solve math",
  "A digital stopwatch for boiling eggs perfectly",
  "A smart Bluetooth-enabled toothpick dispenser",
  "An automated email unsubscribe cleaner for grandparents",
  "A grocery list app organized by grocery store aisle number",
  "A browser extension that replaces all numbers with emojis",
  "A flashlight app with 3 adjustable strobe patterns",
  "A weather widget that only tells you if you need a light jacket",
  "A desktop sticky notes clone built in pure WebAssembly",
  "An app that generates random elevator music on demand",
  "A plant watering sensor that sends passive-aggressive SMS",
  "A bookmark manager that categorizes recipes you'll never cook",
  "A loyalty card scanner for local frozen yogurt shops",
  "A coin flipper app with realistic brass coin physics",
  "A soundboard of awkward coughs for Zoom meetings",
  "A digital ruler that only measures in inches and fractions of barleycorn",
  "A battery percentage widget that gives emotional pep talks",
];

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(list: T[], seed: number, offset: number): T {
  return list[(seed + offset * 7919) % list.length] as T;
}

const RUSS_ADJECTIVES = ["Tres-Comas-grade", "hyper-monetizable", "billionaire-ready", "zero-latency", "car-door-elevating"];
const RUSS_NOUNS = ["synergistic revenue engine", "market juggernaut", "paradigm disruptor", "cash-printing pipeline"];
const RUSS_VERBS = ["annihilating legacy friction", "unlocking nine-figure valuations", "dominating the un-disrupted"];
const RUSS_TAGS = ["#ThreeCommas", "#DoorsGoUp", "#ROI", "#SeriesA", "#BillionaireClub"];

const GAVIN_ADJECTIVES = ["holistically unified", "quantum-compressed", "pan-dimensional", "socio-technological"];
const GAVIN_NOUNS = ["neural compression architecture", "ecosystem operating matrix", "synergistic continuum"];
const GAVIN_VERBS = ["manifesting planetary alignment", "re-engineering human potential", "elevating the macro-substrate"];
const GAVIN_TAGS = ["#HooliVision", "#HolisticTech", "#MacroSubstrate", "#Compression", "#FutureNow"];

const CRYPTO_ADJECTIVES = ["zero-knowledge", "DePIN-native", "hyper-composable", "autonomous-agentic", "liquid-staked"];
const CRYPTO_NOUNS = ["decentralized compute mesh", "sovereign rollup primitive", "tokenomic validation layer"];
const CRYPTO_VERBS = ["incentivizing permissionless yield", "tokenizing physical intelligence", "bridging multi-chain liquidity"];
const CRYPTO_TAGS = ["#Web3", "#DePIN", "#ZKRollup", "#WAGMI", "#DecentralizedAI"];

const YC_ADJECTIVES = ["AI-native", "extreme-retention", "hyper-viral", "product-led", "category-creating"];
const YC_NOUNS = ["B2B workflow copilot", "enterprise intelligence layer", "vertical agentic workforce"];
const YC_VERBS = ["unlocking 20% WoW exponential growth", "automating the $400B enterprise stack", "delighting 100 passionate power users"];
const YC_TAGS = ["#YCS26", "#TalkToUsers", "#DefaultAlive", "#AIWorkforce", "#ProductMarketFit"];

export function generatePitch(
  idea: string,
  personaId: VCPersonaId = "russ"
): { pitch: string; tags: string[]; valuation: number } {
  const clean = idea.trim() || "a basic utilitarian utility";
  const seed = hash(clean + personaId) + Math.floor(Math.random() * 1000);
  const subject = clean.replace(/\.$/, "").toLowerCase();

  let adj = RUSS_ADJECTIVES;
  let nouns = RUSS_NOUNS;
  let verbs = RUSS_VERBS;
  let tagPool = RUSS_TAGS;
  let prefix = "We are deploying a";
  let suffix = `— because ${subject} was never just about ${subject}, it's about owning the entire stack.`;

  if (personaId === "gavin") {
    adj = GAVIN_ADJECTIVES;
    nouns = GAVIN_NOUNS;
    verbs = GAVIN_VERBS;
    tagPool = GAVIN_TAGS;
    prefix = "Behold the Genesis of a";
    suffix = `— bridging the philosophical divide between ${subject} and the cosmic human spirit.`;
  } else if (personaId === "crypto") {
    adj = CRYPTO_ADJECTIVES;
    nouns = CRYPTO_NOUNS;
    verbs = CRYPTO_VERBS;
    tagPool = CRYPTO_TAGS;
    prefix = "LFG: Building the first";
    suffix = `— decentralized ${subject} protocol backed by autonomous GPU nodes. 🚀`;
  } else if (personaId === "yc") {
    adj = YC_ADJECTIVES;
    nouns = YC_NOUNS;
    verbs = YC_VERBS;
    tagPool = YC_TAGS;
    prefix = "We are the AI-native standard for";
    suffix = `— replacing human toil in ${subject} with autonomous agentic intelligence.`;
  }

  const pitch = `"${prefix} ${pick(adj, seed, 1)} ${pick(nouns, seed, 2)} ${pick(verbs, seed, 3)} ${suffix}"`;
  const tags = Array.from(new Set([0, 1, 2, 3].map((i) => pick(tagPool, seed, i + 5))));

  // Base valuation computation
  const baseMultipliers = [150_000_000, 320_000_000, 850_000_000, 1_250_000_000, 2_400_000_000];
  const valuation = pick(baseMultipliers, seed, 7);

  return { pitch, tags, valuation };
}

export function generateBattleRoast(
  p1Idea: string,
  p2Idea: string,
  personaId: VCPersonaId = "russ"
): { winner: 1 | 2; verdict: string; roast1: string; roast2: string; p1Valuation: number; p2Valuation: number } {
  const seed = hash(p1Idea + p2Idea);
  const p1Val = 50_000_000 + (seed % 950_000_000);
  const p2Val = 50_000_000 + ((seed * 7) % 950_000_000);
  const winner: 1 | 2 = p1Val >= p2Val ? 1 : 2;

  const roasts = {
    russ: [
      "I wouldn't invest in this if it had doors that opened into a parallel dimension.",
      "This idea made my Tres Comas tequila taste like tap water.",
      "You are turning a billion-dollar market into a lemonade stand.",
      "This is what failure looks like when you spell it in comic sans.",
    ],
    gavin: [
      "This lack of holistic cohesion insults the very essence of computational elegance.",
      "A regression to pre-digital mediocrity wrapped in hubris.",
      "My spiritual guru advised me that associating with this idea would deplete my karma.",
      "It lacks the gravitas of a truly unified enterprise paradigm.",
    ],
    crypto: [
      "0x zero utility, negative token velocity, straight to liquidity drain.",
      "Looks like a rug-pull before the smart contract is even deployed.",
      "Not even decentralized GPU nodes could rescue this throughput.",
      "Straight down-only chart dynamics.",
    ],
    yc: [
      "Have you talked to a single user who didn't cry upon seeing this?",
      "Not default alive. More like default comatose.",
      "This is a solution in search of a problem that actively avoids it.",
      "Growth metrics are flatter than a Silicon Valley pancake.",
    ],
  };

  const pool = roasts[personaId];
  const roast1 = pick(pool, seed, 2);
  const roast2 = pick(pool, seed, 4);

  const winningIdea = winner === 1 ? p1Idea : p2Idea;
  const verdict = `After intense deliberation, "${winningIdea.slice(0, 30)}..." hyper-scales to $${(winner === 1 ? p1Val : p2Val).toLocaleString()} and takes the term sheet!`;

  return {
    winner,
    verdict,
    roast1,
    roast2,
    p1Valuation: p1Val,
    p2Valuation: p2Val,
  };
}