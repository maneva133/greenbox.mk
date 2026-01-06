import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import RecommendationCard from '../components/RecommendationCard';
import productsData from '../data/products.json';
import recommendationsData from '../data/recommendations.json';
import './Home.css';

const Home = () => {
  const { cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch('/api/products');
    // const data = await response.json();
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    // Get recommendations based on last added item to cart
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch(`/api/recommendations?productId=${lastAddedItem.id}`);
    // const recommendedProducts = await response.json();
    
    if (cartItems.length > 0) {
      const lastAddedItem = cartItems[cartItems.length - 1];
      const productId = lastAddedItem.id.toString();
      
      // Priority: Use category-based rules first (as per requirements)
      // Category rules:
      // - Vegetables → Olive Oil (11) and Nuts (5)
      // - Fruits → Honey (4) and Nuts (5) or alternative
      let recommendedIds = recommendationsData.categoryRules[lastAddedItem.category] || [];
      
      // Fallback to product-specific recommendations if category rules don't exist
      if (recommendedIds.length === 0) {
        recommendedIds = recommendationsData.recommendations[productId] || [];
      }
      
      // Filter out products already in cart and get recommended products
      const recommendedProducts = products
        .filter((p) => recommendedIds.includes(p.id) && !cartItems.find((item) => item.id === p.id))
        .slice(0, 4); // Limit to 4 recommendations
      
      setRecommendations(recommendedProducts);
      setShowRecommendations(recommendedProducts.length > 0);
    } else {
      setShowRecommendations(false);
    }
  }, [cartItems, products]);

  const categories = ['all', 'vegetables', 'fruits', 'packages', 'extras'];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome to GreenBox.mk</h1>
        <p>Your trusted source for organic food packages</p>
      </div>

      {showRecommendations && (
        <div className="recommendations-section">
          <h2>Recommended for You</h2>
          <p className="recommendations-subtitle">
            Based on your recent selection, you might also like:
          </p>
          <div className="recommendations-grid">
            {recommendations.map((product) => (
              <RecommendationCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <div className="category-filter">
        <h2>Shop by Category</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="products-section">
        <h2>Our Products</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p className="no-products">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

