export function formatRating(rating?: number): string {
  if (!rating) return "No reviews yet";
  return `${rating.toFixed(1)}/10`;
}
