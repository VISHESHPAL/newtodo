import { createContext, useContext, useState } from "react";
import api from "../api";
import { toast } from "react-toastify";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get("/todo/all");

      setTodos(res.data.allTodo || res.data.todos || []);
    } catch (error) {
      toast.error("Failed to fetch todos ❌");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const res = await api.post("/todo/add", { title });

      toast.success("Todo added ✅");

      if (res.data.todo) {
        setTodos((prev) => [res.data.todo, ...prev]);
      } else {
        await fetchTodos();
      }
    } catch (error) {
      toast.error("Failed to add todo ❌");
    }
  };

  const updateTodo = async (id, data) => {
    try {
      const res = await api.patch(`/todo/${id}`, data);

      const updatedTodo = res.data.updatedTodo;

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? updatedTodo : todo
        )
      );

      toast.success("Todo updated ✨");
    } catch (error) {
      toast.error("Failed to update todo ❌");
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await api.patch(`/todo/${id}`, {
        completed: !completed,
      });

      const updatedTodo = res.data.updatedTodo;

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? updatedTodo : todo
        )
      );

      toast.success(
        completed ? "Marked incomplete 🔄" : "Marked complete ✅"
      );
    } catch (error) {
      toast.error("Failed to change status ❌");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/${id}`);

      setTodos((prev) =>
        prev.filter((todo) => todo._id !== id)
      );

      toast.success("Todo deleted 🗑️");
    } catch (error) {
      toast.error("Failed to delete todo ❌");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        fetchTodos,
        todos,
        loading,
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
