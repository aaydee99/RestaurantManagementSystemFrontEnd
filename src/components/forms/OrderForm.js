import React, { useState, useEffect } from 'react';
import useOrderStore from '../../stores/orderStore';
import useTableStore from '../../stores/tableStore';
import useEmployeeStore from '../../stores/employeeStore';

const OrderForm = ({ order, onFormSubmit }) => {
  const { addOrder, updateOrder } = useOrderStore();
  const { tables, fetchTables } = useTableStore();
  const { employees, fetchEmployees } = useEmployeeStore();
  const [formData, setFormData] = useState({
    table: '',
    employee: '',
    orderDate: '',
    totalAmount: '',
  });

  useEffect(() => {
    fetchTables();
    fetchEmployees();
    if (order) {
      setFormData({
        ...order,
        orderDate: new Date(order.orderDate).toISOString().slice(0, 16),
      });
    } else {
      setFormData({
        table: '',
        employee: '',
        orderDate: '',
        totalAmount: '',
      });
    }
  }, [order, fetchTables, fetchEmployees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (order) {
      await updateOrder(order._id, formData);
    } else {
      await addOrder(formData);
    }
    onFormSubmit(formData);
    setFormData({
      table: '',
      employee: '',
      orderDate: '',
      totalAmount: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Table</label>
        <select name="table" value={formData.table} onChange={handleChange} required>
          <option value="">Select a table</option>
          {tables.map((table) => (
            <option key={table._id} value={table._id}>
              Table {table.tableNumber}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Employee</label>
        <select name="employee" value={formData.employee} onChange={handleChange} required>
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Order Date</label>
        <input type="datetime-local" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Total Amount</label>
        <input type="number" step="0.01" name="totalAmount" value={formData.totalAmount} onChange={handleChange} required />
      </div>
      <button type="submit">{order ? 'Update' : 'Add'} Order</button>
    </form>
  );
};

export default OrderForm;
