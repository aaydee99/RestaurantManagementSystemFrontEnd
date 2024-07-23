import React, { useEffect, useState } from 'react';
import useCustomerStore from '../../stores/customerStore';
import ModalComponent from '../Modal';

const CustomerList = () => {
  const { customers, fetchCustomers, addCustomer, updateCustomer, removeCustomer } = useCustomerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSubmit = async (values) => {
    if (editingCustomer) {
      await updateCustomer(editingCustomer._id, values);
    } else {
      await addCustomer(values);
    }
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeCustomer(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    });
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  return (
    <div>
      <button onClick={openModal}>Add Customer</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.firstName} {customer.lastName}
            <div>
              <button onClick={() => handleEdit(customer)}>Edit</button>
              <button onClick={() => handleDelete(customer._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
