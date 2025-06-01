import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { SearchParameters } from "../types";
import { buildSearchPrompt } from "./prompts/geminiPromptBuilder";

export class GeminiService {
  private readonly model: GenerativeModel;

  constructor(apiKey: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async convertToSearchCommand(message: string): Promise<SearchParameters> {
    const prompt = buildSearchPrompt(message);

    try {
      const result = await this.model.generateContent(prompt);
      const text = result.response.text().trim();
      const cleanedJson = text.replace(/```json\n?|```/g, "").trim();

      const parsed = JSON.parse(cleanedJson);

      // Validate the response structure
      if (!parsed.action || parsed.action !== "restaurant_search") {
        throw new Error(
          "Invalid response structure: missing or incorrect action"
        );
      }

      if (!parsed.parameters || !parsed.parameters.near) {
        throw new Error(
          "Invalid response structure: missing required 'near' parameter"
        );
      }

      return parsed;
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      throw new Error("Failed to convert message to search parameters");
    }
  }
}
