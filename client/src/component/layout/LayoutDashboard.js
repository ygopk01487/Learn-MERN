import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../routing/ProtectedRoute";
import NavbarMenu from "./NavbarMenu";

const LayoutDashboard = () => {
  return (
    <>
      <ProtectedRoute>
        <NavbarMenu />
      </ProtectedRoute>
      <Outlet />
    </>
  );
};

export default LayoutDashboard;
