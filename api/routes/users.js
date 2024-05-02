import express from "express";
import { getUsers, addUser, getTasks, addTask, deleteTask, updateTask} from "../controllers/user.js";

const router = express.Router();

router.get("/login", getUsers);
router.post("/cadastro", addUser);
router.get("/tasks", getTasks);
router.post("/tasks", addTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);

export default router;