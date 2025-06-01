export function mapPriceLevelToText(priceLevel?: number): string {
  const levels = ["Not listed", "Cheap", "Moderate", "Expensive", "Luxury"];
  return levels[priceLevel ?? 0] || "Not listed";
}
