import App from "../App";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { AppContextProvider } from "../contexts/AppContext";
import { act } from "react-dom/test-utils";

describe("TodoApp", () => {
  beforeEach(() => {
    render(
      <AppContextProvider
        initialState={{
          todoList: [
            { text: "Buy milk", done: true, id: "buyMilk" },
            { text: "Buy bread", done: false, id: "buyBread" },
            { text: "Buy Tea", done: false, id: "buyTea" }
          ]
        }}
      >
        <App />
      </AppContextProvider>
    );
  });
  afterEach(() => {
    cleanup();
  });

  it("renders app", () => {
    expect(screen.getByTestId("main-app")).toBeTruthy();
  });

  it("renders initial items", () => {
    expect(screen.getByText("Buy milk")).toBeDefined();
    const buyMilkTodo = screen.getByTestId("Buy milk");
    expect(buyMilkTodo).toBeChecked();

    const buyBreadTodo = screen.getByTestId("Buy bread");
    expect(buyBreadTodo).not.toBeChecked();
  });

  it("Updates Item - Check / UnCheck", async () => {
    const buyMilkTodo = screen.getByTestId("Buy milk");
    expect(buyMilkTodo).toBeChecked();
    act(() => {
      fireEvent.click(buyMilkTodo);
    });
    await waitFor(() => expect(buyMilkTodo).not.toBeChecked());
  });

  it("Deletes Item - Item should be removed from list", async () => {
    const buyMilkTodo = screen.getByTestId("Buy milk");
    const deleteButton = screen.getByTestId("btn-delete-Buy milk");
    expect(buyMilkTodo).toBeChecked();
    act(() => {
      fireEvent.click(deleteButton);
    });
    await waitFor(() => expect(buyMilkTodo).not.toBeInTheDocument());
  });

  it.only("Insert Item - Item should be inserted on top of the list", async () => {
    const addNewTask = screen.getByTestId("add-new-task");
    expect(() => screen.getByTestId("New Todo")).toThrow();
    act(() => {
      fireEvent.click(addNewTask);
    });
    const inputElement = screen.getByTestId("default-input");
    const enterButton = screen.getByTestId("btn-enter");
    await waitFor(() => {
      expect(inputElement).toBeInTheDocument();
      expect(enterButton).toBeInTheDocument();
    });
    act(() => {
      fireEvent.change(inputElement, { target: { value: "New Todo" } });
    });
    act(() => {
      fireEvent.click(enterButton);
    });
    await waitFor(() =>
      expect(screen.getByTestId("New Todo")).toBeInTheDocument()
    );
  });
});
