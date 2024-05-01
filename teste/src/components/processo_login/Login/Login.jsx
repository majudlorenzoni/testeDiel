import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export class Login extends React.Component {
  render() {
    return (
      <article id="Login">
          <div className="container">
            <h2>Login</h2>
            <form>
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" name="email" required />
              <label htmlFor="password">Senha</label>
              <input type="password" id="password" name="password" required />
              <button type="submit">
              <Link id="entrar" to="/cadastro">Entrar</Link>
              
              </button>
            </form>
          </div>
          <button id="CADASTRO">
          <Link id="cadastro" to="/cadastro">Cadastre-se</Link>
          </button>

          
        </article>
    );
  }
}

export default Login;