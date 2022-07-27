import React, { useContext, useState } from "react";
import { ACTION_TYPES, AppContext } from "../contexts/AppContext";
import { TodoItemInterface } from "../types";
import TodoInput from "./todoInput";
import TodoItem from "./todoItem";

type TodoListProps = {
  todos: TodoItemInterface[];
};
export const TodoList = ({ todos }: TodoListProps) => {
  const { editMode, dispatch } = useContext(AppContext);
  const [showInput, toggleShowInput] = useState(false);

  const handleClick = () => {
    toggleShowInput(true);
    dispatch({
      payload: { editMode: true },
      type: ACTION_TYPES.TOGGLE_EDIT_MODE
    });
  };

  const handleCancel = () => {
    toggleShowInput(false);
    dispatch({
      payload: { editMode: false },
      type: ACTION_TYPES.TOGGLE_EDIT_MODE
    });
  };

  const handleSuccess = (value: string) => {
    toggleShowInput(false);
    dispatch({
      payload: { text: value },
      type: ACTION_TYPES.TODO_ITEM_CREATE
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        data-testid="add-new-task"
        disabled={editMode}
      >
        Add New Task
      </button>
      <ul className="todoList">
        {showInput && (
          <TodoInput onSuccess={handleSuccess} onCancel={handleCancel} />
        )}
        {todos.map((item) => (
          <TodoItem todo={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};
