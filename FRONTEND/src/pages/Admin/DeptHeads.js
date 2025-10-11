// src/pages/Admin/DeptHeads.js
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { adminDeptHeadsData } from "../../utils/data";

const DeptHeads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHead, setEditingHead] = useState(null);

  const openCreateModal = () => {
    setEditingHead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (head) => {
    setEditingHead(head);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-cyan-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-cyan-400">
            Manage Department Heads
          </h1>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
          >
            + Add Dept Head
          </button>
        </div>

        <div className="bg-gray-900 rounded-xl shadow-lg border border-cyan-500/20 overflow-x-auto">
          <Table
            columns={adminDeptHeadsData.columns}
            data={adminDeptHeadsData.data}
            actions={(head) => (
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(head)}
                  className="px-2 py-1 bg-yellow-500 rounded-lg text-black font-medium hover:brightness-110 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => alert(`Deleting ${head.name}`)}
                  className="px-2 py-1 bg-red-500 rounded-lg font-medium hover:brightness-110 transition"
                >
                  Delete
                </button>
              </div>
            )}
          />
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={editingHead ? "Edit Dept Head" : "Create Dept Head"}
        >
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              defaultValue={editingHead?.name || ""}
              className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={editingHead?.email || ""}
              className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-xl text-black border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.4)] font-medium transition-shadow duration-300"
            >
              {editingHead ? "Update" : "Create"}
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default DeptHeads;