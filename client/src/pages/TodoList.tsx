import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

type FilterType = "all" | "completed" | "not-completed";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [navigate]);

  useEffect(() => {
    filterTodos();
  }, [todos, filter]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/todos");
      if (response.data.status) {
        setTodos(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const filterTodos = () => {
    let filtered = [...todos];
    if (filter === "completed") {
      filtered = todos.filter((todo) => todo.completed);
    } else if (filter === "not-completed") {
      filtered = todos.filter((todo) => !todo.completed);
    }
    setFilteredTodos(filtered);
  };

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const response = await api.post("/todos", { text: newTodoText });
      if (response.data.status) {
        setTodos([...todos, response.data.data]);
        setNewTodoText("");
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add todo");
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const response = await api.put(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      if (response.data.status) {
        setTodos(
          todos.map((t) =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update todo");
    }
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async (id: number) => {
    if (!editText.trim()) return;

    try {
      const response = await api.put(`/todos/${id}`, { text: editText });
      if (response.data.status) {
        setTodos(
          todos.map((t) => (t.id === id ? { ...t, title: editText } : t))
        );
        setEditingId(null);
        setEditText("");
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      const response = await api.delete(`/todos/${id}`);
      if (response.data.status) {
        setTodos(todos.filter((t) => t.id !== id));
        setError("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete todo");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white border-4 border-black shadow-2xl mb-8">
          <div className="bg-black text-white px-6 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-widest mb-1">
                  My Tasks
                </h1>
                {user && (
                  <p className="text-gray-300 text-sm font-medium">
                    👋 Welcome back,{" "}
                    <span className="font-bold">{user.name}</span>
                  </p>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border-2 border-white transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 divide-x-2 divide-gray-200 bg-gray-50">
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-black text-black">
                {todos.length}
              </div>
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Total
              </div>
            </div>
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-black text-green-600">
                {todos.filter((t) => t.completed).length}
              </div>
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Completed
              </div>
            </div>
            <div className="px-6 py-4 text-center">
              <div className="text-2xl font-black text-orange-600">
                {todos.filter((t) => !t.completed).length}
              </div>
              <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                Pending
              </div>
            </div>
          </div>
        </div>

        {/* Add Todo Section */}
        <div className="bg-white border-4 border-black shadow-2xl mb-8">
          <div className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-3">
            <h2 className="text-sm font-bold uppercase tracking-widest">
              ✨ Add New Task
            </h2>
          </div>
          <form onSubmit={handleAddTodo} className="p-6">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-black focus:ring-2 focus:ring-black transition-all text-gray-900 placeholder-gray-400 font-medium"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition-all border-2 border-black whitespace-nowrap shadow-lg transform hover:scale-105 active:scale-95"
              >
                + Add Task
              </button>
            </div>
          </form>
        </div>

        {/* Filter Section */}
        <div className="bg-white border-4 border-black shadow-lg mb-8 p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label
              htmlFor="filter"
              className="text-sm font-bold text-gray-700 uppercase tracking-widest flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter Tasks
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-300 focus:outline-none focus:border-black focus:ring-2 focus:ring-black bg-white font-bold text-sm uppercase tracking-wide cursor-pointer hover:bg-gray-50 transition-all"
            >
              <option value="all">📋 All Tasks</option>
              <option value="completed">✅ Completed</option>
              <option value="not-completed">⏳ Pending</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8 shadow-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white border-4 border-black shadow-2xl p-16 text-center">
            <div className="flex flex-col items-center justify-center">
              <svg
                className="animate-spin h-12 w-12 text-black mb-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p className="text-lg font-bold text-black uppercase tracking-wider">
                Loading Tasks...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTodos.length === 0 ? (
              <div className="bg-white border-4 border-dashed border-gray-300 p-16 text-center">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-xl font-bold text-gray-400 uppercase tracking-wide mb-2">
                  No Tasks Found
                </p>
                <p className="text-sm text-gray-500">
                  {filter === "all"
                    ? "Add your first task to get started!"
                    : `No ${
                        filter === "completed" ? "completed" : "pending"
                      } tasks yet.`}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-white border-4 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${
                    todo.completed
                      ? "border-green-500 bg-green-50"
                      : "border-black"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <div className="flex-shrink-0 pt-1">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleComplete(todo)}
                          className="w-6 h-6 border-2 border-black cursor-pointer accent-black"
                        />
                      </div>

                      {/* Content */}
                      {editingId === todo.id ? (
                        <div className="flex-1 space-y-3">
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-gray-900 font-medium"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(todo.id)}
                              className="flex-1 bg-green-600 text-white px-4 py-2 font-bold uppercase text-sm tracking-wider hover:bg-green-700 transition-colors border-2 border-green-600"
                            >
                              ✓ Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex-1 bg-gray-600 text-white px-4 py-2 font-bold uppercase text-sm tracking-wider hover:bg-gray-700 transition-colors border-2 border-gray-600"
                            >
                              ✕ Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <p
                              className={`text-lg font-semibold ${
                                todo.completed
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {todo.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 font-mono">
                              Created:{" "}
                              {new Date(todo.createdAt).toLocaleDateString()} at{" "}
                              {new Date(todo.createdAt).toLocaleTimeString()}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex-shrink-0 flex gap-2">
                            <button
                              onClick={() => handleStartEdit(todo)}
                              className="bg-blue-600 text-white px-4 py-2 font-bold uppercase text-xs tracking-wider hover:bg-blue-700 transition-all border-2 border-blue-600 transform hover:scale-105"
                              title="Edit"
                            >
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="bg-red-600 text-white px-4 py-2 font-bold uppercase text-xs tracking-wider hover:bg-red-700 transition-all border-2 border-red-600 transform hover:scale-105"
                              title="Delete"
                            >
                              ✕ Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
