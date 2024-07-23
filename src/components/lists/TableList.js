import React, { useEffect, useState } from 'react';
import useTableStore from '../../stores/tableStore';
import ModalComponent from '../Modal';

const TableList = () => {
  const { tables, fetchTables, addTable, updateTable, removeTable } = useTableStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [formData, setFormData] = useState({
    tableNumber: '',
    seatingCapacity: '',
    status: '',
  });

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  const handleSubmit = async (values) => {
    if (editingTable) {
      await updateTable(editingTable._id, values);
    } else {
      await addTable(values);
    }
    setIsModalOpen(false);
    setEditingTable(null);
    setFormData({
      tableNumber: '',
      seatingCapacity: '',
      status: '',
    });
  };

  const handleEdit = (table) => {
    setEditingTable(table);
    setFormData(table);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await removeTable(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTable(null);
    setFormData({
      tableNumber: '',
      seatingCapacity: '',
      status: '',
    });
  };

  const fields = [
    { name: 'tableNumber', label: 'Table Number', type: 'number', required: true },
    { name: 'seatingCapacity', label: 'Seating Capacity', type: 'number', required: true },
    { name: 'status', label: 'Status', type: 'text', required: true },
  ];

  return (
    <div>
      <button onClick={openModal}>Add Table</button>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        initialValues={formData}
        handleSubmit={handleSubmit}
        fields={fields}
      />
      <ul>
        {tables.map((table) => (
          <li key={table._id} style={{color: 'black'}}>
            Table {table.tableNumber} - {table.status}
            <div>
              <button onClick={() => handleEdit(table)}>Edit</button>
              <button onClick={() => handleDelete(table._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
