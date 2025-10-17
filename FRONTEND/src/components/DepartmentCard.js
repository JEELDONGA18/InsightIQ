import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentCard = ({ department, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 border border-cyan-500/30 rounded-xl shadow-md p-6 m-2 flex flex-col gap-2 transition hover:shadow-cyan-500/20">
      <h2 className="text-xl font-bold text-cyan-300">{department.name}</h2>
      <p className="text-gray-300">{department.description}</p>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(department)}
          className="px-3 py-1 bg-yellow-500 rounded-lg text-black font-medium hover:brightness-110 transition"
        >
          Edit
        </button>
        {department.name !== "admin" && (
          <button
            onClick={() => onDelete(department)}
            className="px-3 py-1 bg-red-500 rounded-lg font-medium hover:brightness-110 transition"
          >
            Delete
          </button>
        )}
        <button
          onClick={() => navigate(`/department/dashboard/${department._id}`)}
          className="px-3 py-1 bg-cyan-500 rounded-lg font-medium hover:bg-cyan-600 transition"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
