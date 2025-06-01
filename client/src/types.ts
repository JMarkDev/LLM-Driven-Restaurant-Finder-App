export interface Restaurant {
  id: string;
  name: string;
  address: string;
  cuisine?: string;
  rating?: number;
  price?: number;
  priceLevel?: number;
  hours?: string;
}

export interface SearchResponse {
  restaurants: Restaurant[];
  message: string;
}

export interface ApiError {
  message: string;
  status: number;
}
