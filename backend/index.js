import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("API IS RUNNING ");
});

app.listen(PORT, () => {
  console.log(`Server is Running in the PORT ${PORT}`);
});

connectDB();
