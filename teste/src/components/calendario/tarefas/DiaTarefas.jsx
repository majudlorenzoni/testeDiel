import React from "react";
import "../styles.css";


class DiaTarefas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tarefaSelecionada: null
    };
  }
  
  selecionarTarefa = (tarefa) => {
    this.setState({ tarefaSelecionada: tarefa });
    console.log('Tarefa selecionada1:', tarefa);
  }
  
  render() {
    return (
      <div>
        <h2>Tarefas do Usuário dia</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tituto</th>
              <th>Descrição</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tarefas.map(tarefa => (
              <tr id="tarefas-diarias-id" key={tarefa.id} onClick={() => { this.selecionarTarefa(tarefa); }} 
              className={this.state.tarefaSelecionada === tarefa ? 'selected' : ''}>

                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DiaTarefas;