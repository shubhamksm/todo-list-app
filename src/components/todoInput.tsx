import React, { useState } from "react";

type TodoListProps = {
  onSuccess: (value: string) => void;
  onCancel: () => void;
  defautValue?: string;
  id?: string;
};

const TodoInput = ({
  onSuccess,
  onCancel,
  defautValue = "",
  id = "default-input"
}: TodoListProps) => {
  const [value, setValue] = useState(defautValue);

  const handleClick = () => {
    if (value.trim()) {
      onSuccess(value);
    }
  };

  return (
    <li>
      <input
        type="text"
        className="addTodo"
        value={value}
        data-testid={id}
        required
        onChange={(e) => setValue(e.target.value)}
      />
      <div>
        <button data-testid="btn-enter" onClick={handleClick}>
          <i className="fa-solid fa-check fa-lg"></i>
        </button>
        <button data-testid="btn-cancel" onClick={onCancel} className="--red">
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
      </div>
    </li>
  );
};

export default TodoInput;
