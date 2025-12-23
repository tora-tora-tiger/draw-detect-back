import { describe, expectTypeOf, test, vi } from "vitest";
import { createLLMClient } from "../client";
import type { LLMClient } from "../type";

describe("create LLM Client", () => {
  const llmMock = {
    ask: vi.fn(),
  };

  test("生成されるオブジェクトは LLMClient 型を満たす", () => {
    const llmClient = createLLMClient(llmMock);

    expectTypeOf(llmClient).toExtend<LLMClient>();
  });

  test("generateTopic 関数の型の検証", () => {
    const llmClient = createLLMClient(llmMock);

    // 引数は文字列型
    expectTypeOf(llmClient.generateTopic).parameter(0).toBeString();

    expectTypeOf(llmClient.generateTopic).returns.toEqualTypeOf<
      Promise<string>
    >();
  });

  test("guessWord 関数の型の検証", () => {
    const llmClient = createLLMClient(llmMock);

    expectTypeOf(llmClient.guessWord).parameters.toEqualTypeOf<
      [string, File]
    >();
    expectTypeOf(llmClient.guessWord).returns.toEqualTypeOf<Promise<string>>();
  });
});
