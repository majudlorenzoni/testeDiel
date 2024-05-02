import React from "react";
import axios from "axios";
import PainelTarefa from '../tarefas/PainelTarefa';
import DiaTarefas from '../tarefas/DiaTarefas';
import SemanaTarefas from "../tarefas/SemanaTarefas";
import MesTarefas from "../tarefas/MesTarefas";
import "../styles.css";

export class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.getDataAtual(),
      exibirOpcoes: false,
      opcaoSelecionada: "dia",
      showPainel: null,
      tarefas: [],
      possuiTarefas: false
    };
  }
  
  componentDidMount() {
    this.carregarTarefas();
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

    if (opcao === "dia" || opcao === "semana" || opcao === "mês") {
      this.carregarTarefas();
  }
  };

  carregarTarefas = () => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:3000/calendario/${userId}/${this.state.opcaoSelecionada}`)
    .then(response => {
      this.setState({
        tarefas: response.data,
        possuiTarefas: response.data.length > 0
      });
      console.log("Tarefas: ", this.state.tarefas); // Correção aqui
    })
    .catch(error => {
      console.error("Erro ao carregar tarefas do usuário:", error);
    });
};

  render() {
    const userId = localStorage.getItem('userId');
    console.log("userId:", userId);
    return (
      <div className="welcome">
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
          
          <div className="icons">
        <svg id="search-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
          <svg id="add-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256" onClick={this.handlePainel}>
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          <svg id="edit-tarefa"xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256">
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
          </svg>
          <svg id="remove-tarefa"xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256">
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
          </div>

          {this.state.opcaoSelecionada === "dia" && <DiaTarefas tarefas={this.state.tarefas} />}

        </div>
    );
  }
}
export default Welcome;