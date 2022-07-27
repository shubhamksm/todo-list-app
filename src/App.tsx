import React, { useState } from "react";
import { TodoList } from "./components/todoList";

import "./styles.scss";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "Buy milk", done: true, id: "buyMilk" },
    { text: "Buy bread", done: false, id: "buyBread" }
  ]);

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <TodoList todos={todos} />
    </div>
  );
}
