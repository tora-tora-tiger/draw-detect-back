import type { Context } from "hono";
import { gemini } from "./gemini.adapter";
import type { LLM, Prompt } from "./type";

// Hono Context から環境変数を取得して LLM を作成
export function createLLM(c: Context): LLM {
  const apiKey = c.env.GEMINI_API_KEY;

  return {
    ask: (prompt: Prompt) => gemini(apiKey, prompt),
  };
}
