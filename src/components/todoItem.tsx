import React from "react";
import { TodoItemInterface } from "../types";

type TodoItemProps = {
  todo: TodoItemInterface;
};

const TodoItem = ({ todo: { id, text, done } }: TodoItemProps) => {
  return (
    <li key={id}>
      <div>
        <input
          type="checkbox"
          name={text}
          data-testid={text}
          checked={done}
          id={`todo${id}`}
        />
        <label htmlFor={`todo${id}`} className={`${done && "--checked"}`}>
          {text}
        </label>
      </div>
      <div>
        <button>Edit</button>
        <button className="--red">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
