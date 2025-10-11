import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/sidebar.js";
import Table from "../../components/Table";
import { employeeTasksPageData } from "../../utils/data";

const Tasks = () => {
  const [tasks, setTasks] = useState(employeeTasksPageData.data);

  // Mark task as completed
  const handleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  // Table columns from data.js
  const columns = employeeTasksPageData.columns.map(col => ({
    title: col,
    key: col.toLowerCase()
  }));

  // Table data with actions
  const data = tasks.map((task) => ({
    ...task,
    actions: (
      <div className="flex gap-2">
        {task.status !== "Completed" && (
          <button
            onClick={() => handleComplete(task.id)}
            className="px-3 py-1 bg-green-500/30 hover:bg-green-500/50 rounded-md text-green-200 transition shadow-[0_0_10px_rgba(0,255,0,0.4)]"
          >
            Mark Complete
          </button>
        )}
      </div>
    ),
  }));

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar role="employee" />

      <main className="flex-1 p-4 md:ml-64 overflow-x-hidden">
        <div className="w-full max-w-[1600px] mx-auto border border-gray-800 p-5 rounded-xl shadow-md m-2">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Tasks / Projects</h2>

          <div className="bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-x-auto">
            <Table columns={columns} data={data} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;
