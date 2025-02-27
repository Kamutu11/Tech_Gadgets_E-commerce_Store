import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) return <div>No order information available.</div>;

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/products" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
