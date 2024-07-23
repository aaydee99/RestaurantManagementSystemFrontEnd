import React, { useState, useEffect } from 'react';
import useCustomerStore from '../../stores/customerStore';

const CustomerForm = ({ customer, onFormSubmit }) => {
  const { addCustomer, updateCustomer } = useCustomerStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (customer) {
      await updateCustomer(customer._id, formData);
    } else {
      await addCustomer(formData);
    }
    onFormSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <button type="submit">{customer ? 'Update' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
