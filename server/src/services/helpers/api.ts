import { SearchParameters } from "../../types";

export function getHeaders(apiKey: string) {
  return {
    Authorization: apiKey,
    Accept: "application/json",
  };
}

export function buildSearchParams(params: SearchParameters["parameters"]): any {
  const {
    query,
    near,
    min_price,
    max_price,
    open_now,
    rating,
    limit = 10,
  } = params;

  if (!near?.trim()) throw new Error("Location (near) parameter is required");

  const searchParams: any = {
    categories: "13000",
    limit: Math.min(limit, 50),
    fields: "fsq_id,name,location,categories,rating,price,hours,stats,geocodes",
  };

  if (query?.trim()) searchParams.query = query.trim();
  if (open_now === true) searchParams.open_now = "true";
  if (min_price && min_price >= 1 && min_price <= 4)
    searchParams.min_price = min_price;
  if (max_price && max_price >= 1 && max_price <= 4)
    searchParams.max_price = max_price;

  return searchParams;
}
