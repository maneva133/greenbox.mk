import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    image: '',
    description: '',
  });
  const [discounts, setDiscounts] = useState({});
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    categories: {},
  });

  useEffect(() => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch('/api/products');
    // const data = await response.json();
    setProducts(productsData);
    calculateStats(productsData);
  }, []);

  useEffect(() => {
    calculateStats(products);
  }, [products]);

  const calculateStats = (productList) => {
    const totalProducts = productList.length;
    const totalValue = productList.reduce((sum, p) => sum + p.price, 0);
    const categories = productList.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {});

    setStats({ totalProducts, totalValue, categories });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'vegetables',
      price: '',
      image: '',
      description: '',
    });
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
    });
    setShowForm(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Simulate API call - Replace this with actual API call later
      // Example: await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      // Simulate API call - Replace this with actual API call later
      // Example: await fetch(`/api/products/${editingProduct.id}`, { method: 'PUT', body: JSON.stringify(formData) });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
              }
            : p
        )
      );
    } else {
      // Add new product
      // Simulate API call - Replace this with actual API call later
      // Example: await fetch('/api/products', { method: 'POST', body: JSON.stringify(formData) });
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    setShowForm(false);
    setFormData({
      name: '',
      category: 'vegetables',
      price: '',
      image: '',
      description: '',
    });
  };

  const handleDiscountChange = (productId, discount) => {
    setDiscounts((prev) => ({
      ...prev,
      [productId]: discount,
    }));
  };

  const getDiscountedPrice = (product) => {
    const discount = discounts[product.id] || 0;
    return product.price * (1 - discount / 100);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1>Admin Dashboard</h1>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Total Inventory Value</h3>
            <p className="stat-value">${stats.totalValue.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Categories</h3>
            <p className="stat-value">{Object.keys(stats.categories).length}</p>
          </div>
        </div>

        <div className="admin-actions">
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add New Product
          </button>
        </div>

        {showForm && (
          <div className="admin-form-overlay">
            <div className="admin-form">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="packages">Packages</option>
                    <option value="extras">Extras</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">
                    {editingProduct ? 'Update' : 'Add'} Product
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="products-table">
          <h2>Products Management</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Discount (%)</th>
                <th>Discounted Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td className="category-cell">{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discounts[product.id] || 0}
                      onChange={(e) =>
                        handleDiscountChange(product.id, parseFloat(e.target.value) || 0)
                      }
                      className="discount-input"
                    />
                  </td>
                  <td>${getDiscountedPrice(product).toFixed(2)}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="category-breakdown">
          <h2>Category Breakdown</h2>
          <div className="category-list">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <span className="category-count">{count} products</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

