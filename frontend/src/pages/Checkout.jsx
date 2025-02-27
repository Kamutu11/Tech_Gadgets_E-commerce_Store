import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart && cart.CartItems
    ? cart.CartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.Product.price), 0).toFixed(2)
    : 0;

    const handlePay = async () => {
      try {
        const response = await api.post('/paypal/create-order', { amount: total, currency: "USD" });
        const approvalLink = response.data.links && response.data.links.find(link => link.rel === "approve");
        if (approvalLink) {
          window.location.href = approvalLink.href;
        } else {
          alert("Approval link not found. Please check the server logs for details.");
        }
      } catch (error) {
        console.error("Error creating PayPal order", error);
        alert("Failed to create PayPal order.");
      }
    };
    
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <p className="mb-4">Total Amount: ${total}</p>
      <button onClick={handlePay} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Pay with PayPal
      </button>
    </div>
  );
};

export default Checkout;
