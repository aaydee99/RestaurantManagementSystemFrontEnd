import React, { useEffect, useState } from 'react';
import useInventoryStore from '../../stores/inventoryStore';
import useMenuStore from '../../stores/menuStore';
import useSupplierStore from '../../stores/supplierStore';
import ModalComponent from '../Modal';

const InventoryList = () => {
  const { inventoryItems, fetchInventoryItems, addInventoryItem, updateInventoryItem, removeInventoryItem } = useInventoryStore();
  const { menuItems, fetchMenuItems } = useMenuStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [formData, setFormData] = useState({
    menuItem: '',
    supplier: '',
    quantity: '',
    lastUpdated: '',
  });

  useEffect(() => {
    fetchInventoryItems();
    fetchMenuItems();
    fetchSuppliers();
  }, [fetchInventoryItems, fetchMenuItems, fetchSuppliers]);

  const handleSubmit = async (values) => {
    if (editingInventoryItem) {
      await updateInventoryItem(editingInventoryItem._id, values);
    } else {
      await addInventoryItem(values);
    }
    setIsModalOpen(false);
    setEditingInventoryItem(null);
    setFormData({
      menuItem: '',
      supplier: '',
      quantity: '',
      lastUpdated: '',
    });
  };

  const handleEdit = (inventoryItem) => {
    setEditingInventoryItem(inventoryItem);
    setFormData({
      ...inventoryItem,
      lastUpdated: new Date(inventoryItem.lastUpdated).toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeInventoryItem(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingInventoryItem(null);
    setFormData({
      menuItem: '',
      supplier: '',
      quantity: '',
      lastUpdated: '',
    });
  };

  const fields = [
    {
      name: 'menuItem',
      label: 'Menu Item',
      type: 'select',
      required: true,
      options: menuItems.map((menuItem) => ({
        value: menuItem._id,
        label: menuItem.name,
      })),
    },
    {
      name: 'supplier',
      label: 'Supplier',
      type: 'select',
      required: true,
      options: suppliers.map((supplier) => ({
        value: supplier._id,
        label: supplier.name,
      })),
    },
    { name: 'quantity', label: 'Quantity', type: 'number', required: true },
    { name: 'lastUpdated', label: 'Last Updated', type: 'date', required: true },
  ];

  return (
    <div>
      <h2>Inventory Items</h2>
      <button onClick={openModal}>Add Inventory Item</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {inventoryItems.map((inventoryItem) => (
          <li key={inventoryItem._id}>
            {inventoryItem.menuItem.name} - {inventoryItem.quantity} - {new Date(inventoryItem.lastUpdated).toLocaleDateString()}
            <div>
              <button onClick={() => handleEdit(inventoryItem)}>Edit</button>
              <button onClick={() => handleDelete(inventoryItem._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
