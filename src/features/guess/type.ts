import * as z from "zod";
import type { ApiResponse } from "@/types/api.types";

const GuessRequestSchema = z.object({
  topic: z.string(),
  image: z.instanceof(File),
});

type GuessRequest = z.infer<typeof GuessRequestSchema>;

interface GuessResult {
  guessWord: string;
}

type GuessResponse = ApiResponse<GuessResult>;

export { GuessRequestSchema };
export type { GuessRequest, GuessResult, GuessResponse };
