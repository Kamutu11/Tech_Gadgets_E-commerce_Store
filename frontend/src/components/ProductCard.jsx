import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageUrl = product.imageUrl 
    ? `http://localhost:5000${product.imageUrl}` 
    : 'https://via.placeholder.com/300';

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
      <div className="relative w-full h-48">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.brand}</p>
        <p className="mt-2 font-bold">${product.price}</p>
        <Link to={`/product/${product.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
