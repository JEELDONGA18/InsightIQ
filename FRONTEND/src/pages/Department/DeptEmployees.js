// src/pages/Department/DeptEmployees.js
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table";
import Modal from "../../components/Modal"; 
import { deptEmployeesData } from "../../utils/data"; // Department-specific employees

const DeptEmployees = () => {
  const [employees, setEmployees] = useState(deptEmployeesData.data);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Open modal to add a new employee
  const handleAdd = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  // Open modal to edit an existing employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  // Delete an employee
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Save new or edited employee
  const handleSave = (employee) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
    } else {
      setEmployees([...employees, { ...employee, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const columns = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { title: "Status", key: "status" },
    { title: "Actions", key: "actions" },
  ];

  const data = employees.map(emp => ({
    ...emp,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(emp)}
          className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-md text-yellow-200 transition shadow-[0_0_10px_rgba(255,255,0,0.4)]"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(emp.id)}
          className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 rounded-md text-red-200 transition shadow-[0_0_10px_rgba(255,0,0,0.4)]"
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="deptHead" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">

          {/* Header & Add Button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-cyan-400">Manage Employees</h2>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-md text-cyan-200 transition shadow-[0_0_10px_rgba(0,255,255,0.4)]"
            >
              + Add Employee
            </button>
          </div>

          {/* Employees Table */}
          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            <Table columns={columns} data={data} />
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EmployeeForm
              employee={editingEmployee}
              onSave={handleSave}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default DeptEmployees;

// -------------------------------
// EmployeeForm Component
// -------------------------------
const EmployeeForm = ({ employee, onSave, onCancel }) => {
  const [formData, setFormData] = useState(employee || {
    name: "",
    email: "",
    role: "Employee",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-xl shadow-[0_0_20px_rgba(0,255,255,0.4)] flex flex-col gap-4 w-[400px] mx-auto"
    >
      <h3 className="text-cyan-400 font-semibold text-lg">{employee ? "Edit Employee" : "Add New Employee"}</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
      >
        <option value="Employee">Employee</option>
        <option value="Manager">Manager</option>
      </select>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="p-2 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 rounded-md text-cyan-200 transition shadow-[0_0_10px_rgba(0,255,255,0.4)]"
        >
          Save
        </button>
      </div>
    </form>
  );
};