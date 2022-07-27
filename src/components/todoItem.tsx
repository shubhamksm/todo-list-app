import React, { useContext } from "react";
import { TodoItemInterface } from "../types";
import { AppContext, ACTION_TYPES } from "../contexts/AppContext";

type TodoItemProps = {
  todo: TodoItemInterface;
};

const TodoItem = ({ todo: { id, text, done } }: TodoItemProps) => {
  const { dispatch } = useContext(AppContext);
  return (
    <li>
      <div>
        <input
          type="checkbox"
          name={text}
          data-testid={text}
          checked={done}
          onChange={() =>
            dispatch({ payload: { id }, type: ACTION_TYPES.TODO_ITEM_UPDATE })
          }
          id={`todo${id}`}
        />
        <label htmlFor={`todo${id}`} className={`${done && "--checked"}`}>
          {text}
        </label>
      </div>
      <div>
        <button>Edit</button>
        <button
          className="--red"
          data-testid={`btn-delete-${text}`}
          onClick={() =>
            dispatch({ payload: { id }, type: ACTION_TYPES.TODO_ITEM_DELETE })
          }
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
