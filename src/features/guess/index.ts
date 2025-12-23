import { factory } from "@/factory";
import { createLLMClient } from "@/lib/llm/client";
import { createLLM } from "@/lib/llm/llm.factory";
import { ok } from "@/utils/response";

// Hono インスタンスを作成
const guess = factory.createApp();

guess.post("/", async c => {
  const llm = createLLM(c);
  const llmClient = createLLMClient(llm);

  try {
    const body = await c.req.parseBody();
    const topic = body.topic as string;
    const image = body.image as File;

    const guessWord = await llmClient.guessWord(topic, image);

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
