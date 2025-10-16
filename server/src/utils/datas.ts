export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const users: User[] = [];
export const todos: Todo[] = [];

let userIdCounter = 1;
let todoIdCounter = 1;

export const generateUserId = () => userIdCounter++;
export const generateTodoId = () => todoIdCounter++;
