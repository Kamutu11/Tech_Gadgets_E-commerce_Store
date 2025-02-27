import React from 'react';

const CartItem = ({ item, onUpdate, onRemove }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h4 className="font-semibold">{item.Product.name}</h4>
        <p className="text-gray-600">Quantity: {item.quantity}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={() => onUpdate(item.id, item.quantity + 1)} className="bg-green-500 text-white px-2 rounded">
          +
        </button>
        <button onClick={() => onUpdate(item.id, item.quantity - 1)} className="bg-yellow-500 text-white px-2 rounded">
          -
        </button>
        <button onClick={() => onRemove(item.id)} className="bg-red-500 text-white px-2 rounded">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
