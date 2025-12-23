interface Attachment {
  filename: string;
  mimeType: string;
  data: File;
}

interface Prompt {
  text: string;
  attachments?: Attachment[];
}

interface LLM {
  ask(prompt: Prompt): Promise<string>;
}

interface LLMClient {
  generateTopic(topic: string): Promise<string>;
  guessWord(topic: string, image: File): Promise<string>;
}

export type { Prompt, Attachment, LLM, LLMClient };
