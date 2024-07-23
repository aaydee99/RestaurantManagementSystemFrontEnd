import React, { useEffect, useState } from 'react';
import useSupplierStore from '../../stores/supplierStore';
import useCustomerStore from '../../stores/customerStore';
import ModalComponent from '../Modal';

const SupplierList = () => {
  const { suppliers, fetchSuppliers, addSupplier, updateSupplier, removeSupplier } = useSupplierStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    customer: '',
  });

  useEffect(() => {
    fetchSuppliers();
    fetchCustomers();
  }, [fetchSuppliers, fetchCustomers]);

  const handleSubmit = async (values) => {
    if (editingSupplier) {
      await updateSupplier(editingSupplier._id, values);
    } else {
      await addSupplier(values);
    }
    setIsModalOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: '',
      contactInfo: '',
      customer: '',
    });
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeSupplier(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
    setFormData({
      name: '',
      contactInfo: '',
      customer: '',
    });
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'contactInfo', label: 'Contact Info', type: 'text', required: true },
    {
      name: 'customer',
      label: 'Customer',
      type: 'select',
      required: true,
      options: customers.map((customer) => ({
        value: customer._id,
        label: `${customer.firstName} ${customer.lastName}`,
      })),
    },
  ];

  return (
    <div>
      <h2>Suppliers</h2>
      <button onClick={openModal}>Add Supplier</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier._id}>
            {supplier.name} - {supplier.contactInfo}
            <div>
              <button onClick={() => handleEdit(supplier)}>Edit</button>
              <button onClick={() => handleDelete(supplier._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
