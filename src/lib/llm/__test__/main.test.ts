import { beforeEach, describe, expect, test, vi } from "vitest";
import { createLLMClient } from "../client";
import * as geminiAdapter from "../gemini.adapter";
import { createLLM } from "../llm.factory";

// biome-ignore lint/suspicious/noExplicitAny: テスト用のモックオブジェクトのためanyを使用
type MockContext = any;

describe("LLM Client 統合テスト", () => {
  const geminiSpy = vi.spyOn(geminiAdapter, "gemini");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("generateTopic: createLLM → createLLMClient → 生成", async () => {
    const mockContext: MockContext = {
      env: {
        GEMINI_API_KEY: "test-api-key",
      },
    };

    // gemini 関数のモックを設定
    geminiSpy.mockResolvedValue("ライオン");

    // LLM の作成
    const llm = createLLM(mockContext);

    // LLMClient の作成
    const llmClient = createLLMClient(llm);

    // 生成の実行
    const result = await llmClient.generateTopic("動物");

    // 検証
    expect(result).toBe("ライオン");
    expect(geminiSpy).toHaveBeenCalledTimes(1);
    expect(geminiSpy).toHaveBeenCalledWith(
      "test-api-key",
      expect.objectContaining({
        text: expect.stringContaining("動物"),
      }),
    );
  });

  test("guessWord: createLLM → createLLMClient → 画像付き推論", async () => {
    const mockContext: MockContext = {
      env: {
        GEMINI_API_KEY: "test-api-key",
      },
    };

    // gemini 関数のモックを設定
    geminiSpy.mockResolvedValue("猫");

    // LLM の作成
    const llm = createLLM(mockContext);

    // LLMClient の作成
    const llmClient = createLLMClient(llm);

    // テスト用画像の作成
    const testImage = new File(["test"], "test.png", { type: "image/png" });

    // 推論の実行
    const result = await llmClient.guessWord("動物", testImage);

    // 検証
    expect(result).toBe("猫");
    expect(geminiSpy).toHaveBeenCalledTimes(1);
    expect(geminiSpy).toHaveBeenCalledWith(
      "test-api-key",
      expect.objectContaining({
        text: expect.stringContaining("動物"),
        attachments: expect.arrayContaining([
          expect.objectContaining({
            mimeType: "image/png",
          }),
        ]),
      }),
    );
  });
});
