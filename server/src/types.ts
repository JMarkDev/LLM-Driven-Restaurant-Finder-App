export interface RestaurantSearchRequest {
  message: string;
}
export interface SearchParameters {
  action: "restaurant_search";
  parameters: {
    query?: string;
    near: string;
    min_price?: number;
    max_price?: number;
    open_now?: boolean;
    rating?: number;
    limit?: number;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine: string;
  rating?: number;
  price?: number;
  priceLevel?: number;
  hours: string;
}

export interface SearchResponse {
  restaurants: Restaurant[];
  message?: string;
}

export interface Config {
  port: number;
  nodeEnv: string;
  geminiApiKey: string;
  foursquareApiKey: string;
}
