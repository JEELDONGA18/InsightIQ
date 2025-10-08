import React from "react";

const features = [
  {
    icon: "💹",
    title: "Profit & Performance Insights",
    description: "Track profitability, revenue trends, and client health in real time."
  },
  {
    icon: "📊",
    title: "Department Budget Optimization",
    description: "Empower department heads to manage budgets and resources efficiently."
  },
  {
    icon: "🚀",
    title: "Sales & Marketing Growth Tools",
    description: "Unlock new growth opportunities with actionable sales and marketing analytics."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform glassmorphism">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
