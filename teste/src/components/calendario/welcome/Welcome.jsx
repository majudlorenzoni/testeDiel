import React from "react";
// import { Link } from "react-router-dom";
import "../styles.css";

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getDataAtual(),
      exibirOpcoes: false,
      opcaoSelecionada: "",
    };
  }

  getDataAtual = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  toggleOpcoes = () => {
    this.setState((prevState) => ({
      exibirOpcoes: !prevState.exibirOpcoes
    }));
  };

  selecionarOpcao = (opcao) => {

    const dataAtual = new Date();
    const primeiroDiaSemana = dataAtual.getDate() - dataAtual.getDay() + (dataAtual.getDay() === 0 ? -6 : 1);
    const ultimoDiaSemana = primeiroDiaSemana + 6;

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    if (opcao === "mês") {
      this.setState({
        data: meses[dataAtual.getMonth()],
        exibirOpcoes: false
      });
    } else if (opcao === "dia") {
      const dia = dataAtual.getDate().toString().padStart(2, '0');
      const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
      const ano = dataAtual.getFullYear().toString().slice(-2);
      this.setState({
        data: `${dia}/${mes}/${ano}`,
        exibirOpcoes: false
      });
    } else if (opcao === "semana") {
      let diaInicio = primeiroDiaSemana.toString().padStart(2, '0');
      if(diaInicio < 1) {
        diaInicio = 1;
      }
      const mesInicio = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
      const diaFim = ultimoDiaSemana.toString().padStart(2, '0');
      this.setState({
        data: `${diaInicio}/${mesInicio} - ${diaFim}/${mesInicio}`,
        exibirOpcoes: false
      });
    }
  };

  render() {
    return (
      <div className="welcome">
      <h1>Bem vinda, Maria</h1>
        <div className="navbar">
          <svg id="add-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>

          <div className="calendario">
          <span onClick={this.toggleOpcoes}>{this.state.data}</span>
          {this.state.exibirOpcoes && (
            <ul className="opcoes">
              <li onClick={() => this.selecionarOpcao("dia")}>Diário</li>
              <li onClick={() => this.selecionarOpcao("semana")}>Semanal</li>
              <li onClick={() => this.selecionarOpcao("mês")}>Mensal</li>
            </ul>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
