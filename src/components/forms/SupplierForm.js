import React, { useState, useEffect } from 'react';
import useSupplierStore from '../../stores/supplierStore';

const SupplierForm = ({ supplier, onFormSubmit }) => {
  const { addSupplier, updateSupplier } = useSupplierStore();
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    } else {
      setFormData({
        name: '',
        contactInfo: '',
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (supplier) {
      await updateSupplier(supplier._id, formData);
    } else {
      await addSupplier(formData);
    }
    onFormSubmit(formData);
    setFormData({
      name: '',
      contactInfo: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact Info</label>
        <input type="text" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
      </div>
      <button type="submit">{supplier ? 'Update' : 'Add'} Supplier</button>
    </form>
  );
};

export default SupplierForm;
