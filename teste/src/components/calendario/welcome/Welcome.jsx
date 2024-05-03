import React from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export class Welcome extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: this.getDataAtual(),
      exibirOpcoes: false,
      opcaoSelecionada: "mês",
      showPainel: false,
      tarefas: [],
      tarefaSelecionada: null,
      possuiTarefas: false,
      showModal: false,
      novaTarefa: {
        idUsuario: localStorage.getItem('userId'),
        titulo: "",
        descricao: "",
        data: "",
        hora: "",
        duracao: 0
      },
      editarTarefa: {
        idUsuario: localStorage.getItem('userId'),
        titulo: "",
        descricao: "",
        data: "",
        hora: "",
        duracao: 0,
        },
        searchTitle: '',
        temporarySearchTitle: '',
        showSearchModal: false
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
        exibirOpcoes: false,
        opcaoSelecionada: "mês"
      });
    } else if (opcao === "dia") {
      const dia = dataAtual.getDate().toString().padStart(2, '0');
      const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
      const ano = dataAtual.getFullYear().toString().slice(-2);
      this.setState({
        data: `${dia}/${mes}/${ano}`,
        exibirOpcoes: false,
        opcaoSelecionada: "dia"
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
        exibirOpcoes: false,
        opcaoSelecionada: "semana"
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

  removerTarefa = (tarefaSelecionada) => {
    if (tarefaSelecionada == null) {
      toast.error("Uma tarefa precisa ser selecionada para editar.");
      return;
    } 
    
    const userId = localStorage.getItem('userId');
    axios.delete(`http://localhost:3000/calendario/${userId}/${this.state.opcaoSelecionada}/${tarefaSelecionada.id}`)
      .then(response => {
        console.log("Tarefa removida com sucesso");
        this.carregarTarefas(); // Recarrega as tarefas após a remoção
      })
      .catch(error => {
        console.error("Erro ao remover tarefa:", error);
      });
  };
  
  editarTarefa = (tarefaSelecionada) => {
    const userId = localStorage.getItem('userId');
    const { id, titulo, data, hora, duracao, descricao } = tarefaSelecionada;
    axios.put(`http://localhost:3000/calendario/${userId}/${this.state.opcaoSelecionada}/${id}`, { titulo, data, hora, duracao, descricao })
    .then(response => {
      console.log("Resposta do servidor:", response.data);
      this.carregarTarefas(); // Recarrega as tarefas após a edição
    })
      .catch(error => {
        console.error("Erro ao editar tarefa:", error);
      });
  };
  
  adicionarTarefa = () => {
    this.setState({ novaTarefa: { titulo: "", descricao: "", data: "", hora: "", duracao: 0 } });
    this.openModal();
  }

  openModal = () => {
    this.setState({ showModal: true });
  }
  
  closeModal = () => {
    this.setState({ showModal: false });
  }

  handleInputChange = (campo, valor) => {
    this.setState({
      novaTarefa: {
        ...this.state.novaTarefa,
        [campo]: valor,
        idUsuario: localStorage.getItem('userId') 
      }
    });
  }
  
  handleAdicionarTarefa = () => {
    const userId = localStorage.getItem('userId');
    axios.post(`http://localhost:3000/calendario/${userId}/tarefa`, this.state.novaTarefa)
      .then(response => {
        console.log("Resposta do servidor:", response.data);
        this.carregarTarefas();
        this.closeModal();
      })
      .catch(error => {
        console.error("Erro ao adicionar tarefa:", error);
      });
  }

  selecionarTarefa = (tarefaSelecionada) => {
      const userId = localStorage.getItem('userId');  
      axios.get(`http://localhost:3000/calendario/${userId}/${this.state.opcaoSelecionada}/${tarefaSelecionada.id}`)
      .then(response => {
        this.setState({ tarefaSelecionada });
        console.log("tAREFA SELECIONADA:", tarefaSelecionada);
    })
      .catch(error => {
        console.error("Erro ao remover tarefa:", error);
      });
  };
  
  openEditModal = (tarefaSelecionada) => {
    if (tarefaSelecionada == null) {
      toast.error("Uma tarefa precisa ser selecionada para editar.");
      return;
    } 

    this.setState({ editarTarefa: tarefaSelecionada });
    this.setState({ showEditModal: true });
  }

  closeEditModal = () => {
    this.setState({ showEditModal: false });
  }

  handleEditInputChange = (campo, valor) => {
    this.setState({
      editarTarefa: {
        ...this.state.editarTarefa,
        [campo]: valor
      }
    });
  }
  
  handleEditarTarefa = () => {
    const { id, titulo, data, hora, duracao, descricao } = this.state.editarTarefa;
    const userId = localStorage.getItem('userId');
    axios.put(`http://localhost:3000/calendario/${userId}/tarefa/${id}`, { titulo, data, hora, duracao, descricao })
      .then(response => {
        console.log("Resposta do servidor:", response.data);
        this.carregarTarefas();
        this.closeEditModal();
      })
      .catch(error => {
        console.error("Erro ao editar tarefa:", error);
      });
  }

  openSearchModal = () => {
    this.setState({ showSearchModal: true });
  };
  
  closeSearchModal = () => {
    this.setState({ showSearchModal: false });
  };
  
  handleSearchInputChange = (e) => {
    console.log("Valor digitado:", e.target.value);
    this.setState({ temporarySearchTitle: e.target.value });
  };
  
  abrirPesquisa = () => {
    this.openSearchModal();
  };

  buscarTarefa = () => {
    const userId = localStorage.getItem('userId');
    axios.get(`http://localhost:3000/calendario/${userId}/${this.state.opcaoSelecionada}`)
    .then(response => {
        if (response.data.length > 0) {
          const posicaoTarefaEncontrada = response.data.find(tarefa => tarefa.titulo === this.state.searchTitle);
          if (posicaoTarefaEncontrada) {
            const idTarefaEncontrada = posicaoTarefaEncontrada.id;
            console.log("ID da tarefa encontrada:", idTarefaEncontrada);
            console.log("Tarefa encontrada:", posicaoTarefaEncontrada);
            this.setState({ posicaoTarefaEncontrada: posicaoTarefaEncontrada, tarefaNaoEncontrada: false });
          } else {
            console.log("Tarefa não encontrada");
            this.setState({ tarefaEncontrada: null, tarefaNaoEncontrada: true });
          }
        } else {
          console.log("Tarefa não encontrada");
          this.setState({ tarefaEncontrada: null, tarefaNaoEncontrada: true });
        }
        this.closeSearchModal();
      })
}

  render() {

    <ToastContainer autoClose={3000} position="bottom-right" />

    const tarefasDoDia = this.state.tarefas.filter(tarefa => {
      const dataAtual = new Date().toISOString().split('T')[0]; 
      return tarefa.data === dataAtual;
    });
    
    return (
      <div className="welcome">
      <div className="header">
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
          <svg id="search-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256" onClick={this.abrirPesquisa}><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" ></path></svg>
          <svg id="add-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256" onClick={this.adicionarTarefa}>
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
          </svg>
          <svg id="edit-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256" onClick={() => this.openEditModal(this.state.tarefaSelecionada)}>
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM51.31,160,136,75.31,152.69,92,68,176.68ZM48,179.31,76.69,208H48Zm48,25.38L79.31,188,164,103.31,180.69,120Zm96-96L147.31,64l24-24L216,84.68Z"></path>
          </svg>
          <svg id="remove-tarefa" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#F2F2F2" viewBox="0 0 256 256"   onClick={() => this.removerTarefa(this.state.tarefaSelecionada)}>
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
        </div>
      </div>
          {this.state.showModal && (
          <div className="painel-tarefa">
            <div className="painel-tarefa-header">
              <span className="btn-fechar" onClick={this.closeModal}>&times;</span>
              <h2>Adicionar Tarefa</h2>
            </div>
            <div className="painel-tarefa-body">
              <p>Título</p>
              <input type="text" value={this.state.novaTarefa.titulo} onChange={(e) => this.handleInputChange("titulo", e.target.value)} />
              <div className="data">
                <p>Data</p>
                <input type="date" value={this.state.novaTarefa.data} onChange={(e) => this.handleInputChange("data", e.target.value)} /> 
                <input type="time" value={this.state.novaTarefa.hora} onChange={(e) => this.handleInputChange("hora", e.target.value)} />
              </div>
              <p>Duração</p>
              <input type="number" min="0" max="120" value={this.state.novaTarefa.duracao} onChange={(e) => this.handleInputChange("duracao", e.target.value)} /><p> minutos</p>
              <p>Descrição</p>
              <textarea placeholder="Descrição" value={this.state.novaTarefa.descricao} onChange={(e) => this.handleInputChange("descricao", e.target.value)}></textarea>
              <button className="btn-salvar" onClick={this.handleAdicionarTarefa}>Salvar Tarefa</button>
            </div>
          </div>
        
)}
          {this.state.showEditModal && (
            <div className="painel-tarefa">
              <div className="painel-tarefa-header">
                <span className="btn-fechar" onClick={this.closeEditModal}>&times;</span>
                <h2>Editar Tarefa</h2>
              </div>
              <div className="painel-tarefa-body">
                <p>Título</p>
                <input type="text" value={this.state.editarTarefa.titulo} onChange={(e) => this.handleEditInputChange("titulo", e.target.value)} />
                <div className="data">
                  <p>Data</p>
                <input 
            type="date" 
            value={formatDate(this.state.editarTarefa.data)} 
            onChange={(e) => this.handleEditInputChange("data", e.target.value)} 
            max={new Date().toISOString().split('T')[0]} 
          />
            <input type="time" value={this.state.editarTarefa.hora} onChange={(e) => this.handleEditInputChange("hora", e.target.value)} />
          </div>
          <p>Duração</p>
          <input type="number" min="0" max="120" value={this.state.editarTarefa.duracao} onChange={(e) => this.handleEditInputChange("duracao", e.target.value)} /><p> minutos</p>
          <p>Descrição</p>
          <textarea placeholder="Descrição" value={this.state.editarTarefa.descricao} onChange={(e) => this.handleEditInputChange("descricao", e.target.value)}></textarea>
          <button className="btn-salvar" onClick={this.handleEditarTarefa}>Salvar Tarefa</button>
        </div>
      </div>
    )}

        {this.state.showSearchModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.closeSearchModal}>&times;</span>
              <input
                type="text"
                value={this.state.temporarySearchTitle}
                onChange={this.handleSearchInputChange}
                placeholder="Digite o título da tarefa"
              />
            <button onClick={() => {
          this.setState({ searchTitle: this.state.temporarySearchTitle }); 
          this.buscarTarefa();
        }}>Pesquisar</button>
            </div>
          </div>
        )}

      {this.state.posicaoTarefaEncontrada && (
        <div>
          <h3>Tarefa Encontrada:</h3>
          <p>Título: {this.state.posicaoTarefaEncontrada.titulo}</p>
          <p>Descrição: {this.state.posicaoTarefaEncontrada.descricao}</p>
        </div>
      )}

      {this.state.tarefaNaoEncontrada && (
        <div>
          <h3>Tarefa Não Encontrada</h3>
        </div>
      )}
      
      {this.state.opcaoSelecionada === "dia" && (
  <div id="mostra">
    <table>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Titulo</th>
          <th>Descrição</th>
          <th>Duração </th>
        </tr>
      </thead>
      <tbody>
        {this.state.tarefas
          .filter(tarefa => {
            const dataAtual = new Date().toISOString().split('T')[0];
            const dataTarefa = new Date(tarefa.data).toISOString().split('T')[0];
            return dataTarefa === dataAtual;
          })
          .map(tarefa => {
            const horaFormatada = (tarefa.hora && tarefa.hora.length >= 5) ? 
              tarefa.hora.substring(0, 5) : 
              '';
            return (
              <tr
                id="tarefas-diarias-id"
                key={tarefa.id}
                onClick={() => {
                  this.selecionarTarefa(tarefa);
                }}
                className={this.state.tarefaSelecionada === tarefa ? 'tarefa-tabela selected' : 'tarefa-tabela'} 
              >
                <td>{horaFormatada}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.duracao} minutos</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
)}


{this.state.opcaoSelecionada === "semana" && (
  <div id="mostra">
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descrição</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {this.state.tarefas
          .filter(tarefa => {
            const hoje = new Date();
            const primeiraDataSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay()));
            const ultimaDataSemana = new Date(hoje.setDate(hoje.getDate() - hoje.getDay() + 6));

            const dataTarefa = new Date(tarefa.data);
            return dataTarefa >= primeiraDataSemana && dataTarefa <= ultimaDataSemana;
          })
          .map(tarefa => {
            const horaFormatada = (tarefa.hora && tarefa.hora.length >= 5) ? 
              tarefa.hora.substring(0, 5) : 
              '';
            return (
              <tr
                id="tarefas-semanais-id"
                key={tarefa.id}
                onClick={() => {
                  this.selecionarTarefa(tarefa);
                }}
                className={this.state.tarefaSelecionada === tarefa ? 'tarefa-tabela selected' : 'tarefa-tabela'} 
              >
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{new Date(tarefa.data).toLocaleDateString('pt-BR')}</td>
                <td>{horaFormatada}</td>
                <td>{tarefa.duracao} minutos</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
)}


{this.state.opcaoSelecionada === "mês" && (
  <div id="mostra">
    <table>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descrição</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {this.state.tarefas
          .filter(tarefa => {
            const hoje = new Date();
            const primeiroDiaMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
            const ultimoDiaMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

            const dataTarefa = new Date(tarefa.data);
            return dataTarefa >= primeiroDiaMes && dataTarefa <= ultimoDiaMes;
          })
          .map(tarefa => {
            const horaFormatada = (tarefa.hora && tarefa.hora.length >= 5) ? 
              tarefa.hora.substring(0, 5) : 
              '';
            return (
              <tr
                id="tarefas-mensais-id"
                key={tarefa.id}
                onClick={() => {
                  this.selecionarTarefa(tarefa);
                }}
                className={this.state.tarefaSelecionada === tarefa ? 'tarefa-tabela selected' : 'tarefa-tabela'} 
              >
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{new Date(tarefa.data).toLocaleDateString('pt-BR')}</td>
                <td>{horaFormatada}</td>
                <td>{tarefa.duracao} minutos</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
)}

</div>
);
  }
}

export default Welcome;