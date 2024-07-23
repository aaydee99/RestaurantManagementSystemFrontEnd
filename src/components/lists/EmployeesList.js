import React, { useEffect, useState } from 'react';
import useEmployeeStore from '../../stores/employeeStore';
import ModalComponent from '../Modal';

const EmployeeList = () => {
  const { employees, fetchEmployees, addEmployee, updateEmployee, removeEmployee } = useEmployeeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    phoneNumber: '',
    email: '',
    hireDate: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleSubmit = async (values) => {
    if (editingEmployee) {
      await updateEmployee(editingEmployee._id, values);
    } else {
      await addEmployee(values);
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      phoneNumber: '',
      email: '',
      hireDate: '',
    });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeEmployee(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
    setFormData({
      firstName: '',
      lastName: '',
      position: '',
      phoneNumber: '',
      email: '',
      hireDate: '',
    });
  };

  const fields = [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'position', label: 'Position', type: 'text', required: true },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'hireDate', label: 'Hire Date', type: 'date', required: true },
  ];

  return (
    <div>
      <h2>Employees</h2>
      <button onClick={openModal}>Add Employee</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.firstName} {employee.lastName}
            <div>
              <button onClick={() => handleEdit(employee)}>Edit</button>
              <button onClick={() => handleDelete(employee._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
