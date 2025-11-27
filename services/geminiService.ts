import { GoogleGenAI } from "@google/genai";
import { recommendedTrips } from "../constants";

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

// --- Helper: Gemini API Call ---
export const buildMockAIResponse = (prompt: string): string => {
  const userAsk = prompt.split("用户输入:")[1]?.trim() || prompt;
  const [first, second] = recommendedTrips;
  const quickPlan = [
    "Day 1: 抵达并入住市区酒店，晚间逛当地夜景。",
    "Day 2: 参加一日游或包车，看核心地标并预留拍照时间。",
    "Day 3: 放慢节奏，体验当地市集或小众景点，晚上美食收尾。"
  ];

  return [
    "（演示环境，AI 回复）",
    userAsk ? `你的需求：${userAsk}` : "描述里没有提到具体需求，我先给一个通用示例。",
    "",
    "可参考两个行程思路：",
    `1）${first.title}（${first.subtitle}）· ${first.price}`,
    `2）${second.title}（${second.subtitle}）· ${second.price}`,
    "",
    "简要行程示例：",
    ...quickPlan,
    "",
    "想看完整方案，可在“AI 工作台”继续对话或点击下方推荐卡片。"
  ].join("\n");
};

export async function callGeminiAPI(prompt: string, retryCount = 0): Promise<string> {
  if (!process.env.API_KEY) {
    console.warn("No API Key found in environment variables. Returning mock response.");
    return buildMockAIResponse(prompt);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });

    return response.text || "抱歉，我现在无法回答。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
      return callGeminiAPI(prompt, retryCount + 1);
    }
    return buildMockAIResponse(prompt);
  }
}
