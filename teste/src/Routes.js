import React from "react";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";

import Login from "./components/processo_login/Login/Login";
import Cadastro from "./components/processo_login/Cadastro/Cadastro";
import Welcome from "./components/calendario/welcome/Welcome";
import PainelTabela from "./components/calendario/tarefas/PainelTarefa";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/calendario" element={<Welcome />} />
        <Route path="/calendario/painel" element={<PainelTabela />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
