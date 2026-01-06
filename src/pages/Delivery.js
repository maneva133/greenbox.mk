import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Delivery.css';

const Delivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || `ORD-${Date.now()}`;
  const [deliveryStatus, setDeliveryStatus] = useState('Pending');
  const [timeRemaining, setTimeRemaining] = useState(30); // minutes

  useEffect(() => {
    // Simulate delivery status updates
    const statuses = ['Pending', 'In Transit', 'Delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statuses.length - 1) {
        currentIndex++;
        setDeliveryStatus(statuses[currentIndex]);
        
        if (statuses[currentIndex] === 'In Transit') {
          setTimeRemaining(15);
        } else if (statuses[currentIndex] === 'Delivered') {
          setTimeRemaining(0);
          clearInterval(interval);
        }
      }
    }, 30000); // Update every 30 seconds for demo purposes

    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return 0;
      });
    }, 60000); // Update every minute

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'In Transit':
        return '🚚';
      case 'Delivered':
        return '✅';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107';
      case 'In Transit':
        return '#17a2b8';
      case 'Delivered':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="delivery-page">
      <div className="delivery-container">
        <h1>Order Tracking</h1>
        <div className="order-info">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <div className="delivery-status-card">
          <div 
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(deliveryStatus) }}
          >
            <span className="status-icon">{getStatusIcon(deliveryStatus)}</span>
            <h2>{deliveryStatus}</h2>
          </div>

          <div className="status-details">
            {deliveryStatus === 'Pending' && (
              <p>Your order is being prepared. We'll notify you when it's on the way!</p>
            )}
            {deliveryStatus === 'In Transit' && (
              <div>
                <p>Your order is on the way!</p>
                <p className="time-remaining">
                  Estimated arrival: {timeRemaining} minutes
                </p>
              </div>
            )}
            {deliveryStatus === 'Delivered' && (
              <div>
                <p>Your order has been delivered successfully!</p>
                <p>Thank you for shopping with GreenBox.mk</p>
              </div>
            )}
          </div>
        </div>

        <div className="delivery-timeline">
          <div className={`timeline-item ${deliveryStatus === 'Pending' ? 'active' : 'completed'}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>Order Placed</h3>
              <p>Your order has been confirmed</p>
            </div>
          </div>
          <div className={`timeline-item ${deliveryStatus === 'In Transit' ? 'active' : deliveryStatus === 'Delivered' ? 'completed' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>In Transit</h3>
              <p>Your order is on the way</p>
            </div>
          </div>
          <div className={`timeline-item ${deliveryStatus === 'Delivered' ? 'active completed' : ''}`}>
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>Delivered</h3>
              <p>Your order has been delivered</p>
            </div>
          </div>
        </div>

        <div className="delivery-actions">
          <button className="home-btn" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

