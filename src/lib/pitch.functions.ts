import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const Input = z.object({
  idea: z.string().max(500),
  persona: z.enum(["russ", "gavin", "crypto", "yc"]).optional(),
});

function getSystemPrompt(persona: string = "russ") {
  const base = `You are a parody Silicon Valley VC pitch generator for a comedy app called the Russ-O-Meter.
Take the user's boring app idea and rewrite it into one absurdly overhyped, buzzword-dense VC pitch sentence.
Respond ONLY with minified JSON: {"pitch":"<the pitch wrapped in quotes>","tags":["#Tag1","#Tag2","#Tag3","#Tag4"]}`;

  if (persona === "gavin") {
    return `${base}\nTone: You are Gavin Belson from Hooli. Focus on holistic compression, philosophical alignment, socio-economic paradigm shifts, and animal analogies. Sophisticated, pompous, corporate-visionary. Max 45 words.`;
  }
  if (persona === "crypto") {
    return `${base}\nTone: You are a crypto/Web3 degen VC. Focus on DePIN, zero-knowledge rollups, tokenized autonomous GPU nodes, staking yield, and WAGMI energy. Max 45 words.`;
  }
  if (persona === "yc") {
    return `${base}\nTone: You are a Y Combinator partner. Focus on product-led growth, AI-native vertical workflow copilots, talking to users, 20% WoW compounding, and default alive. Max 45 words.`;
  }
  return `${base}\nTone: You are Russ Hanneman (Silicon Valley). Obsessed with Three Commas, billion-dollar valuations, ROI, car doors that open vertically, and unhinged confidence. Max 45 words.`;
}

export const generatePitchAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayRunIdFetch } = await import("./ai-gateway.server");
    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch.fetch,
    });

    const system = getSystemPrompt(data.persona || "russ");

    const result = streamText({
      model: lovable.responses("openai/gpt-5.6-sol"),
      system,
      prompt: data.idea.trim() || "an app that reminds you to drink water",
      providerOptions: {
        openai: { reasoningEffort: "low", store: false },
      },
    });

    const text = await result.text;
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Model returned no pitch");
    const parsed = JSON.parse(match[0]) as { pitch?: string; tags?: string[] };
    if (!parsed.pitch) throw new Error("Model returned no pitch");

    return {
      pitch: parsed.pitch,
      tags: (parsed.tags ?? []).slice(0, 4).filter(Boolean),
    };
  });
