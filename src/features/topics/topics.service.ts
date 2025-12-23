import type { LLMClient } from "@/lib/llm/type";
import type { TopicResult } from "./type";

export function createTopicService(llmClient: LLMClient) {
  const topics = ["動物", "乗り物", "食べ物", "スポーツ", "楽器", "国", "職業"];

  async function generate(): Promise<TopicResult> {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];

    return {
      topic: randomTopic,
      word: await llmClient.generateTopic(randomTopic),
    };
  }

  return {
    generate,
  };
}
