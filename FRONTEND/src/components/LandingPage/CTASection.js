import React, { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your MSP?</h2>
        <p className="mb-8 text-lg">Sign up for early access or request a personalized demo.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="px-6 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-purple-100 transition"
          >
            {submitted ? "Submitted!" : "Request Access"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CTASection;
