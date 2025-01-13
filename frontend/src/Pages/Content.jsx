import React from "react";

export default function Content() {
  return (
    <div className="flex-1 bg-slate-100 p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome to the Dashboard!
        </h1>
        <p className="text-slate-600">Here's an overview of your system.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Products" value="120" />
        <StatCard title="Orders Today" value="45" />
        <StatCard title="Pending Issues" value="3" />
      </div>

      {/* Recent Activity Section */}
    </div>
  );
}

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

// Activity Item Component
const ActivityItem = ({ title, description, time }) => (
  <li className="p-4 bg-white rounded-lg shadow-md flex justify-between">
    <div>
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
    <span className="text-sm text-slate-500">{time}</span>
  </li>
);
