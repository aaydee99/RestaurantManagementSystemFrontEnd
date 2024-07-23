import React, { useState, useEffect } from 'react';
import useReservationStore from '../../stores/reservationStore';
import useCustomerStore from '../../stores/customerStore';
import useTableStore from '../../stores/tableStore';

const ReservationForm = ({ reservation, onFormSubmit }) => {
  const { addReservation, updateReservation } = useReservationStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { tables, fetchTables } = useTableStore();
  const [formData, setFormData] = useState({
    customer: '',
    table: '',
    reservationDate: '',
    numberOfGuests: '',
  });

  useEffect(() => {
    fetchCustomers();
    fetchTables();
    if (reservation) {
      setFormData({
        ...reservation,
        reservationDate: new Date(reservation.reservationDate).toISOString().slice(0, 16),
      });
    } else {
      setFormData({
        customer: '',
        table: '',
        reservationDate: '',
        numberOfGuests: '',
      });
    }
  }, [reservation, fetchCustomers, fetchTables]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reservation) {
      await updateReservation(reservation._id, formData);
    } else {
      await addReservation(formData);
    }
    onFormSubmit(formData);
    setFormData({
      customer: '',
      table: '',
      reservationDate: '',
      numberOfGuests: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer</label>
        <select name="customer" value={formData.customer} onChange={handleChange} required>
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
      </div>
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
        <label>Reservation Date</label>
        <input type="datetime-local" name="reservationDate" value={formData.reservationDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Number of Guests</label>
        <input type="number" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} required />
      </div>
      <button type="submit">{reservation ? 'Update' : 'Add'} Reservation</button>
    </form>
  );
};

export default ReservationForm;
