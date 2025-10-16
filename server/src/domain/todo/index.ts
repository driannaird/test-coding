import { Router } from "express";
import { todos, generateTodoId, type Todo } from "../../utils/datas";

const todoRouter = Router();

todoRouter.get("/", async (req, res) => {
  try {
    const userId = (req as any).user.id;

    const userTodos = todos.filter((todo) => todo.userId === userId);

    res.status(200).json({
      status: true,
      message: "Todos retrieved successfully",
      data: userTodos,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error retrieving todos",
    });
  }
});

todoRouter.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    const userId = (req as any).user.id;

    if (!text) {
      return res.status(400).json({
        status: false,
        message: "Text is required",
      });
    }

    const newTodo: Todo = {
      id: generateTodoId(),
      title: text,
      description: "",
      completed: false,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.push(newTodo);

    res.status(201).json({
      status: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating todo",
    });
  }
});

todoRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const userId = (req as any).user.id;

    const todo = todos.find(
      (todo) => todo.id === parseInt(id) && todo.userId === userId
    );

    if (!todo) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    if (text !== undefined) {
      todo.title = text;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    todo.updatedAt = new Date();

    res.status(200).json({
      status: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating todo",
    });
  }
});

todoRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const todoIndex = todos.findIndex(
      (todo) => todo.id === parseInt(id) && todo.userId === userId
    );

    if (todoIndex === -1) {
      return res.status(404).json({
        status: false,
        message: "Todo not found",
      });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    res.status(200).json({
      status: true,
      message: "Todo deleted successfully",
      data: deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting todo",
    });
  }
});

export default todoRouter;
