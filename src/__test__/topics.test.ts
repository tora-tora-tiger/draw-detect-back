import { describe, expect, test } from "vitest";
import app from "@/index";
import type { ApiResponse } from "@/types/api.types";
import type { TopicResult } from "../features/topics/type";

// 環境変数が設定された場合のみテストを実行
// 実行する場合: RUN_INTEGRATION_TESTS=true pnpm test
const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === "true";

describe("お題生成APIのテスト", () => {
  // 環境変数がない場合はテストをスキップ
  const testFn = runIntegrationTests ? test : test.skip;

  testFn("お題生成APIが正しいレスポンスを返す", async () => {
    const res = await app.request(
      "/api/topics/generate",
      {
        method: "POST",
      },
      {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
      },
    );

    expect(res.status).toBe(200);

    const body = (await res.json()) as ApiResponse<TopicResult>;

    expect(body.isSuccess).toBe(true);

    if (body.isSuccess) {
      expect(body.data).toBeDefined();
      expect(body.data.topic).toBeDefined();
      expect(body.data.word).toBeDefined();
      expect(typeof body.data.topic).toBe("string");
      expect(typeof body.data.word).toBe("string");
    }
  });

  test("存在しないエンドポイントは404を返す", async () => {
    const res = await app.request("/invalid-endpoint", {
      method: "GET",
    });
    expect(res.status).toBe(404);
  });
});
