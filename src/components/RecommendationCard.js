import React from 'react';
import { useCart } from '../context/CartContext';
import './RecommendationCard.css';

const RecommendationCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="recommendation-card">
      <div className="recommendation-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="recommendation-info">
        <h4>{product.name}</h4>
        <p className="recommendation-price">${product.price.toFixed(2)}</p>
        <button className="recommendation-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RecommendationCard;

