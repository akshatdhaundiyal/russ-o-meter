const adjectives = [
  "AI-native",
  "quantum-resilient",
  "zero-latency",
  "Web3-enabled",
  "carbon-negative",
  "self-optimizing",
  "hyper-composable",
];

const nouns = [
  "orchestrator",
  "ecosystem",
  "protocol layer",
  "mesh",
  "operating system",
  "primitive",
];

const verbs = [
  "disrupting",
  "unbundling",
  "re-platforming",
  "hyper-scaling",
  "democratizing",
];

const domains = [
  "legacy frameworks",
  "the trillion-dollar attention market",
  "the personal moisture economy",
  "human coordination overhead",
  "the offline world",
];

const tagPool = [
  "#AI",
  "#Web3",
  "#Disruptive",
  "#Decentralized",
  "#SeriesA",
  "#Decacorn",
  "#ThreeCommas",
  "#ZeroToOne",
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

export function generatePitch(idea: string): { pitch: string; tags: string[] } {
  const clean = idea.trim();
  const seed = hash(clean || "boring idea") + Math.floor(Math.random() * 1000);
  const subject = clean
    ? clean.replace(/\.$/, "").toLowerCase()
    : "a synergistic paradigm shift";

  const pitch = `"We are building a ${pick(adjectives, seed, 1)}, ${pick(
    adjectives,
    seed,
    2,
  )} ${pick(nouns, seed, 3)} ${pick(verbs, seed, 4)} ${pick(
    domains,
    seed,
    5,
  )} — because ${subject} was never really about ${subject}."`;

  const tags = [0, 1, 2, 3].map((i) => pick(tagPool, seed, i + 11));
  return { pitch, tags: Array.from(new Set(tags)) };
}