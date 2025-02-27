import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="space-y-2">
        <div>
          <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Products</Link>
        </div>
        {/* Additional admin navigation can be added here */}
      </nav>
    </div>
  );
};

export default AdminDashboard;
