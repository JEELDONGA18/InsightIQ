// src/components/Table.js
import React from "react";

const Table = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.2)]">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-cyan-200 border-b border-cyan-500/20"
              >
                {col}
              </th>
            ))}
            {Array.isArray(actions) && (
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-cyan-200 border-b border-cyan-500/20">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-cyan-500/10 hover:bg-gray-800/70 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
            >
              {columns.map((col, i) => (
                <td key={i} className="px-4 py-3 text-sm text-cyan-100">
                  {row[col.toLowerCase()]}
                </td>
              ))}
              {Array.isArray(actions) && (
                <td className="px-4 py-3 flex gap-2">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      className="px-2 py-1 bg-cyan-500/80 hover:bg-cyan-400/90 rounded-md text-sm font-medium shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all duration-200"
                      onClick={() => console.log(action, row)}
                    >
                      {action}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;