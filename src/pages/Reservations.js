import React from 'react';
import ReservationList from '../components/lists/ReservationList';

const ReservationsPage = () => {
  return (
    <div className='reservation'>
      <h1>Reservations</h1>
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
