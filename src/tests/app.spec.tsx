import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { AppContextProvider } from "../contexts/AppContext";

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    );
    expect(app).not.toBeUndefined();
  });
  //
  it("renders initial items", () => {
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

    expect(screen.getByText("Buy milk")).toBeDefined();
    const buyMilkTodo = screen.getByTestId("Buy milk");
    expect(buyMilkTodo).toBeChecked();

    //TODO: Verify second todo
    const buyBreadTodo = screen.getByTestId("Buy bread");
    expect(buyBreadTodo).not.toBeChecked();
  });
});
