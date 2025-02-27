import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setFormData(res.data);
    };
    fetchProduct();
  }, [id]);

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
      await api.put(`/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert('Failed to update product');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
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
          <label className="block mb-1">Current Image URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" readOnly />
        </div>
        <div>
          <label className="block mb-1">New Product Image (optional)</label>
          <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
