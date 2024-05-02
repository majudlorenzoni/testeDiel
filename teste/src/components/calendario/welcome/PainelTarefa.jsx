import React from 'react';
import '../styles.css';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';
import axios from 'axios';

export class PainelTarefa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: '',
      descricao: '',
      data: '',
      hora: '',
      duracao: 0,
      duracaoSelecionada: null
    };
  }

  handleTituloChange = (event) => {
    this.setState({ titulo: event.target.value });
  };

  handleDescricaoChange = (event) => {
    this.setState({ descricao: event.target.value });
  };

  handleDataChange = (event) => {
    this.setState({ data: event.target.value });
  };

  handleHoraChange = (event) => {
    this.setState({ hora: event.target.value });
  };

  setDuracao = (minutos) => {
    this.setState({ duracao: minutos, duracaoSelecionada: minutos });
  };

  fecharPainel = () => {
    this.props.onClose();
  };

  render() {
    const { titulo, descricao, data, hora } = this.state;
    return (
      <div className="painel-tarefa">
        <div className="painel-tarefa-header">
          <button className="btn-fechar" onClick={this.fecharPainel}>X</button>
        </div>
        <div className="painel-tarefa-body">
          <p>Título</p>
          <input type="text"/>

          <div className="data">
            <p>Data</p>
            <input type="date" ></input> <input type="time" />
            </div>

          <p>Duração</p>
          <div className="duracao">
            <button id="duracao" className={this.state.duracaoSelecionada === 15 ? 'selected' : ''} onClick={() => this.setDuracao(15)}>15 minutos</button>
            <button id="duracao" className={this.state.duracaoSelecionada === 30 ? 'selected' : ''} onClick={() => this.setDuracao(30)}>30 minutos</button>
            <button id="duracao" className={this.state.duracaoSelecionada === 45 ? 'selected' : ''} onClick={() => this.setDuracao(45)}>45 minutos</button>
            <button id="duracao" className={this.state.duracaoSelecionada === 60 ? 'selected' : ''} onClick={() => this.setDuracao(60)}>1 hora</button>
            <button id="duracao" className={this.state.duracaoSelecionada === 120 ? 'selected' : ''} onClick={() => this.setDuracao(120)}>2 horas</button>
          </div>
          <p>Descrição</p>
          <textarea placeholder="Descrição"></textarea>
          <button className="btn-salvar" onClick={() => this.props.onSave(titulo, descricao, data, hora, this.state.duracao)}>Salvar Tarefa</button>
        </div>
      </div>
    );
  }
}

export default PainelTarefa;