import axios from "axios";

export const fetchUsuarios = async () => {
  try {
    const usuariosResponse = await axios.get("http://localhost:3000/login");
    return usuariosResponse.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
