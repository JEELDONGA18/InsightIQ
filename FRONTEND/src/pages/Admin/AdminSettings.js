// src/pages/Admin/Settings.js
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/DashboardCard";
import Table from "../../components/Table";
import { adminSettingsData } from "../../utils/data";

const AdminSettings = () => {
  return (
    <div className="flex min-h-screen bg-gray-950 text-cyan-100">
      {/* Sidebar */}
      <Sidebar role="admin" />

      <main className="flex-1 p-6 md:ml-64">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">
          Settings & Billing
        </h1>

        {/* Subscription Plan */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminSettingsData.subscriptionPlan.map((plan, idx) => (
            <DashboardCard key={idx} {...plan} />
          ))}
        </section>

        {/* Invoices Table */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Invoices
          </h2>
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-x-auto">
            <Table
              columns={adminSettingsData.invoices.columns}
              data={adminSettingsData.invoices.data}
              actions={adminSettingsData.invoices.actions}
            />
          </div>
        </section>

        {/* Payment Info */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Payment Info
          </h2>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-cyan-500/20">
            <p className="mb-2">
              <span className="font-semibold text-cyan-300">Card Holder:</span>{" "}
              {adminSettingsData.paymentInfo.cardHolder}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-cyan-300">Card Number:</span>{" "}
              **** **** **** {adminSettingsData.paymentInfo.cardLast4}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-cyan-300">Expiry:</span>{" "}
              {adminSettingsData.paymentInfo.expiry}
            </p>
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl shadow-md font-medium transition-colors duration-300">
              Update Payment Method
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminSettings;