import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const imageUrl = product.imageUrl 
    ? `http://localhost:5000${product.imageUrl}` 
    : 'https://via.placeholder.com/400';

  const cartItem = cart?.CartItems?.find(item => item.productId === product.id);
  const inCart = Boolean(cartItem);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      removeCartItem(cartItem.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <img src={imageUrl} alt={product.name} className="w-full md:w-1/2 object-cover rounded" />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.brand}</p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 font-bold text-xl">${product.price}</p>
          <div className="mt-4">
            {inCart ? (
              <div className="flex flex-col items-start space-y-2">
                <button 
                  onClick={handleRemoveFromCart} 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove from Cart
                </button>
                <Link to="/cart" className="text-blue-500 hover:underline">
                  View Cart
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))} 
                  className="border p-2 rounded w-20" 
                  min="1" 
                />
                <button 
                  onClick={handleAddToCart} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
