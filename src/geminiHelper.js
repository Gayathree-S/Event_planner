import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is not defined. Please set VITE_GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const askGemini = async (prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent({
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
   
  });
  console.log("Gemini API Response:", result);
  // The response format might have 'candidates' array, adjust as needed:
  if (result?.candidates && result.candidates.length > 0) {
    return result.candidates[0].content.parts.map(part => part.text).join("");
  }

  // Fallback if a simpler response is returned:
  return result.response?.text() || "";
};
