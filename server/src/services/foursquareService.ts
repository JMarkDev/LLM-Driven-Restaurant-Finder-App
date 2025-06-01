import axios from "axios";
import { Restaurant, SearchParameters } from "../types";
import { buildSearchParams, getHeaders } from "./helpers/api";
import { enrichPlaceIfNeeded } from "./helpers/utils";
import { transformPlace } from "./helpers/transformers";

export class FoursquareService {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.foursquare.com/v3/places";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchRestaurants(
    params: SearchParameters["parameters"]
  ): Promise<Restaurant[]> {
    try {
      const searchParams = buildSearchParams(params);

      const response = await axios.get(`${this.baseUrl}/search`, {
        headers: getHeaders(this.apiKey),
        params: searchParams,
      });

      const places = response.data.results;

      const detailedPlaces = await Promise.all(
        places.map((place: any) =>
          enrichPlaceIfNeeded(place, this.apiKey, this.baseUrl)
        )
      );

      return detailedPlaces.map((place: any) => transformPlace(place));
    } catch (error) {
      console.error("Foursquare API error:", error);
      throw new Error("Failed to search restaurants");
    }
  }
}
