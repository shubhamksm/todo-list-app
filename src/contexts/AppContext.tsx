import React, { useMemo, useReducer } from "react";
import { TodoItemInterface } from "../types";
import { camalize } from "../utils";

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
  ],
  editMode: false
};

interface AppStateInterface {
  todoList: TodoItemInterface[];
  editMode: boolean;
}

export enum ACTION_TYPES {
  TODO_ITEM_CREATE = "TODO_ITEM_CREATE",
  TODO_ITEM_EDIT = "TODO_ITEM_EDIT",
  TODO_ITEM_DELETE = "TODO_ITEM_DELETE",
  TODO_ITEM_UPDATE = "TODO_ITEM_UPDATE",
  TOGGLE_EDIT_MODE = "TOGGLE_EDIT_MODE"
}

type ActionInterface = {
  payload?: any;
  type: ACTION_TYPES;
};

const reducer = (state: AppStateInterface, action: ActionInterface) => {
  switch (action.type) {
    case ACTION_TYPES.TODO_ITEM_CREATE: {
      const id = camalize(action.payload.text);
      if (state.todoList.find((item) => item.id === id) !== undefined) {
        return { ...state };
      }
      const newTodoItem = {
        id,
        text: action.payload.text,
        done: false
      };
      return {
        ...state,
        todoList: [newTodoItem, ...state.todoList],
        editMode: false
      };
    }
    case ACTION_TYPES.TODO_ITEM_EDIT: {
      const currentElementIndex = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedTodoList = [...state.todoList];
      updatedTodoList[currentElementIndex] = {
        ...updatedTodoList[currentElementIndex],
        text: action.payload.text
      };
      return { ...state, todoList: updatedTodoList, editMode: false };
    }
    case ACTION_TYPES.TODO_ITEM_DELETE: {
      const updatedTodoList = state.todoList.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, todoList: updatedTodoList };
    }
    case ACTION_TYPES.TODO_ITEM_UPDATE: {
      const currentElementIndex = state.todoList.findIndex(
        (item) => item.id === action.payload.id
      );
      const updatedTodoList = [...state.todoList];
      updatedTodoList[currentElementIndex] = {
        ...updatedTodoList[currentElementIndex],
        done: !updatedTodoList[currentElementIndex].done
      };
      return { ...state, todoList: updatedTodoList };
    }
    case ACTION_TYPES.TOGGLE_EDIT_MODE: {
      return {
        ...state,
        editMode: action.payload.editMode
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(
    reducer,
    props.intialState ?? initialState
  );
  const value = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
