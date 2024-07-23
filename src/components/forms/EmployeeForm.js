import React, { useState, useEffect } from 'react';
import useEmployeeStore from '../../stores/employeeStore';

const EmployeeForm = ({ employee, onFormSubmit }) => {
  const { addEmployee, updateEmployee } = useEmployeeStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    phoneNumber: '',
    email: '',
    hireDate: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        position: '',
        phoneNumber: '',
        email: '',
        hireDate: '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employee) {
      await updateEmployee(employee._id, formData);
    } else {
      await addEmployee(formData);
    }
    onFormSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      phoneNumber: '',
      email: '',
      hireDate: '',
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
        <label>Position</label>
        <input type="text" name="position" value={formData.position} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Hire Date</label>
        <input type="date" name="hireDate" value={formData.hireDate} onChange={handleChange} required />
      </div>
      <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;
