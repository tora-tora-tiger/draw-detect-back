interface LLMClient {
  generateTopic(topic: string): Promise<string>;
}

export type { LLMClient };
