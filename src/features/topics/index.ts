import { factory } from "@/factory";
import { createLLMClient } from "@/lib/llm/client";
import { createLLM } from "@/lib/llm/llm.factory";
import { ok } from "@/utils/response";
import { createTopicService } from "./topics.service";

// Hono インスタンスを作成
const topics = factory.createApp();

topics.post("/generate", async c => {
  const llm = createLLM(c);
  const llmClient = createLLMClient(llm);
  const svc = createTopicService(llmClient);

  try {
    const result = await svc.generate();
    return c.json(ok(result));
  } catch {
    return c.json(
      {
        type: "INTERNAL_SERVER_ERROR",
      },
      500,
    );
  }
});

export default topics;
