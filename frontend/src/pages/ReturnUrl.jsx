import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const ReturnUrl = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const capturePayment = async () => {
      const orderID = searchParams.get('token');
      if (!orderID) {
        setError("Order ID not found in query parameters.");
        setLoading(false);
        return;
      }
      try {
        const res = await api.post('/paypal/capture-order', { orderID });
        if (res.data && res.data.status === "COMPLETED") {
          navigate('/order-confirmation', { state: { order: res.data } });
        } else {
          setError("Payment capture did not complete successfully.");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error capturing payment:", err);
        setError("An error occurred during payment capture.");
        setLoading(false);
      }
    };

    capturePayment();
  }, [searchParams, navigate]);

  if (loading) return <div className="text-center p-4">Processing payment...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  return null;
};

export default ReturnUrl;
