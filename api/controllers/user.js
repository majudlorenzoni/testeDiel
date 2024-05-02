import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const { nome, email, senha } = req.body;
  const q = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  db.query(q, [nome, email, senha], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Usuário cadastrado com sucesso.");
  });
}

export const getUserTasks = (req, res) => {
  const { userId } = req.params;
  const q = "SELECT * FROM tarefas WHERE id_usuario = ?";

  db.query(q, [userId], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json(data);
  });
};


export const addTask = (req, res) => {
  const q = "INSERT INTO tarefas (titulo, descricao, data, hora, duracao) VALUES (?, ?, ?, ?, ?)";
  const { titulo, descricao, data, hora, duracao } = req.body;
  db.query(q, [titulo, descricao, data, hora, duracao], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Tarefa cadastrada com sucesso.");
  });
}

export const deleteTask = (req, res) => {
  const q = "DELETE FROM tarefas WHERE id = ?";
  const { id } = req.params;

  db.query(q, [id], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
}

export const updateTask = (req, res) => {
  const q = "UPDATE tarefas SET titulo = ?, descricao = ?, data = ?, hora = ?, duracao = ? WHERE id = ?";
  const { titulo, descricao, data, hora, duracao } = req.body;
  const { id } = req.params;
  db.query(q, [titulo, descricao, data, hora, duracao, id], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
}
