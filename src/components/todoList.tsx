import React from "react";
import { TodoItemInterface } from "../types";
import TodoItem from "./todoItem";

type TodoListProps = {
  todos: TodoItemInterface[];
};
export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="todoList">
      {todos.map((item) => (
        <TodoItem todo={item} />
      ))}
    </ul>
  );
};
