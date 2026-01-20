import { Todo } from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = await Todo.create({ title , user: req.user.id  });

    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully!",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating todo",
    });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting todo",
    });
  }
};


export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await Todo.find({user: req.user.id});

    return res.status(200).json({
      success: true,
      message: "Todos fetched successfully!",
      allTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching todos",
    });
  }
};


export const getSingleTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo fetched successfully!",
      todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching todo",
    });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo Updated Successfully!",
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating todo",
    });
  }
};
