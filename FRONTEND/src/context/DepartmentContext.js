import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const DepartmentContext = createContext();
export const useDepartments = () => useContext(DepartmentContext);

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const DepartmentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setLoading(false); // stop loading after auth check
    };
    init();
  }, []);

  // Fetch departments and identify department when user is set
  useEffect(() => {
    if (!user) {
      setDepartmentName(""); // reset departmentName if no user
      return;
    }

    const initialize = async () => {
      setLoading(true);
      await fetchDepartments();
      await identifyDepartment();
      setLoading(false);
    };
    initialize();
  }, [user]);

  useEffect(() => {
    console.log(departmentName);
  }, [departmentName]);

  // Check if user is logged in
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/check-auth");
      if (data.success) {
        setUser(data.user);
      } else {
        // Failed auth, reset everything
        setUser(null);
        setDepartmentName("");
        setDepartments([]);
      }
    } catch {
      setUser(null);
      setDepartmentName("");
      setDepartments([]);
    }
  };

  // Fetch all departments (for admin)
  const fetchDepartments = async () => {
    try {
      const res = await axios.get("/api/host/adminpage");
      setDepartments(res.data.departments || []);
    } catch {
      setDepartments([]);
    }
  };

  // Identify the user's department
  const identifyDepartment = async () => {
    try {
      const res = await axios.get("/api/getDepartment");
      setDepartmentName(res.data.departmentName || "");
    } catch {
      setDepartmentName("");
    }
  };

  // Add a new department (admin)
  const addDepartment = async (department) => {
    try {
      const res = await axios.post("/api/addDepartment", department);
      if (res.status === 200) {
        setDepartments((prev) => [...prev, res.data.department]);
        toast.success("Department added successfully");
        return { success: true };
      }
      return {
        success: false,
        message: res.data.message || "Failed to add department",
      };
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  // Edit department and update state
  const editDepartment = async (id, department) => {
    try {
      const res = await axios.put(`/api/host/editDepartment/${id}`, department);
      const data = res.data;
      if (res.status === 200) {
        setDepartments((prev) =>
          prev.map((d) => (d._id === id ? data.department : d))
        );
        toast.success("Department updated successfully");
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Failed to update department",
        };
      }
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const res = await axios.delete(`/api/host/deleteDepartment/${id}`);
      if (res.status === 200) {
        setDepartments((prev) => prev.filter((d) => d._id !== id));
        toast.success("Department deleted successfully");
        return { success: true };
      } else {
        return {
          success: false,
          message: res.data.message || "Failed to delete department",
        };
      }
    } catch {
      return { success: false, message: "Network error" };
    }
  };

  return (
    <DepartmentContext.Provider
      value={{
        user,
        setUser,
        departments,
        departmentName,
        loading,
        addDepartment,
        editDepartment,
        deleteDepartment,
        fetchDepartments,
        identifyDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};
