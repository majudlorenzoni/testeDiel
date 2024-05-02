import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {fetchUsuarios } from "../../utils.js";
import "../styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Cadastro() {
  const [redirect, setRedirect] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosResponse = await fetchUsuarios();
        setUsuarios(usuariosResponse);
        console.log("Dados dos usuários:", usuariosResponse);
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nome = formData.get("name");
    const email = formData.get("email");
    const senha = formData.get("password");

    try {
      const usuariosResponse = await fetchUsuarios(); //Tirar depois ok
      setUsuarios(usuariosResponse); //Tirar depois ok

     await axios.post("http://localhost:3000/cadastro", { nome, email, senha });

      toast.success("Cadastro feito com sucesso!");
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
      console.log("Dados dos usuários:", usuariosResponse); //Tirar depois ok
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
    }
    
  };

  const navigateLogin = useNavigate();

  if (redirect) {
    return navigateLogin("/login");
  }

  return (
    <>
    <ToastContainer autoClose={3000} position="bottom-right" />
    <article id="Cadastro">
      <div className="container">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" required />
          <button id="login-cadastro" type="submit">Cadastre-se</button>
        </form>
      </div>
    </article>
    </>
  );
}

export default Cadastro;