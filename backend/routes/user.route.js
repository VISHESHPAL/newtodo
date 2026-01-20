import express from 'express'
import { isauth, login, logout, register } from '../controllers/user.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const userRouter =  express.Router();


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout", isAuth, logout)
userRouter.get("/is-auth",isAuth , isauth)


export default userRouter