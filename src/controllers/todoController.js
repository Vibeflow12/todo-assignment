import mongoose from "mongoose";
import Todo from "../models/todoModels.js";
import { todoSchema } from "../schemas/todoSchemas.js";
import { safeParse, success } from "zod";

export const createTodo = async (req, res) => {
  try {
    const result = todoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }

    const todo = await Todo.create(result.data);

    return res.status(201).json({
      message: "TODO created successfully",
      todo,
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};


export const fetchTodos = async (req, res) => {
  try {
    const { completed } = req.query;

    const query = completed !== undefined ? {completed:completed =='true'} : {}

    const todos = await Todo.find(query);

    if (!todos || todos.lenght === 0) {
      return res.status(200).json({});
    }

    return res.status(200).json({
      message: "all todos fecthed",
      todos,
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
}


export const fetchOneTodos = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: `todo fetched successfully`,
      todo,
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};
