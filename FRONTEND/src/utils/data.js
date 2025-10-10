// src/utils/data.js

// -------------------------
// Admin Dashboard Data
// -------------------------
const sampleProfitability = [
  { title: "Revenue", value: "$120,000", icon: "💰" },
  { title: "Expenses", value: "$80,000", icon: "📉" },
  { title: "Profit Margin", value: "33%", icon: "📊" },
];

const sampleClientPerformance = {
  columns: ["Client", "Revenue", "Profit", "Renewal Date", "Status"],
  data: [
    { Client: "Client A", Revenue: "$20,000", Profit: "$7,000", "Renewal Date": "2025-11-15", Status: "Active" },
    { Client: "Client B", Revenue: "$15,000", Profit: "$5,000", "Renewal Date": "2025-12-01", Status: "Active" },
    { Client: "Client C", Revenue: "$10,000", Profit: "$2,000", "Renewal Date": "2025-11-20", Status: "Pending" },
  ],
  actions: ["Edit", "View"]
};

const sampleTeamPerformance = {
  labels: ["Sales", "IT", "Marketing"],
  data: [85, 70, 90]
};

const sampleServiceUtilization = {
  labels: ["Tool A", "Tool B", "Tool C"],
  data: [60, 25, 15]
};

const sampleGrowthInsights = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  data: [5000, 7000, 6500, 8000, 9000]
};

const samplePredictiveInsights = [
  { title: "Next Quarter Profit Forecast", value: "$50,000", icon: "🔮" },
  { title: "Potential Churn Clients", value: "3", icon: "⚠️" },
  { title: "Upsell Opportunities", value: "5", icon: "📈" },
]; 

export const adminDashboardData = {
  profitability: sampleProfitability,
  clientPerformance: sampleClientPerformance,
  teamPerformance: sampleTeamPerformance,
  serviceUtilization: sampleServiceUtilization,
  growthInsights: sampleGrowthInsights,
  predictiveInsights: samplePredictiveInsights,
};

// -------------------------
// Admin Settings Data
// -------------------------
const sampleSubscriptionPlan = [
  { title: "Basic Plan", value: "$29/month", icon: "📦" },
  { title: "Pro Plan", value: "$59/month", icon: "🚀" },
  { title: "Enterprise", value: "$99/month", icon: "🏢" },
];

const sampleInvoices = {
  columns: ["Invoice #", "Client", "Amount", "Date", "Status"],
  data: [
    { "Invoice #": "INV-001", Client: "Client A", Amount: "$2000", Date: "2025-10-01", Status: "Paid" },
    { "Invoice #": "INV-002", Client: "Client B", Amount: "$1500", Date: "2025-10-05", Status: "Pending" },
    { "Invoice #": "INV-003", Client: "Client C", Amount: "$1200", Date: "2025-10-10", Status: "Overdue" },
  ],
  actions: ["View", "Download"]
};

const samplePaymentInfo = {
  cardHolder: "John Doe",
  cardLast4: "1234",
  expiry: "12/26"
};

export const adminSettingsData = {
  subscriptionPlan: sampleSubscriptionPlan,
  invoices: sampleInvoices,
  paymentInfo: samplePaymentInfo
};

// -------------------------
// Admin Department Heads Data
// -------------------------
const sampleDeptHeads = [
  { id: 1, name: "Alice Johnson", department: "IT", email: "alice@company.com", status: "Active" },
  { id: 2, name: "Bob Smith", department: "Sales", email: "bob@company.com", status: "Active" },
  { id: 3, name: "Carol Lee", department: "Marketing", email: "carol@company.com", status: "Inactive" },
];

export const adminDeptHeadsData = {
  columns: ["ID", "Name", "Department", "Email", "Status", "Actions"],
  data: sampleDeptHeads,
  actions: ["Edit", "Delete", "View"]
};

// -------------------------
// Admin Employees Data
// -------------------------
const sampleEmployees = [
  { id: 1, name: "David Brown", department: "IT", manager: "Alice Johnson", email: "david@company.com", status: "Active" },
  { id: 2, name: "Eva Green", department: "Sales", manager: "Bob Smith", email: "eva@company.com", status: "Active" },
  { id: 3, name: "Frank White", department: "Marketing", manager: "Carol Lee", email: "frank@company.com", status: "Inactive" },
  { id: 4, name: "Grace Kim", department: "IT", manager: "Alice Johnson", email: "grace@company.com", status: "Active" },
];

export const adminEmployeesData = {
  columns: ["ID", "Name", "Department", "Manager", "Email", "Status", "Actions"],
  data: sampleEmployees,
  actions: ["Edit", "Delete", "View"]
};