import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import type { GuessResponse } from "@/features/guess/type";
import app from "@/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 環境変数が設定された場合のみテストを実行
// 実行する場合: RUN_INTEGRATION_TESTS=true pnpm test
const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === "true";

describe("お題推測APIのテスト", () => {
  // 環境変数がない場合はテストをスキップ
  const testFn = runIntegrationTests ? test : test.skip;

  // 実際の画像ファイルを読み込む
  const imagePath = join(__dirname, "image.png");
  const imageBuffer = readFileSync(imagePath);
  const testImage = new File([imageBuffer], "image.png", {
    type: "image/png",
  });

  testFn("お題推測APIが正しいレスポンスを返す", async () => {
    const formData = new FormData();
    formData.append("topic", "animals");
    formData.append("image", testImage);

    const res = await app.request(
      "/api/guess",
      {
        method: "POST",
        body: formData,
      },
      {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
      },
    );

    expect(res.status).toBe(200);

    const body = (await res.json()) as GuessResponse;

    expect(body.isSuccess).toBe(true);

    if (body.isSuccess) {
      expect(body.data).toBeDefined();
      expect(body.data.guessWord).toBeDefined();
      expect(typeof body.data.guessWord).toBe("string");
    }
  });

  // ここでは入力バリデーションのテストを行い、それ以降到達する場合は失敗なので LLM の API キーは使わない
  // 故に runIntegrationTests に関係なく実行する
  describe("不正なリクエストに対して400エラーを返す", () => {
    test("topicが欠落している場合", async () => {
      const formData = new FormData();
      formData.append("image", testImage);

      const res = await app.request("/api/guess", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
    });

    test("imageが欠落している場合", async () => {
      const formData = new FormData();
      formData.append("topic", "animals");

      const res = await app.request("/api/guess", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
    });

    test("topicが文字列でない場合", async () => {
      const formData = new FormData();

      formData.append("topic", testImage); // 故意に不正な型を使用
      formData.append("image", testImage);

      const res = await app.request("/api/guess", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
    });

    test("imageがFileでない場合", async () => {
      const formData = new FormData();
      formData.append("topic", "animals");
      formData.append("image", "not-a-file"); // 故意に不正な型を使用

      const res = await app.request("/api/guess", {
        method: "POST",
        body: formData,
      });

      expect(res.status).toBe(400);
    });
  });
});
