import create from 'zustand';
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../services/employeeService';

const useEmployeeStore = create((set) => ({
  employees: [],
  fetchEmployees: async () => {
    const employees = await getEmployees();
    set({ employees });
  },
  fetchEmployee: async (id) => {
    const employee = await getEmployee(id);
    set((state) => ({
      employees: state.employees.map((e) =>
        e._id === id ? employee : e
      ),
    }));
  },
  addEmployee: async (employee) => {
    const newEmployee = await createEmployee(employee);
    set((state) => ({
      employees: [...state.employees, newEmployee],
    }));
  },
  updateEmployee: async (id, employee) => {
    const updatedEmployee = await updateEmployee(id, employee);
    set((state) => ({
      employees: state.employees.map((e) =>
        e._id === id ? updatedEmployee : e
      ),
    }));
  },
  removeEmployee: async (id) => {
    await deleteEmployee(id);
    set((state) => ({
      employees: state.employees.filter((e) => e._id !== id),
    }));
  },
}));

export default useEmployeeStore;
