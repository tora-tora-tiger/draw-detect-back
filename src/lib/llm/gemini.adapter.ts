import { type ContentListUnion, GoogleGenAI } from "@google/genai";
import { fileToBase64 } from "@/utils/fileToBase64";
import type { Attachment, Prompt } from "./type";

export async function gemini(apiKey: string, prompt: Prompt): Promise<string> {
  const data: ContentListUnion = [
    prompt.text,
    ...(await Promise.all(
      prompt.attachments?.map(async (att: Attachment) => ({
        inlineData: {
          mimeType: att.mimeType,
          data: await fileToBase64(att.data),
        },
      })) ?? [],
    )),
  ];

  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: data,
  });

  if (!response.text) {
    throw new Error("No response from Gemini API");
  }
  return response.text;
}
