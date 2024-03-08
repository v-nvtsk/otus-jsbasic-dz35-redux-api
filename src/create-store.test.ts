import { createStore } from "./create-store";
import Store from "./store";

describe("createStore", () => {
  it("should be a function", () => {
    expect(createStore).toBeInstanceOf(Function);
  });
  it("should create a store", () => {
    expect(createStore(() => {})).toBeInstanceOf(Store);
  });
  it("should call a middleware on dispatch", () => {
    const middleware = jest.fn();
    const store = createStore(() => {}, undefined, [middleware]);
    store.dispatch({ type: "any" });
    expect(middleware).toHaveBeenCalledWith(store);
  });
});
