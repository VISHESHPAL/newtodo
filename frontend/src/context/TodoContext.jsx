import { createContext, useContext, useState } from "react";
import api from "../api";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    const res = await api.get("/todo/all");
    setTodos(res.data);
    setLoading(false);
  };

  const addTodo = async (title) => {
    const res = await api.post("/todo/add", { title });
    setTodos((prev) => [res.data, ...prev]);
  };

  const toggleTodo = async (todo) => {
    const res = await api.patch(`/todo/${todo._id}`, {
      completed: !todo.completed,
    });

    setTodos((prev) => prev.map((t) => (t._id === todo._id ? res.data : t)));
  };

  const deleteTodo = async (todo) =>{

    await api.delete(`/todo/${todo._id}`);
    setTodos((prev) => prev.filter((t) => t._id !== todo._id))

  }

  return(
    <TodoContext.Provider value={{ fetchTodos , todos , loading , deleteTodo , toggleTodo , addTodo}}>
        {children}
    </TodoContext.Provider>
  )
};

export const useTodo = () => useContext(TodoContext)
