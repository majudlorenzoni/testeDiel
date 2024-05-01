import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Login from "./components/processo_login/Login/Login";
import Cadastro from "./components/processo_login/Cadastro/Cadastro";
import Welcome from "./components/calendario/welcome/Welcome";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/calendario" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
