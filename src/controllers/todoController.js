import mongoose from "mongoose";
import Todo from "../models/todoModels.js";
import { paginationSchema, todoSchema } from "../schemas/todoSchemas.js";
import { safeParse, success } from "zod";
import { query } from "express";

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
    const result = paginationSchema.safeParse(req.query)

    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        errors: result.error.flatten()
      });
    }

    const { completed, search, page, limit } = result.data;

    let query = {}

    if (completed !== undefined) {
      query.completed = completed;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const todos = await Todo.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!todos || todos.lenght === 0) {
      return res.status(200).json({});
    }

    const totalPages = await Todo.countDocuments(query);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPage: Math.ceil(totalPages / limit),
      count: todos.length,
      total: totalTodos,
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
};

export const fetchOneTodo = async (req, res) => {
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

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = todoSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten(),
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    const title = result.data.title;
    const description = result.data.description;

    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      {
        $set: { title, description },
      },
      { new: true, runValidators: true },
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: `todo updated successfully`,
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

export const updateTodoByStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    const todo = await Todo.findById(id);

    todo.completed = !todo.completed;
    await todo.save();

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: `TODO status updated successfully`,
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

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "bad request",
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      message: `todo deleted successfully`,
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
