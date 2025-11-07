
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // A check to ensure the API key is available. In a real app, this might be handled more gracefully.
  console.warn("Gemini API key not found in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateCaption = async (topic: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is unavailable. Please check your API key.";
  }
  
  try {
    const prompt = `Generate a short, engaging, and positive Instagram-style caption for a farmer's post about "${topic}". Include 2-3 relevant hashtags.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating caption with Gemini API:", error);
    return "Failed to generate caption. Please try again.";
  }
};
