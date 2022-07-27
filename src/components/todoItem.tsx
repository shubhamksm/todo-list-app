import React, { useContext, useState } from "react";
import { TodoItemInterface } from "../types";
import { AppContext, ACTION_TYPES } from "../contexts/AppContext";
import TodoInput from "./todoInput";

type TodoItemProps = {
  todo: TodoItemInterface;
};

const TodoItem = ({ todo: { id, text, done } }: TodoItemProps) => {
  const { dispatch, editMode } = useContext(AppContext);
  const [showinput, toggleShowInput] = useState(false);

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
      payload: { text: value, id },
      type: ACTION_TYPES.TODO_ITEM_EDIT
    });
  };

  return showinput ? (
    <TodoInput
      onSuccess={handleSuccess}
      onCancel={handleCancel}
      defautValue={text}
    />
  ) : (
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
        <button onClick={handleClick} disabled={editMode}>
          Edit
        </button>
        <button
          className="--red"
          data-testid={`btn-delete-${text}`}
          onClick={() =>
            dispatch({ payload: { id }, type: ACTION_TYPES.TODO_ITEM_DELETE })
          }
          disabled={editMode}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
