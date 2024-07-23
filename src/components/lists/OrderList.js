import React, { useEffect, useState } from 'react';
import useOrderStore from '../../stores/orderStore';
import useTableStore from '../../stores/tableStore';
import useEmployeeStore from '../../stores/employeeStore';
import ModalComponent from '../Modal';

const OrderList = () => {
  const { orders, fetchOrders, addOrder, updateOrder, removeOrder } = useOrderStore();
  const { tables, fetchTables } = useTableStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    table: '',
    employee: '',
    orderDate: '',
    totalAmount: '',
  });

  useEffect(() => {
    fetchOrders();
    fetchTables();
    fetchEmployees();
  }, [fetchOrders, fetchTables, fetchEmployees]);

  const handleSubmit = async (values) => {
    if (editingOrder) {
      await updateOrder(editingOrder._id, values);
    } else {
      await addOrder(values);
    }
    setIsModalOpen(false);
    setEditingOrder(null);
    setFormData({
      table: '',
      employee: '',
      orderDate: '',
      totalAmount: '',
    });
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      ...order,
      orderDate: new Date(order.orderDate).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeOrder(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
    setFormData({
      table: '',
      employee: '',
      orderDate: '',
      totalAmount: '',
    });
  };

  const fields = [
    {
      name: 'table',
      label: 'Table',
      type: 'select',
      required: true,
      options: tables.map((table) => ({
        value: table._id,
        label: `Table ${table.tableNumber}`,
      })),
    },
    {
      name: 'employee',
      label: 'Employee',
      type: 'select',
      required: true,
      options: employees.map((employee) => ({
        value: employee._id,
        label: `${employee.firstName} ${employee.lastName}`,
      })),
    },
    { name: 'orderDate', label: 'Order Date', type: 'datetime-local', required: true },
    { name: 'totalAmount', label: 'Total Amount', type: 'number', step: '0.01', required: true },
  ];

  return (
    <div>
      <button onClick={openModal}>Add Order</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Table {order.table.tableNumber} - {new Date(order.orderDate).toLocaleString()} - ${order.totalAmount.toFixed(2)}
            <div>
              <button onClick={() => handleEdit(order)}>Edit</button>
              <button onClick={() => handleDelete(order._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
