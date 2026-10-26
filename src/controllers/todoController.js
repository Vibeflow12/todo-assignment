import Todo from "../models/todoModels.js";
import { todoSchema } from "../schemas/todoSchemas.js";
import { safeParse, success } from "zod";

const createTodo = async (req, res) => {
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


export default createTodo;
