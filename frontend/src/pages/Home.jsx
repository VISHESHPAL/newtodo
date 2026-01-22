import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTodo } from "../context/TodoContext";

const Home = () => {
  const { logout, user } = useAuth();
  const { fetchTodos, todos, deleteTodo, toggleTodo, addTodo, updateTodo } =
    useTodo();

  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) return;

    await updateTodo(editId, { title: editTitle });

    setEditId(null);
    setEditTitle("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-3 py-6 sm:p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            👋 Hello, {user?.name}
          </h2>
          <button
            onClick={logout}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!title.trim()) return;
            addTodo(title);
            setTitle("");
          }}
          className="flex flex-col sm:flex-row gap-2 mb-6"
        >
          <input
            type="text"
            placeholder="Add a new todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2  rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo._id, todo.completed)}
                />

                {editId === todo._id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 px-2 py-1 rounded border"
                  />
                ) : (
                  <span
                    className={`flex-1 break-words ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              <div className="flex gap-3 justify-end">
                {editId === todo._id ? (
                  <button
                    onClick={saveEdit}
                    className="text-green-600 font-semibold"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
