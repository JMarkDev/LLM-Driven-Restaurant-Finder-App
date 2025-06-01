import { useState, useCallback } from "react";
import { Restaurant } from "../types";
import { searchRestaurants } from "../api/searchRestaurants";
import axios from "axios";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();

      if (!trimmed) {
        setError("Please enter a search term to find restaurants.");
        return;
      }

      setLoading(true);
      setError("");
      setResults([]);

      try {
        const { restaurants, message } = await searchRestaurants(trimmed);

        if (restaurants?.length) {
          setResults(restaurants);
        } else {
          setError(
            message || "No restaurants found. Try adjusting your search."
          );
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          if (err.code === "ECONNABORTED") {
            setError("Request timed out. Please try again.");
          } else if (err.response?.status === 404) {
            setError(
              "Service not available. Please check if the backend server is running."
            );
          } else {
            setError(
              err.response?.data?.message || "Unable to search restaurants."
            );
          }
        } else {
          setError(
            "Network error occurred. Please check your connection and try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (error) setError("");
    },
    [error]
  );

  const handleClearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setError("");
  }, []);

  return {
    query,
    results,
    loading,
    error,
    handleSearch,
    handleInputChange,
    handleClearSearch,
  };
}
