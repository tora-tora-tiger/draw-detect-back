import type { ApiResponse } from "@/types/api.types";

export interface TopicResult {
  topic: string;
  word: string;
}

export type TopicResponse = ApiResponse<TopicResult>;
