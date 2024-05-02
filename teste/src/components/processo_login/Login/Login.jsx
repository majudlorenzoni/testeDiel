import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export class Login extends React.Component {
  state = {
    errorMessage: ""
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const senha = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Usuário não consta no sistema. Cadastre-se para ter acesso");
      }    

      window.location.href = "/calendario";
    } catch (error) {
      console.error("Erro ao fazer login:", error.errorMessage);
      this.setState({ errorMessage: "Usuário não consta no sistema. Cadastre-se para ter acesso" });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <article id="Login">
          <div className="container">
            <h2>Login</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" name="password" required />
              <button id="login-cadastro" type="submit">
              <Link id="entrar" to="/calendario">Entrar</Link>
              </button>
            </form>
          </div>
          <p id="cadastro">Não tem uma conta?</p>
          <button id="login-cadastro">
          <Link id="cadastro" to="/cadastro">Cadastre-se</Link>
          </button>

          
        </article>
    );
  }
}

export default Login;