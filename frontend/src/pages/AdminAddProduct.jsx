import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      if (imageFile) {
        data.append('image', imageFile);
      }
      await api.post('/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block mb-1">Brand</label>
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block mb-1">Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block mb-1">Product Image</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
