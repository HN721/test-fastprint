import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
