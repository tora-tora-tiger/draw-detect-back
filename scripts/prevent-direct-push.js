#!/usr/bin/env node

import { execSync } from "node:child_process";

try {
  // 現在のブランチ名を取得
  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf8",
  }).trim();

  // 保護されたブランチのリスト
  const protectedBranches = ["main"];

  // 現在のブランチが保護されているかチェック
  if (protectedBranches.includes(currentBranch)) {
    console.error(
      `ブランチ '${currentBranch}' への直接プッシュは禁止されています。プルリクエストを使用してください。`,
    );
    process.exit(1);
  }
  process.exit(0);
} catch (error) {
  console.error("Error checking current branch:", error.message);
  process.exit(1);
}
