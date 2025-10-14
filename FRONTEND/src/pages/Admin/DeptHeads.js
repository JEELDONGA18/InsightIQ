import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar";
import Modal from "../../components/Modal";
import { useDepartments } from "../../context/DepartmentContext";
import DepartmentCard from "../../components/DepartmentCard";

const DeptHeads = () => {
  const { departments, loading, addDepartment } = useDepartments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHead, setEditingHead] = useState(null);
  const [form, setForm] = useState({ department: "", description: "" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const openCreateModal = () => {
    setEditingHead(null);
    setForm({ department: "", description: "" });
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (head) => {
    setEditingHead(head);
    setForm({ department: head.name, description: head.description });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    if (!form.department) {
      setFormError("Department name is required.");
      setFormLoading(false);
      return;
    }
    // Only add, not edit, for now
    const result = await addDepartment(form);
    console.log(result);
    if (result.success) {
      closeModal();
    } else {
      setFormError(result.message);
    }
    setFormLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-cyan-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">
            Manage Department
          </h1>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
          >
            + Add Department
          </button>
        </div>

        <div className="rounded-xl shadow-lg border border-cyan-500/20 p-6 flex flex-wrap gap-4">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : departments.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No departments found.
            </div>
          ) : (
            departments.map((dept) => (
              <DepartmentCard
                key={dept._id}
                department={dept}
                onEdit={openEditModal}
                onDelete={(d) => alert(`Deleting ${d.name}`)}
              />
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingHead ? "Edit Dept Head" : "Create Dept Head"}
        >
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="department"
              placeholder="Department Name"
              value={form.department}
              onChange={handleFormChange}
              className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleFormChange}
              className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            {formError && (
              <div className="text-red-500 text-sm">{formError}</div>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
              disabled={formLoading}
            >
              {formLoading ? "Saving..." : editingHead ? "Update" : "Create"}
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default DeptHeads;
