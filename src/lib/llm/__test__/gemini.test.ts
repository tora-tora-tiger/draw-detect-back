import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { gemini } from "../gemini.adapter";
import type { Prompt } from "../type";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 環境変数が設定された場合のみテストを実行
// 実行する場合: RUN_INTEGRATION_TESTS=true pnpm test
const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === "true";

describe("gemini.adapter (実際のAPIを叩く統合テスト)", () => {
  // 環境変数がない場合はテストをスキップ
  const testFn = runIntegrationTests ? test : test.skip;

  testFn("テキストのみのプロンプトでAPIを叩く", async () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const prompt: Prompt = {
      text: "Please respond with the word 'cat'",
    };

    const response = await gemini(apiKey, prompt);

    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
    expect(response.length).toBeGreaterThan(0);
  });

  testFn("画像付きのプロンプトでAPIを叩く", async () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    // 実際の画像ファイルを読み込む
    const imagePath = join(__dirname, "image.png");
    const imageBuffer = readFileSync(imagePath);
    const testImage = new File([imageBuffer], "image.png", {
      type: "image/png",
    });

    const prompt: Prompt = {
      text: "Describe this image",
      attachments: [
        {
          filename: "image.png",
          mimeType: "image/png",
          data: testImage,
        },
      ],
    };

    const response = await gemini(apiKey, prompt);

    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
    expect(response.length).toBeGreaterThan(0);
  });

  testFn("実際のお題生成プロンプトでテスト", async () => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const question =
      "Generate one word related to the following theme: animals. For example, 'lion' for 'animals', 'airplane' for 'vehicles'. Return only a single word with no explanation.";

    const prompt: Prompt = {
      text: question,
    };

    const response = await gemini(apiKey, prompt);

    expect(response).toBeDefined();
    expect(typeof response).toBe("string");
    expect(response.length).toBeGreaterThan(0);
    expect(response.split(" ").length); // 単語数を確認
  });
});
