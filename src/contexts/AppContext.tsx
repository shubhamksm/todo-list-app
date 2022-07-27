import React, { useMemo, useReducer } from "react";
import { TodoItemInterface } from "../types";

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType
);

export type AppContextType = AppStateInterface & { dispatch: Dispatch };
export type Dispatch = (action: ActionInterface) => void;

export const initialState = {
  todoList: [
    { text: "Buy milk", done: true, id: "buyMilk" },
    { text: "Buy bread", done: false, id: "buyBread" },
    { text: "Buy Tea", done: false, id: "buyTea" }
  ]
};

interface AppStateInterface {
  todoList: TodoItemInterface[];
}

export enum ACTION_TYPES {
  TODO_ITEM_CREATE = "TODO_ITEM_CREATE",
  TODO_ITEM_EDIT = "TODO_ITEM_EDIT",
  TODO_ITEM_DELETE = "TODO_ITEM_DELETE",
  TODO_ITEM_UPDATE = "TODO_ITEM_UPDATE"
}

type ActionInterface = {
  payload?: any;
  type: ACTION_TYPES;
};

const reducer = (state: AppStateInterface, action: ActionInterface) => {
  switch (action.type) {
    case ACTION_TYPES.TODO_ITEM_CREATE: {
      // Create Action logic will come here
      return { ...state };
    }
    case ACTION_TYPES.TODO_ITEM_EDIT: {
      // Edit Action logic will come here
      return { ...state };
    }
    case ACTION_TYPES.TODO_ITEM_DELETE: {
      // Delete Action logic will come here
      return { ...state };
    }
    case ACTION_TYPES.TODO_ITEM_UPDATE: {
      // Update Action logic will come here
      return { ...state };
    }
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
