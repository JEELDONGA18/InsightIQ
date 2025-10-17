import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar";
import Modal from "../../components/Modal";
import { useDepartments } from "../../context/DepartmentContext";
import DepartmentCard from "../../components/DepartmentCard";

const DeptHeads = () => {
  const {
    departments,
    loading,
    addDepartment,
    editDepartment,
    deleteDepartment,
  } = useDepartments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHead, setEditingHead] = useState(null);
  const [form, setForm] = useState({ department: "", description: "" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  // Custom delete confirmation modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteDept, setPendingDeleteDept] = useState(null);

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
    let result;
    if (editingHead) {
      result = await editDepartment(editingHead._id, {
        name: form.department,
        description: form.description,
      });
    } else {
      result = await addDepartment(form);
    }
    if (result.success) {
      closeModal();
    } else {
      setFormError(result.message);
    }
    setFormLoading(false);
  };

  // Open custom delete modal
  const handleDelete = (dept) => {
    setPendingDeleteDept(dept);
    setDeleteModalOpen(true);
  };

  // Confirm delete action
  const confirmDelete = async () => {
    if (pendingDeleteDept) {
      await deleteDepartment(pendingDeleteDept._id);
      setDeleteModalOpen(false);
      setPendingDeleteDept(null);
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setPendingDeleteDept(null);
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
                onDelete={handleDelete}
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

        {/* Custom Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModalOpen}
          onClose={cancelDelete}
          title="Confirm Delete"
        >
          <div className="flex flex-col gap-4 items-center justify-center p-2">
            <p className="text-lg text-cyan-300 text-center">
              Are you sure you want to delete
              <span className="font-bold text-cyan-400">
                {" "}
                {pendingDeleteDept?.name}{" "}
              </span>
              ?
            </p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-medium shadow-[0_0_10px_rgba(255,0,0,0.3)]"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-xl text-white font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default DeptHeads;
