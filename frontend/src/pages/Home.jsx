import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSearch = async (q) => {
    const res = await api.get(`/products/search?q=${q}`);
    setProducts(res.data);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h2 className="text-2xl font-bold my-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
