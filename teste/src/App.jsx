import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./Routes.js";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <AppRoutes />
    </>
  );
}

export default App;

