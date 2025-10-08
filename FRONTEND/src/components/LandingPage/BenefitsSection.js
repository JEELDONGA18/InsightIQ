import React from "react";

const benefits = [
  {
    title: "Accelerate MSP Growth",
    desc: "Unlock new revenue streams and scale your business with actionable analytics."
  },
  {
    title: "Boost Team Efficiency",
    desc: "Empower every team member with clear goals and performance tracking."
  },
  {
    title: "Smarter Decision-Making",
    desc: "Make data-driven decisions with real-time insights and forecasts."
  },
  {
    title: "Optimize Client Performance",
    desc: "Identify top clients and opportunities for improvement instantly."
  }
];

const BenefitsSection = () => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">Why ProfitPulse?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform glassmorphism">
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{benefit.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
