import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <Link to="/admin/add-product" className="mb-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add New Product</Link>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={`/admin/edit-product/${product.id}`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Edit</Link>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
