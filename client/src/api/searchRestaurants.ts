import axios from "axios";
import { API_BASE_URL, SEARCH_ENDPOINT } from "../Constants";
import { SearchResponse } from "../types";

export async function searchRestaurants(
  query: string
): Promise<SearchResponse> {
  const response = await axios.post<SearchResponse>(
    `${API_BASE_URL}${SEARCH_ENDPOINT}`,
    { message: query },
    {
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
}
