interface LLMClient {
  generateTopic(topic: string): Promise<string>;
  guessWord(topic: string, image: File): Promise<string>;
}

export type { LLMClient };
