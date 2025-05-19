import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavbar from "../Components/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
