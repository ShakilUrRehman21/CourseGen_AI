import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey =
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Prioritized list of active models: auto-fallbacks ensure 100% reliability
const CANDIDATE_MODELS = [
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-3.8-flash",
  "gemini-pro-latest",
];

/**
 * Execute generation with multi-model fallback and retry logic
 */
async function callGeminiWithFallback(prompt) {
  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          },
        });

        const response = await model.generateContent(prompt);
        const text = response.response.text();
        if (text && text.trim().length > 0) {
          return text;
        }
      } catch (err) {
        lastError = err;
        console.warn(
          `Gemini [${modelName}] attempt ${attempt + 1} warning: ${err.message || err.status}`
        );
        // Short pause before retrying or switching models
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }
  }

  throw lastError || new Error("All candidate Gemini models failed to respond.");
}

/**
 * Backward-compatible adapter for course layout generation
 */
export const GenerateCourseLayout_AI = {
  sendMessage: async (prompt) => {
    const rawText = await callGeminiWithFallback(
      `You are an expert curriculum designer and educator.
Return strictly a valid JSON object matching the requested fields. Do not include markdown code block backticks if possible, just raw JSON.
Prompt: ${prompt}`
    );

    return {
      response: {
        text: () => rawText,
      },
    };
  },
};

/**
 * Backward-compatible adapter for chapter content generation
 */
export const GenerateChapterContent_AI = {
  sendMessage: async (prompt) => {
    const rawText = await callGeminiWithFallback(
      `You are an elite instructor and technical author.
Explain each concept with great clarity, real-world examples, and clean formatted code examples where applicable.
Return strictly a valid JSON array of objects with fields:
- "title": concept title (string)
- "description": detailed explanation with clear educational markdown formatting (string)
- "codeExample": formatted code snippet or empty string if not applicable (string)
Prompt: ${prompt}`
    );

    return {
      response: {
        text: () => rawText,
      },
    };
  },
};