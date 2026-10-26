import { Router } from "express";
import createTodo from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.post('/', createTodo)

export default todoRouter;
