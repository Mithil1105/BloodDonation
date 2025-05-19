import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../Components/Navbar";
import { Toaster } from 'react-hot-toast'
import Footer from "../Components/Footer";

const Layout = () => {
  return (
    <>
     <Toaster />
      <Navbar></Navbar>
      <main className="App">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;

