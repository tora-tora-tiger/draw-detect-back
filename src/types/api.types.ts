interface Ok<T> {
  isSuccess: true;
  data: T;
}

type ErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_IMAGE_FORMAT"
  | "FILE_TOO_LARGE"
  | "INTERNAL_SERVER_ERROR"
  | "TOPIC_GENERATION_ERROR"
  | "GUESS_ERROR"
  | "LLM_NOT_AUTHORIZED"
  | "LLM_CONNECTION_FAILED"
  | "LLM_RATE_LIMIT_EXCEEDED"
  | "LLM_QUOTA_EXCEEDED"
  | "LLM_RESPONSE_INVALID"
  | "LLM_TIMEOUT";

interface Err {
  isSuccess: false;
  error: {
    type: ErrorCode;
    title: string;
    status: number;
    detail: string;
    instance: string;
  };
}

type ApiResponse<T> = Ok<T> | Err;

export type { ApiResponse, ErrorCode };
