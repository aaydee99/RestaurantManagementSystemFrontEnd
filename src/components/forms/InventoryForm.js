import React, { useState, useEffect } from 'react';
import useInventoryStore from '../../stores/inventoryStore';
import useMenuStore from '../../stores/menuStore';
import useSupplierStore from '../../stores/supplierStore';

const InventoryForm = ({ inventoryItem, onFormSubmit }) => {
  const { addInventoryItem, updateInventoryItem } = useInventoryStore();
  const { menuItems, fetchMenuItems } = useMenuStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();
  const [formData, setFormData] = useState({
    menuItem: '',
    supplier: '',
    quantity: '',
    lastUpdated: '',
  });

  useEffect(() => {
    fetchMenuItems();
    fetchSuppliers();
    if (inventoryItem) {
      setFormData({
        ...inventoryItem,
        lastUpdated: new Date(inventoryItem.lastUpdated).toISOString().slice(0, 10),
      });
    } else {
      setFormData({
        menuItem: '',
        supplier: '',
        quantity: '',
        lastUpdated: '',
      });
    }
  }, [inventoryItem, fetchMenuItems, fetchSuppliers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inventoryItem) {
      await updateInventoryItem(inventoryItem._id, formData);
    } else {
      await addInventoryItem(formData);
    }
    onFormSubmit(formData);
    setFormData({
      menuItem: '',
      supplier: '',
      quantity: '',
      lastUpdated: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Menu Item</label>
        <select name="menuItem" value={formData.menuItem} onChange={handleChange} required>
          <option value="">Select a menu item</option>
          {menuItems.map((menuItem) => (
            <option key={menuItem._id} value={menuItem._id}>
              {menuItem.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Supplier</label>
        <select name="supplier" value={formData.supplier} onChange={handleChange} required>
          <option value="">Select a supplier</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quantity</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Updated</label>
        <input type="date" name="lastUpdated" value={formData.lastUpdated} onChange={handleChange} required />
      </div>
      <button type="submit">{inventoryItem ? 'Update' : 'Add'} Inventory Item</button>
    </form>
  );
};

export default InventoryForm;
