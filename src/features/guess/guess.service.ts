import type { LLMClient } from "@/lib/llm/type";
import type { GuessResult } from "./type";

export function createGuessService(llmClient: LLMClient) {
  async function guess(topic: string, image: File): Promise<GuessResult> {
    const guessWord = await llmClient.guessWord(topic, image);
    return { guessWord };
  }

  return {
    guess,
  };
}
