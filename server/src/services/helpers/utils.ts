import axios from "axios";
import { getHeaders } from "./api";

export async function enrichPlaceIfNeeded(
  place: any,
  apiKey: string,
  baseUrl: string
): Promise<any> {
  try {
    if (!place.rating || !place.hours) {
      const details = await getPlaceDetails(place.fsq_id, apiKey, baseUrl);
      return { ...place, ...details };
    }
    return place;
  } catch (error) {
    console.warn(`Failed to get details for ${place.name}:`, error);
    return place;
  }
}

async function getPlaceDetails(
  fsqId: string,
  apiKey: string,
  baseUrl: string
): Promise<any> {
  try {
    const response = await axios.get(`${baseUrl}/${fsqId}`, {
      headers: getHeaders(apiKey),
      params: { fields: "rating,price,hours,stats" },
    });
    return response.data;
  } catch (error) {
    console.warn("Failed to get place details:", error);
    return {};
  }
}
