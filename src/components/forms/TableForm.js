import React, { useState, useEffect } from 'react';
import useTableStore from '../../stores/tableStore';

const TableForm = ({ table, onFormSubmit }) => {
  const { addTable, updateTable } = useTableStore();
  const [formData, setFormData] = useState({
    tableNumber: '',
    seatingCapacity: '',
    status: '',
  });

  useEffect(() => {
    if (table) {
      setFormData(table);
    } else {
      setFormData({
        tableNumber: '',
        seatingCapacity: '',
        status: '',
      });
    }
  }, [table]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (table) {
      await updateTable(table._id, formData);
    } else {
      await addTable(formData);
    }
    onFormSubmit(formData);
    setFormData({
      tableNumber: '',
      seatingCapacity: '',
      status: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Table Number</label>
        <input type="number" name="tableNumber" value={formData.tableNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Seating Capacity</label>
        <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} required />
      </div>
      <div>
        <label>Status</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} required />
      </div>
      <button type="submit">{table ? 'Update' : 'Add'} Table</button>
    </form>
  );
};

export default TableForm;
