import React from "react";
import { Restaurant } from "../types";
import Card from "./Card";
import { formatRating } from "../utils/formatRating";
import { mapPriceLevelToText } from "../utils/mapPriceLevel";

type Props = {
  results: Restaurant[];
};

export default function ResultsSection({ results }: Props) {
  return (
    <section className="results-section">
      <h2 className="results-header">
        Found {results.length} restaurant{results.length !== 1 ? "s" : ""}
      </h2>
      <div className="results-grid">
        {results.map((r) => (
          <Card
            key={r.id}
            restaurant={r}
            formatRating={formatRating}
            mapPriceLevelToText={mapPriceLevelToText}
          />
        ))}
      </div>
    </section>
  );
}
