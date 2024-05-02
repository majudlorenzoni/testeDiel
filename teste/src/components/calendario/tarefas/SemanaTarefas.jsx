import React from "react";

class SemanaTarefas extends React.Component {
  render() {
    return (
      <div>
        <h2>Tarefas do Usuário semana</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Descrição</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tarefas.map(tarefa => (
              <tr key={tarefa.id}>
                <td>{tarefa.id}</td>
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

export default SemanaTarefas;
