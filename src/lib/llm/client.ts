import type { LLM, LLMClient } from "./type";

export const createLLMClient = (model: LLM): LLMClient => {
  const generateTopic = async (topic: string) => {
    const question = `次に示すテーマに基づいて、関連するワードを一つ生成してください：${topic}。

例えば、「動物」というテーマに対しては「ライオン」、「乗り物」というテーマに対しては「飛行機」などです。解答は必ず「一単語のみ」を返すとし、理由や説明は絶対に不要です。`;
    return model.ask({ text: question });
  };

  const guessWord = async (topic: string, image: File) => {
    const question = `次に示す画像は${topic}に関するものです。この画像で描かれているものを、単語で答えてください。`;
    const caption = `${topic}に関するものについて描かれた画像`;
    return model.ask({
      text: question,
      attachments: [
        {
          filename: `${caption}.png`,
          mimeType: "image/png",
          data: image,
        },
      ],
    });
  };

  return {
    generateTopic,
    guessWord,
  };
};
