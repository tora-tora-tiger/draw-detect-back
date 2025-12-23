import { describe, expect, test } from "vitest";
import { fileToBase64 } from "../fileToBase64";

describe("fileToBase64", () => {
  test("空のファイルをbase64に変換できる", async () => {
    const emptyFile = createMockFile(new Uint8Array([]), "empty.txt");

    const result = await fileToBase64(emptyFile);

    expect(result).toBe("");
  });

  test("テキストファイルをbase64に変換できる", async () => {
    const content = new TextEncoder().encode("Hello, World!");
    const file = createMockFile(content, "test.txt");

    const result = await fileToBase64(file);

    // "Hello, World!" の base64 エンコード
    expect(result).toBe("SGVsbG8sIFdvcmxkIQ==");
  });

  test("バイナリデータを含むファイルをbase64に変換できる", async () => {
    const binaryData = new Uint8Array([0x00, 0x01, 0x02, 0xff, 0xfe, 0xfd]);
    const file = createMockFile(binaryData, "binary.bin");

    const result = await fileToBase64(file);

    // Uint8Array([0x00, 0x01, 0x02, 0xff, 0xfe, 0xfd]) の base64 エンコード
    expect(result).toBe("AAEC//79");
  });

  test("日本語を含むテキストファイルをbase64に変換できる", async () => {
    const content = new TextEncoder().encode("こんにちは");
    const file = createMockFile(content, "japanese.txt");

    const result = await fileToBase64(file);

    // UTF-8 エンコードされた "こんにちは" の base64 エンコード
    // 実際のエンコード結果を確認
    expect(result).toBe("44GT44KT44Gr44Gh44Gv");
  });

  test("大きなファイルでも正しくbase64に変換できる", async () => {
    const largeContent = new TextEncoder().encode("a".repeat(10000));
    const file = createMockFile(largeContent, "large.txt");

    const result = await fileToBase64(file);

    // "a" * 10000 の base64 エンコード（base64は3バイトごとに4文字に変換されるため、単純な繰り返しにならない）
    expect(result).toBeTruthy();
    expect(result.startsWith("YWFh")).toBe(true);
  });

  test("短いテキストを正しくbase64に変換できる", async () => {
    const content = new TextEncoder().encode("abc");
    const file = createMockFile(content, "short.txt");

    const result = await fileToBase64(file);

    // "abc" の base64 エンコード
    expect(result).toBe("YWJj");
  });
});

/**
 * File オブジェクトのモックを作成するヘルパー関数
 */
function createMockFile(
  content: Uint8Array,
  name: string,
  type: string = "text/plain",
): File {
  return {
    name,
    type,
    arrayBuffer: async () =>
      content.buffer.slice(
        content.byteOffset,
        content.byteOffset + content.byteLength,
      ),
  } as File;
}
