import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import RecommendationCard from '../components/RecommendationCard';
import productsData from '../data/products.json';
import recommendationsData from '../data/recommendations.json';
import './Cart.css';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const subtotal = getCartTotal();
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Get recommendations based on items in cart
  useEffect(() => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch(`/api/recommendations?cartItems=${cartItems.map(i => i.id).join(',')}`);
    // const recommendedProducts = await response.json();
    
    if (cartItems.length > 0) {
      // Get recommendations based on the last added item or all cart items
      const lastAddedItem = cartItems[cartItems.length - 1];
      
      // Use category-based rules for recommendations
      // Category rules:
      // - Vegetables → Olive Oil (11) and Nuts (5)
      // - Fruits → Honey (4) and Nuts (5)
      let recommendedIds = recommendationsData.categoryRules[lastAddedItem.category] || [];
      
      // Fallback to product-specific recommendations
      if (recommendedIds.length === 0) {
        const productId = lastAddedItem.id.toString();
        recommendedIds = recommendationsData.recommendations[productId] || [];
      }
      
      // Filter out products already in cart and get recommended products
      const recommendedProducts = productsData
        .filter((p) => recommendedIds.includes(p.id) && !cartItems.find((item) => item.id === p.id))
        .slice(0, 4); // Limit to 4 recommendations
      
      setRecommendations(recommendedProducts);
      setShowRecommendations(recommendedProducts.length > 0);
    } else {
      setShowRecommendations(false);
    }
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty!</p>
            <button className="shop-btn" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        {showRecommendations && (
          <div className="cart-recommendations">
            <h2>Recommended for You</h2>
            <p className="recommendations-subtitle">
              Based on your cart, you might also like:
            </p>
            <div className="recommendations-grid">
              {recommendations.map((product) => (
                <RecommendationCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

