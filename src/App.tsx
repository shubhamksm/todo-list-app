import React, { useContext } from "react";
import { TodoList } from "./components/todoList";
import { AppContext } from "./contexts/AppContext";

import "./styles.scss";

export default function App() {
  const { todoList } = useContext(AppContext);

  return (
    <div className="todoListApp" data-testid="main-app">
      <div className="forsta-logo" />
      <TodoList todos={todoList} />
    </div>
  );
}
