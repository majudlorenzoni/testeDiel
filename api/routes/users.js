import express from "express";
import { getUsers, addUser, getUserTasks, addTask, deleteTask, updateTask, getTask, searchTask} from "../controllers/user.js";

const router = express.Router();

router.get("/login", getUsers);
router.post("/cadastro", addUser);
router.get("/calendario/:userId/:opcao", getUserTasks);
router.post("/calendario/:userId/tarefa", addTask);
router.delete("/calendario/:userId/:opcao/:tarefaId", deleteTask);
router.get("/calendario/:userId/:opcao/:tarefaId", getTask);
router.put("/calendario/:userId/:opcao/:tarefaId", updateTask);
router.get("/calendario/:userId/:opcao", searchTask);


export default router;