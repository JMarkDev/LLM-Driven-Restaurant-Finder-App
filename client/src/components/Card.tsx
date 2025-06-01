import React from "react";
import { Restaurant } from "../types";

interface CardProps {
  restaurant: Restaurant;
  formatRating: (rating?: number) => string;
  mapPriceLevelToText: (priceLevel?: number) => string;
}

const Card: React.FC<CardProps> = ({
  restaurant,
  formatRating,
  mapPriceLevelToText,
}) => {
  return (
    <article className="restaurant-card">
      <h3 className="restaurant-name">{restaurant.name}</h3>

      <dl className="restaurant-details">
        <div className="detail-item">
          <dt className="detail-label">Address:</dt>
          <dd className="detail-value">{restaurant.address}</dd>
        </div>

        <div className="detail-item">
          <dt className="detail-label">Cuisine:</dt>
          <dd className="detail-value">{restaurant.cuisine}</dd>
        </div>

        <div className="detail-item">
          <dt className="detail-label">Rating:</dt>
          <dd className="detail-value rating">
            {formatRating(restaurant.rating)}
          </dd>
        </div>

        <div className="detail-item">
          <dt className="detail-label">Price:</dt>
          <dd className="detail-value price">
            {mapPriceLevelToText(restaurant.priceLevel)}
          </dd>
        </div>

        <div className="detail-item">
          <dt className="detail-label">Hours:</dt>
          <dd className="detail-value">{restaurant.hours}</dd>
        </div>
      </dl>
    </article>
  );
};

export default Card;
