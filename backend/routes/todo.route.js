import express from 'express';
import { createTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo } from '../controllers/todo.controller.js'
import { isAuth } from '../middlewares/auth.middleware.js';

const todoRouter =  express.Router()

todoRouter.post("/add", isAuth, createTodo)
todoRouter.get("/all", isAuth, getAllTodo)
todoRouter.get("/:id", isAuth, getSingleTodo)
todoRouter.delete("/:id", isAuth, deleteTodo)
todoRouter.patch("/:id", isAuth, updateTodo)


export default todoRouter