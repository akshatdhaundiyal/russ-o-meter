import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const Input = z.object({ idea: z.string().max(500) });

const SYSTEM = `You are a parody Silicon Valley VC pitch generator for a joke app called the Russ-O-Meter.
Take the user's boring app idea and rewrite it as one absurdly overhyped, buzzword-dense VC pitch sentence
(AI-native, hyper-scalable, category-defining, etc). Be funny, confident and ridiculous. Max 45 words.
Respond ONLY with minified JSON: {"pitch":"<the pitch, wrapped in double quotes inside the string>","tags":["#Tag1","#Tag2","#Tag3","#Tag4"]}`;

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

    const result = streamText({
      model: lovable.responses("openai/gpt-5.6-sol"),
      system: SYSTEM,
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
