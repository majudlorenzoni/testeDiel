import React from "react";
import "../styles.css";

export class Cadastro extends React.Component {
    render() {
      return (
        <article id="Cadastro">
            <div className="container">
              <h2>Cadastro</h2>
              <form>
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Cadastrar</button>
              </form>
            </div>
        </article>
      );
    }
  }

  export default Cadastro;