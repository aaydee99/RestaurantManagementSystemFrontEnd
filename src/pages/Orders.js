import React from 'react';
import OrderList from '../components/lists/OrderList';

const OrdersPage = () => {
  return (
    <div className='order'>
      <h1>Orders</h1>
      <OrderList />
    </div>
  );
};

export default OrdersPage;
