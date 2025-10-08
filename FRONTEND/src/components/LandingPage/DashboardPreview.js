import React from "react";

const dashboards = [
  {
    role: "Admin",
    img: "https://dummyimage.com/400x250/6366f1/fff&text=Admin+Dashboard",
    desc: "Full MSP overview: profit, clients, teams."
  },
  {
    role: "Department Head",
    img: "https://dummyimage.com/400x250/8b5cf6/fff&text=Dept+Dashboard",
    desc: "Department performance, budget, and KPIs."
  },
  {
    role: "Agent",
    img: "https://dummyimage.com/400x250/0ea5e9/fff&text=Agent+Dashboard",
    desc: "Personal goals, client tasks, and efficiency."
  }
];

const DashboardPreview = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Dashboard Previews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dashboards.map((dash, idx) => (
            <div key={idx} className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-6 flex flex-col items-center hover:scale-105 transition-transform">
              <img src={dash.img} alt={dash.role + ' dashboard'} className="rounded-xl mb-4 w-full h-48 object-cover shadow-md" />
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{dash.role}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{dash.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
