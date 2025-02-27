import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCartItem, removeCartItem } = useContext(CartContext);

  if (!cart || cart.CartItems.length === 0) {
    return <div className="text-center">Your cart is empty. <Link to="/products" className="text-blue-500">Shop now</Link></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.CartItems.map(item => (
        <CartItem key={item.id} item={item} onUpdate={updateCartItem} onRemove={removeCartItem} />
      ))}
      <div className="mt-4 text-right">
        <Link to="/checkout" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Cart;
