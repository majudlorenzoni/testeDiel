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

export const getTask = (req, res) => {
  const { tarefaId } = req.params;
  const q = "SELECT * FROM tarefas WHERE id = ?";

  db.query(q, [tarefaId], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addTask = (req, res) => {
  const { userId } = req.params; 
  const { titulo, data, hora, duracao, descricao } = req.body; 
  const q = "INSERT INTO tarefas (id_usuario, titulo, data, hora, duracao, descricao) VALUES (?, ?, ?, ?, ?, ?)";
  
  console.log("Dados recebidos:", userId, titulo, data, hora, duracao, descricao);
  
  db.query(q, [userId, titulo, data, hora, duracao, descricao], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar tarefa:", err);
      return res.status(500).json("Erro ao cadastrar tarefa");
    }

    console.log("Tarefa cadastrada com sucesso.");
    return res.status(200).json("Tarefa cadastrada com sucesso.");
  });
};

export const deleteTask = (req, res) => {
  const q = "DELETE FROM tarefas WHERE id = ?";
  const { tarefaId  } = req.params;

  db.query(q, [tarefaId ], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Tarefa deletada com sucesso.");
  });
}

export const updateTask = (req, res) => {
  const q = "UPDATE tarefas SET titulo = ?, descricao = ?, data = ?, hora = ?, duracao = ? WHERE id = ?";
  const { titulo, descricao, data, hora, duracao } = req.body;
  const { tarefaId } = req.params;
  db.query(q, [titulo, descricao, data, hora, duracao, tarefaId], (err, data) => {
    if(err) return res.json(err);

    return res.status(200).json("Tarefa atualizada com sucesso.");
  });
}

export const searchTask = (req, res) => {
  const { id_usuario, titulo } = req.body;
  console.log("Cheugei aqui", id_usuario, titulo)
  const q = "SELECT * FROM tarefas WHERE titulo LIKE ? AND id_usuario = ?";
  
db.query(q, [`%${titulo}%`, id_usuario], (err, data) => {
  if (err) return res.status(500).json({ error: err.message });
  return res.status(200).json(data);
});

};

