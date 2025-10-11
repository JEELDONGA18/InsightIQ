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
  { title: "Next Month", value: "3", icon: "⚠️" },
  { title: "Next Quarter", value: "$50,000", icon: "🔮" },
  { title: "Next Financial Year", value: "5", icon: "📈" },
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

// -------------------------
// Department Dashboard Data
// -------------------------
export const deptDashboardData = {
  budgetVsActual: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    budget: [5000, 6000, 5500, 7000, 6500],
    actual: [4800, 6200, 5300, 6800, 6400]
  },
  employeeProductivity: {
    labels: ["Alice", "Bob", "Charlie", "David", "Eva"],
    data: [80, 75, 90, 70, 85]
  },
  softwareUsage: {
    labels: ["Tool A", "Tool B", "Tool C", "Tool D"],
    data: [40, 25, 20, 15]
  },
  clientData: [
    { Client: "Client X", Projects: 5, Revenue: "$10,000" },
    { Client: "Client Y", Projects: 3, Revenue: "$7,500" },
    { Client: "Client Z", Projects: 4, Revenue: "$9,000" }
  ],
  optimizationSuggestions: [
    { title: "Reduce Software Licenses", description: "Unused licenses detected in Tool B and C" },
    { title: "Reassign Projects", description: "Some employees are underutilized" }
  ]
};

// -------------------------
// Department Employees Data
// -------------------------
export const deptEmployeesData = {
  columns: ["ID", "Name", "Email", "Role", "Status", "Actions"],
  data: [
    { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Dept Head", status: "Active" },
    { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Employee", status: "Active" },
    { id: 3, name: "Charlie Lee", email: "charlie@company.com", role: "Employee", status: "Inactive" },
    { id: 4, name: "David Brown", email: "david@company.com", role: "Employee", status: "Active" },
  ],
  actions: ["Edit", "Delete", "View"]
};

// -------------------------
// Department Reports Data
// -------------------------
export const deptReportsData = {
  summaryCards: [
    { title: "Projects Completed", value: 12 },
    { title: "Active Employees", value: 8 },
    { title: "Budget Used", value: "$32,000" },
    { title: "Pending Tasks", value: 5 }
  ],
  performance: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [80, 90, 75, 85]
  },
  resources: {
    labels: ["Tool A", "Tool B", "Tool C"],
    data: [50, 30, 20]
  },
  downloads: [
    { name: "Monthly Report - January", link: "/reports/jan.pdf" },
    { name: "Monthly Report - February", link: "/reports/feb.pdf" },
    { name: "Monthly Report - March", link: "/reports/mar.pdf" },
  ]
};


// -------------------------
// Employee Dashboard Data
// -------------------------
export const employeeDashboardData = {
  summaryCards: [
    { title: "Daily Tasks", value: 5 },
    { title: "Pending Deadlines", value: 2 },
    { title: "KPI Progress", value: "75%" },
    { title: "Leads / Campaigns", value: 3 }
  ],
  tasks: {
    columns: ["Task", "Project", "Deadline", "Status"],
    data: [
      { Task: "Design Homepage", Project: "Website Redesign", Deadline: "2025-10-15", Status: "In Progress" },
      { Task: "Client Meeting Prep", Project: "Project X", Deadline: "2025-10-12", Status: "Pending" },
      { Task: "Bug Fix #23", Project: "Mobile App", Deadline: "2025-10-14", Status: "Completed" },
    ],
    actions: ["View", "Update"]
  },
  assignedClients: {
    columns: ["Client", "Tickets", "Revenue", "Status"],
    data: [
      { Client: "Client X", Tickets: 5, Revenue: "$10,000", Status: "Active" },
      { Client: "Client Y", Tickets: 3, Revenue: "$7,500", Status: "Active" },
    ],
    actions: ["View"]
  },
  performance: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [80, 90, 75, 85]
  },
  communicationFeed: [
    { sender: "Manager", message: "Please submit weekly report.", date: "2025-10-10" },
    { sender: "HR", message: "Update your profile.", date: "2025-10-09" },
    { sender: "Client X", message: "Project deadline extended.", date: "2025-10-08" },
  ]
};

// -------------------------
// Employee Tasks Data
// -------------------------
export const employeeTasksPageData = {
  columns: ["Task", "Project", "Deadline", "Status", "Priority"],
  data: [
    { Task: "Develop Login Module", Project: "Mobile App", Deadline: "2025-10-12", Status: "In Progress", Priority: "High" },
    { Task: "Email Campaign Design", Project: "Marketing Campaign", Deadline: "2025-10-15", Status: "Pending", Priority: "Medium" },
    { Task: "Database Migration", Project: "Internal Tools", Deadline: "2025-10-20", Status: "Pending", Priority: "High" },
  ],
  actions: ["View", "Update", "Complete"]
};

// -------------------------
// Employee Profile Data
// -------------------------
export const employeeProfileData = {
  personalInfo: {
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+91 9876543210",
    department: "IT",
    role: "Employee"
  },
  settings: {
    notifications: true,
    theme: "dark",
    language: "English"
  }
};