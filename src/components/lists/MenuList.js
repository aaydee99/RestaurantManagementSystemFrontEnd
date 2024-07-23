import React, { useEffect, useState } from 'react';
import useMenuStore from '../../stores/menuStore';
import ModalComponent from '../Modal';

const MenuList = () => {
  const { menuItems, fetchMenuItems, addMenuItem, updateMenuItem, removeMenuItem } = useMenuStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleSubmit = async (values) => {
    if (editingMenuItem) {
      await updateMenuItem(editingMenuItem._id, values);
    } else {
      await addMenuItem(values);
    }
    setIsModalOpen(false);
    setEditingMenuItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const handleEdit = (menuItem) => {
    setEditingMenuItem(menuItem);
    setFormData(menuItem);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeMenuItem(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMenuItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
    });
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'text', required: true },
    { name: 'price', label: 'Price', type: 'number', step: '0.01', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
  ];

  return (
    <div>
      <button onClick={openModal}>Add Menu Item</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {menuItems.map((menuItem) => (
          <li key={menuItem._id}>
            {menuItem.name} - ${menuItem.price.toFixed(2)}
            <div>
              <button onClick={() => handleEdit(menuItem)}>Edit</button>
              <button onClick={() => handleDelete(menuItem._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
