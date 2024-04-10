/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/default-param-last */
// import Store, { combineReducers, configureStore, createStore } from "./store";

import Store from "./store";

describe("Store", () => {
  it("should be an instance of Store", () => {
    const store = new Store(jest.fn, undefined);
    expect(store).toBeInstanceOf(Store);
  });

  describe("should support replaceReducer", () => {
    it("should be a function", () => {
      const store = new Store(jest.fn, undefined);
      expect(store.replaceReducer).toBeInstanceOf(Function);
    });

    it("should replace reducer", () => {
      const reducer1 = jest.fn(() => 1);
      const reducer2 = jest.fn(() => 2);
      const store = new Store(reducer1, undefined);
      store.dispatch({ type: "any" });
      expect(store.getState()).toBe(1);
      store.replaceReducer(reducer2);
      store.dispatch({ type: "any" });
      expect(store.getState()).toBe(2);
    });
  });
});
