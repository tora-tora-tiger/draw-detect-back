import { describe, expect, test, vi } from "vitest";
import { createGuessService } from "../guess/guess.service";

describe("guessサービスのテスト", () => {
  test("生成されたお題を正しく返す", async () => {
    const llmClient = {
      generateTopic: vi.fn(),
      guessWord: vi.fn().mockResolvedValue("dog"),
    };

    const service = createGuessService(llmClient);

    const result = await service.guess("animals", new File([], "test.png"));

    expect(result).toEqual({ gueessWord: "dog" });
  });
});
