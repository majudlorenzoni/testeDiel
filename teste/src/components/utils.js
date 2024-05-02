import axios from "axios";

export const fetchUsuarios = async () => {
  try {
    const usuariosResponse = await axios.get("http://localhost:3000/login");
    return usuariosResponse.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTarefas = async (userId) => {
  try {
    const tarefasResponse = await axios.get(`http://localhost:3000/calendario/${userId}`);
    return tarefasResponse.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
