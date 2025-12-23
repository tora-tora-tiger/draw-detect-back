import { expect, test, vi } from "vitest";
import { createTopicService } from "../topics.service";

test("トピックを選択しお題を生成できる", async () => {
  const llmClient = {
    generateTopic: vi.fn().mockResolvedValue("cat"),
    guessWord: vi.fn(),
  };

  const service = createTopicService(llmClient);

  const result = await service.generate();
  expect(result.topic).toBeDefined();
  expect(result.word).toBe("cat");
});
