import { Restaurant } from "../../types";

export function transformPlace(place: any): Restaurant {
  return {
    id: place.fsq_id,
    name: place.name,
    address: formatAddress(place.location),
    cuisine: place.categories?.[0]?.name || "Restaurant",
    rating: place.rating || null,
    price: place.price || null,
    priceLevel: place.price || undefined,
    hours: formatHours(place.hours),
  };
}

function formatAddress(location: any): string {
  if (!location) return "Address not available";
  const { address, locality, region, postcode } = location;
  return [address, locality, region, postcode].filter(Boolean).join(", ");
}

function formatHours(hours: any): string {
  if (!hours) return "Hours not available";
  if (hours.display) return hours.display;

  if (hours.regular) {
    const today = new Date().getDay();
    const todayHours = hours.regular.find((h: any) => h.day === today);
    if (todayHours?.open && todayHours?.close) {
      return `${formatTime(todayHours.open)} - ${formatTime(todayHours.close)}`;
    }
  }

  return "Hours not available";
}

function formatTime(time: string): string {
  if (!time || time.length !== 4) return time;
  const hours = parseInt(time.slice(0, 2));
  const minutes = time.slice(2);
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}
