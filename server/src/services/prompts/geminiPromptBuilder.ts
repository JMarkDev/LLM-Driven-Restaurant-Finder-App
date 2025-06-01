export function buildSearchPrompt(message: string): string {
  return `
Convert the following natural language restaurant search request into a JSON command.

The JSON should follow this exact schema:
{
  "action": "restaurant_search",
  "parameters": {
    "query": "type of food/restaurant name (optional)",
    "near": "location (required - extract city, neighborhood, or address)",
    "min_price": 1-4 (optional),
    "max_price": 1-4 (optional), 
    "open_now": true/false (optional),
    "rating": minimum rating number (optional),
    "limit": number (default 10, max 50)
  }
}

Price level mapping:
- "cheap", "inexpensive", "budget" = min_price: 1
- "affordable" = min_price: 1, max_price: 2
- "moderate", "mid-range" = min_price: 2, max_price: 2
- "expensive", "upscale" = min_price: 3, max_price: 3
- "very expensive", "fine dining", "luxury" = min_price: 4, max_price: 4

Special conditions:
- If user mentions "open now", "currently open", "open right now" → set open_now: true
- If user mentions specific rating like "4+ stars", "at least 4 stars" → extract numeric rating
- If no location is clearly specified, try to infer from context or set near: "current location"

Important rules:
- ALWAYS include "action": "restaurant_search"
- ALWAYS include "near" parameter with a location
- Only include parameters that are explicitly mentioned or can be reasonably inferred
- Respond with ONLY the JSON, no explanations or additional text

User request: "${message}"

JSON:
`.trim();
}
