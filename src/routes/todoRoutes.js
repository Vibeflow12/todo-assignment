import { Router } from "express";
import {createTodo,fetchTodos, fetchOneTodos } from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.post('/', createTodo)
todoRouter.get('/', fetchTodos)
todoRouter.get('/:id', fetchOneTodos)

export default todoRouter;
