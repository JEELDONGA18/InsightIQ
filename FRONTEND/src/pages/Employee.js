import React, { useState, useEffect } from "react";
import { useDepartments } from "../context/DepartmentContext";
import axios from "axios";
import Sidebar from "../components/Sidebar/sidebar.js";
import { useForm } from "react-hook-form";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URI;
axios.defaults.withCredentials = true;

const EmployeePage = () => {
  const { departments } = useDepartments();
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/api/host/getEmployee");
      setEmployees(res.data.employees || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setShowModal(false);

    try {
      const res = await axios.post("/api/addUser", data);

      if (res.data.success) {
        setEmployees((prev) => [...prev, res.data.employee]);
        reset(); // clear form
      }
    } catch (error) {
      console.error("Failed to add employee", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [onSubmit]);
  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="admin" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 drop-shadow-lg">
            Manage Employees
          </h2>
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-5 rounded-full shadow-lg shadow-cyan-500/30 transition-all"
            onClick={() => setShowModal(true)}
          >
            + Add Employee
          </button>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto bg-[#12161f] rounded-xl shadow-lg border border-gray-700/40">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-[#1b202b] text-gray-300 uppercase text-sm tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Department</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="hover:bg-[#1f2533] transition-colors"
                >
                  <td className="px-6 py-4">{emp.email}</td>
                  <td className="px-6 py-4">{emp.department}</td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-gray-400 italic"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#141923] p-6 rounded-lg w-full max-w-md relative shadow-lg border border-gray-700/50 shadow-cyan-500/20">
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-cyan-400 text-2xl font-bold"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h3 className="text-2xl font-semibold mb-5 text-cyan-400 drop-shadow-md">
                Create Employee
              </h3>

              {/* ✅ React Hook Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                    className="w-full p-3 rounded-md bg-[#1b202b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full p-3 rounded-md bg-[#1b202b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <select
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className="w-full p-3 rounded-md bg-[#1b202b] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-md font-semibold shadow-lg shadow-cyan-500/30 transition-all"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeePage;
