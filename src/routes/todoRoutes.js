import { Router } from "express";
import {createTodo,fetchTodos, fetchOneTodo,updateTodo,updateTodoByStatus } from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.post('/', createTodo)
todoRouter.get('/', fetchTodos)
todoRouter.get('/:id', fetchOneTodo)
todoRouter.put('/:id', updateTodo)
todoRouter.patch('/:id/toggle', updateTodoByStatus)

export default todoRouter;
