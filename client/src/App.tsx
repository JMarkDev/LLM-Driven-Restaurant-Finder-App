import React from "react";
import "./App.css";
import { useSearch } from "./hooks/useSearch";
import SearchForm from "./components/SearchForm";
import ResultsSection from "./components/ResultsSection";

const App: React.FC = () => {
  const {
    query,
    results,
    loading,
    error,
    handleSearch,
    handleInputChange,
    handleClearSearch,
  } = useSearch();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Restaurant Finder</h1>
        <p className="app-subtitle">
          Describe what you're looking for in natural language and we'll find
          the perfect restaurant for you!
        </p>
      </header>

      <main className="main-content">
        <SearchForm
          query={query}
          loading={loading}
          onChange={handleInputChange}
          onClear={handleClearSearch}
          onSubmit={handleSearch}
        />

        {error && (
          <div className="error-message" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {results.length > 0 && <ResultsSection results={results} />}

        {!loading && !error && results.length === 0 && (
          <div className="empty-state">
            <p>
              {query
                ? "No results found. Try a different search query."
                : `Enter a natural language query to find restaurants!`}
              <br />
              {!query && (
                <small>
                  Example: "Find Italian restaurants near me that are open late"
                </small>
              )}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
