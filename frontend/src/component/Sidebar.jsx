import React from "react";
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-1/6 h-screen bg-slate-800 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white">FAST PRINT</h1>
        <p className="text-sm text-slate-400">Your admin panel</p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 space-y-4">
        <NavItem icon={<FaHome />} label="Dashboard" to="/" />
        <NavItem icon={<FaBoxOpen />} label="Products" to="/product" />
        <NavItem icon={<FaClipboardList />} label="Orders" to="/orders" />
        <NavItem icon={<FaCogs />} label="Settings" to="/settings" />
      </div>

      {/* Footer/Logout */}
      <div className="p-6 border-t border-slate-700">
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-400 w-full">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

// Reusable Nav Item Component
const NavItem = ({ icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-slate-700 transition"
  >
    <div className="text-xl">{icon}</div>
    <span className="text-sm">{label}</span>
  </Link>
);
