import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    item_id: ''
  });
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    fetchItems();
    fetchProducts();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNewItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImageFile(e.target.files[0]);
    }
  };

  const handleAddNewItem = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/items', { name: newItem }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding new item:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddNewProduct = async () => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    if (selectedImageFile) {
      formData.append('image', selectedImageFile);
    } else if (newProduct.image_url) {
      formData.append('image_url', newProduct.image_url);
    }
    formData.append('item_id', newProduct.item_id);

    try {
      const response = await axios.post('http://localhost:5000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setProducts([...products, response.data]);
      setNewProduct({ name: '', description: '', price: '', image_url: '', item_id: '' });
      setSelectedImageFile(null);
    } catch (error) {
      console.error('Error adding new product:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setItems(items.filter((item) => item.id !== itemId));
      setProducts(products.filter((product) => product.item_id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div className='items-container'>
        {items.map((item) => (
          <div key={item.id} className='item-container'>
            <h2>Item: {item.name}</h2>
            <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
            <div className='products-container'>
              <h3>Products for {item.name}</h3>
              {products.filter((product) => product.item_id === item.id).map((product) => (
                <div key={product.id} className='product-container'>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  {product.image_url && (
                    <img
                    src={product.image_url.startsWith('http') ? product.image_url : `http://localhost:5000${product.image_url}`}
                    alt={product.name}
                    width='100'
                  />
                  )}
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete Product</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='add-item-container'>
        <h2>Add New Item</h2>
        <input
          type='text'
          placeholder='New item name'
          value={newItem}
          onChange={handleNewItemChange}
        />
        <button onClick={handleAddNewItem}>Add Item</button>
      </div>
      <div className='add-product-container'>
        <h2>Add New Product</h2>
        <input
          type='text'
          placeholder='Product name'
          name='name'
          value={newProduct.name}
          onChange={handleNewProductChange}
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={newProduct.description}
          onChange={handleNewProductChange}
        />
        <input
          type='number'
          placeholder='Price'
          name='price'
          value={newProduct.price}
          onChange={handleNewProductChange}
        />
        <input
          type='text'
          placeholder='Image URL (optional)'
          name='image_url'
          value={newProduct.image_url}
          onChange={handleNewProductChange}
        />
        <input
          type='file'
          name='image'
          onChange={handleImageChange}
        />
        <select
          name='item_id'
          value={newProduct.item_id}
          onChange={handleNewProductChange}
        >
          <option value=''>Select Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddNewProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default Products;
