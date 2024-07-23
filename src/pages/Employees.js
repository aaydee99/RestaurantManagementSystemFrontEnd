import React from 'react';
import EmployeeList from '../components/lists/EmployeesList';

const EmployeesPage = () => {
  return (
    <div className='employee'>
      <h1>Employees</h1>
      <EmployeeList />
    </div>
  );
};

export default EmployeesPage;
