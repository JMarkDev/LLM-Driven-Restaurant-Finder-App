import React from "react";

type Props = {
  query: string;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SearchForm({
  query,
  loading,
  onChange,
  onClear,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="e.g., Cheap sushi in LA open now"
          className="search-input"
          disabled={loading}
        />
        {query && (
          <button
            type="button"
            onClick={onClear}
            className="clear-button"
            disabled={loading}
          >
            ×
          </button>
        )}
      </div>

      <div className="search-actions">
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className={`search-button ${loading ? "loading" : ""}`}
        >
          {loading ? (
            <>
              <span className="spinner"></span> Searching...
            </>
          ) : (
            "Find Restaurants"
          )}
        </button>
      </div>
    </form>
  );
}
