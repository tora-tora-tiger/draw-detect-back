import { describe, expect, expectTypeOf, test, vi } from "vitest";
import { createGuessService } from "../guess/guess.service";
import type { GuessResult } from "../guess/type";

describe("guessサービスのテスト", () => {
  test("生成されたお題を正しく返す", async () => {
    const llmClient = {
      generateTopic: vi.fn(),
      guessWord: vi.fn().mockResolvedValue("dog"),
    };

    const service = createGuessService(llmClient);

    const result = await service.guess("animals", new File([], "test.png"));

    expectTypeOf(result).toEqualTypeOf<GuessResult>();
    expect(result).toEqual({ guessWord: "dog" });
  });
});
