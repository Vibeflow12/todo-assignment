import { Router } from "express";
import {createTodo,fetchTodos, fetchOneTodo,updateTodo,updateTodoByStatus,deleteTodo } from "../controllers/todoController.js";

const todoRouter = Router();

todoRouter.post('/', createTodo)
todoRouter.get('/', fetchTodos)
todoRouter.get('/:id', fetchOneTodo)
todoRouter.put('/:id', updateTodo)
todoRouter.patch('/:id/toggle', updateTodoByStatus)
todoRouter.delete('/:id/', deleteTodo)

export default todoRouter;
