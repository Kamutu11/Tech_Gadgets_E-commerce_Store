import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity) => {
    await api.post('/cart/add', { productId, quantity });
    fetchCart();
  };

  const updateCartItem = async (itemId, quantity) => {
    await api.put(`/cart/item/${itemId}`, { quantity });
    fetchCart();
  };

  const removeCartItem = async (itemId) => {
    await api.delete(`/cart/item/${itemId}`);
    fetchCart();
  };

  const clearCart = async () => {
    await api.delete('/cart');
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeCartItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
