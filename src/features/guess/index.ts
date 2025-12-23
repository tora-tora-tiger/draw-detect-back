import { zValidator } from "@hono/zod-validator";
import { factory } from "@/factory";
import { createLLMClient } from "@/lib/llm/client";
import { createLLM } from "@/lib/llm/llm.factory";
import { ok } from "@/utils/response";
import { createGuessService } from "./guess.service";
import { GuessRequestSchema } from "./type";

// Hono インスタンスを作成
const guess = factory.createApp();

guess.post("/", zValidator("form", GuessRequestSchema), async c => {
  const llm = createLLM(c);
  const llmClient = createLLMClient(llm);
  const srv = createGuessService(llmClient);

  try {
    const { topic, image } = c.req.valid("form");

    const guessWord = await srv.guess(topic, image);

    return c.json(ok({ guessWord }));
  } catch {
    // console.error("Error in guess endpoint:", error);
    return c.json(
      {
        type: "INTERNAL_SERVER_ERROR",
      },
      500,
    );
  }
});

export default guess;
