import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {fetchUsuarios } from "../../utils.js";
import "../styles.css";

function Login() {
  const [usuarios, setUsuarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
    const email = formData.get("email");
    const senha = formData.get("password");

    const usuarioValido = usuarios.find((usuario) => usuario.email === email && usuario.senha === senha);

    if (usuarioValido) {
      window.location.href = "/calendario";
    } else {
      setErrorMessage("Usuário não consta no sistema. Cadastre-se para ter acesso");
    }
  };

  return (
    <article id="Login">
      <div className="container">
        <h2>Login</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" required />
          <button id="login-cadastro" type="submit">
            Entrar
          </button>
        </form>
      </div>
      <p id="cadastro">Não tem uma conta?</p>
      <button id="login-cadastro">
        <Link id="cadastro" to="/cadastro">
          Cadastre-se
        </Link>
      </button>
    </article>
  );
}

export default Login;
