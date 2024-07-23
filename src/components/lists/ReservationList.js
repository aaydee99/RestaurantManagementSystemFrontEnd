import React, { useEffect, useState } from 'react';
import useReservationStore from '../../stores/reservationStore';
import useCustomerStore from '../../stores/customerStore';
import useTableStore from '../../stores/tableStore';
import ModalComponent from '../Modal';

const ReservationList = () => {
  const { reservations, fetchReservations, addReservation, updateReservation, removeReservation } = useReservationStore();
  const { customers, fetchCustomers } = useCustomerStore();
  const { tables, fetchTables } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    customer: '',
    table: '',
    reservationDate: '',
    numberOfGuests: '',
  });

  useEffect(() => {
    fetchReservations();
    fetchCustomers();
    fetchTables();
  }, [fetchReservations, fetchCustomers, fetchTables, customers, reservations]);

  const handleSubmit = async (values) => {
    if (editingReservation) {
      await updateReservation(editingReservation._id, values);
    } else {
      await addReservation(values);
    }
    setIsModalOpen(false);
    setEditingReservation(null);
    setFormData({
      customer: '',
      table: '',
      reservationDate: '',
      numberOfGuests: '',
    });
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setFormData({
      ...reservation,
      reservationDate: new Date(reservation.reservationDate).toISOString().slice(0, 16),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeReservation(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReservation(null);
    setFormData({
      customer: '',
      table: '',
      reservationDate: '',
      numberOfGuests: '',
    });
  };

  const fields = [
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
    { name: 'reservationDate', label: 'Reservation Date', type: 'datetime-local', required: true },
    { name: 'numberOfGuests', label: 'Number of Guests', type: 'number', required: true },
  ];

  return (
    <div>
      <button onClick={openModal}>Add Reservation</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            {reservation.customer.firstName} {reservation.customer.lastName} - Table {reservation.table.tableNumber} at {new Date(reservation.reservationDate).toLocaleString()}
            
            <div>
              <button onClick={() => handleEdit(reservation)}>Edit</button>
              <button onClick={() => handleDelete(reservation._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
