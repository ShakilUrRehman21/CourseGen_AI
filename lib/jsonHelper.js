/**
 * Safely parses JSON strings returned by LLMs, handling markdown code fences,
 * leading/trailing whitespace, and incomplete formatting.
 */
export function safeJsonParse(rawText, fallback = null) {
  if (!rawText || typeof rawText !== "string") return fallback;

  let cleaned = rawText.trim();

  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
    cleaned = cleaned.replace(/\s*```$/, "");
  }

  cleaned = cleaned.trim();

  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Attempt to locate JSON array or object substring
    try {
      const firstBracket = cleaned.indexOf("[");
      const lastBracket = cleaned.lastIndexOf("]");
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");

      let candidate = cleaned;
      if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        candidate = cleaned.substring(firstBrace, lastBrace + 1);
      } else if (firstBracket !== -1 && lastBracket !== -1) {
        candidate = cleaned.substring(firstBracket, lastBracket + 1);
      }

      // Remove trailing commas before closing braces/brackets
      const sanitized = candidate
        .replace(/,\s*([}\]])/g, "$1")
        .replace(/\\'/g, "'");

      return JSON.parse(sanitized);
    } catch (fallbackErr) {
      console.error("Failed to parse JSON from AI response:", initialErr.message, "Cleaned text preview:", cleaned.slice(0, 200));
      return fallback;
    }
  }
}
