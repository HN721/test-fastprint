import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import AppLayout from "./Layout/AppLayout";
import Content from "./Pages/Content";
import Edit from "./component/Edit";
import Create from "./component/Create";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main layout */}
        <Route path="/" element={<AppLayout />}>
          {/* Nested routes */}
          <Route index element={<Content />} />
          <Route path="product" element={<Product />} />
          <Route path="product/edit/:id" element={<Edit />} />
          <Route path="product/create" element={<Create />} />

          <Route path="orders" element={<div>Orders Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
