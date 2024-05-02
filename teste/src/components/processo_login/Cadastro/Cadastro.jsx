import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export class Cadastro extends React.Component {
  state = {
    cadastroSucesso: false,
    usuarios: []
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nome = formData.get("name");
    const email = formData.get("email");
    const senha = formData.get("password");

    try {
      const response = await fetch("http://localhost:3001/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

    const data = await response.json();
    console.log("AQUI Ó CADASTRO: ", data);
    this.setState({ cadastroSucesso: true });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  componentDidMount() {
    fetch("http://localhost:3001/login")
      .then(response => response.json())
      .then(data => this.setState({ usuarios: data }))
      .catch(error => console.error("Erro ao obter usuários:", error));
}

  render() {
    const { cadastroSucesso, usuarios } = this.state;

    if (cadastroSucesso) {
      return (
        <div>
          <p>Cadastro feito com sucesso!</p>
          <Link to="/login">Ir para a página de login</Link>
          <h2>Usuários cadastrados:</h2>
          <ul>
            {usuarios.map(usuario => (
              <li key={usuario.id}>{usuario.nome} - {usuario.email}</li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <article id="Cadastro">
        <div className="container">
          <h2>Cadastro</h2>
          <form onSubmit={this.handleSubmit}>
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
    );
  }
}

export default Cadastro;