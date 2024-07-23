import React, { useState, useEffect } from 'react';
import useMenuStore from '../../stores/menuStore';

const MenuForm = ({ menuItem, onFormSubmit }) => {
  const { addMenuItem, updateMenuItem } = useMenuStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    if (menuItem) {
      setFormData(menuItem);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
      });
    }
  }, [menuItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (menuItem) {
      await updateMenuItem(menuItem._id, formData);
    } else {
      await addMenuItem(formData);
    }
    onFormSubmit(formData);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Price</label>
        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <button type="submit">{menuItem ? 'Update' : 'Add'} Menu Item</button>
    </form>
  );
};

export default MenuForm;
