import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AppRoutes from "./Routes.js";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  useEffect(() => {
    const getUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/login");
        setUsuarios(response.data);
        console.log("Dados dos usuários:", response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getTarefas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tasks");
        setTarefas(response.data);
        console.log("Dados das tarefas:", response.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getUsuarios();
    getTarefas();
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} position="bottom-right" />
      <AppRoutes />
    </>
  );
}

export default App;

