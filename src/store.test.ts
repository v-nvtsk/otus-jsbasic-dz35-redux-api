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

// describe("configureStore", () => {
//   describe("public interface", () => {
//     it("is a function", () => {
//       expect(configureStore).toBeInstanceOf(Function);
//     });
//     it("generates store with reducer", () => {
//       const state = 2;
//       const store = configureStore(() => state);
//       expect(store.getState).toBeInstanceOf(Function);

//       expect(store.dispatch).toBeInstanceOf(Function);

//       expect(store.subscribe).toBeInstanceOf(Function);
//       expect(store.subscribe(jest.fn())).toBeInstanceOf(Function);
//     });
//   });

//   describe("functional interface", () => {
//     it("returns state based on initial state", () => {
//       const state = { name: "Bob" };
//       expect(configureStore(() => null).getState()).toBe(undefined);
//       expect(configureStore(() => null, state).getState()).toBe(state);
//     });

//     it("calculates new state with reducer call", () => {
//       const action1 = { type: "xxx" };
//       const action2 = { type: "yyyy" };
//       const reducer = jest.fn((state = 1) => state + 1);
//       const store = configureStore(reducer);
//       store.dispatch(action1);
//       expect(reducer).toHaveBeenCalledWith(undefined, action1);
//       expect(store.getState()).toBe(2);
//       store.dispatch(action2);
//       expect(reducer).toHaveBeenCalledWith(2, action2);
//       expect(store.getState()).toBe(3);
//     });

//     it("notifies listeners about updates", () => {
//       const action1 = { type: "xxx" };
//       const action2 = { type: "yyyy" };
//       const reducer = jest.fn((state = 1) => state + 1);
//       const store = configureStore(reducer);
//       const spy = jest.fn();
//       store.subscribe(spy);
//       expect(spy).not.toHaveBeenCalled();
//       store.dispatch(action1);
//       expect(spy).toHaveBeenCalled();
//       store.dispatch(action2);
//       expect(spy).toHaveBeenCalledTimes(2);
//     });

//     it("allows to unsubscribe from the events", () => {
//       const action1 = { type: "xxx" };
//       const action2 = { type: "yyyy" };
//       const reducer = jest.fn((state = 1) => state + 1);
//       const store = configureStore(reducer);
//       const spy = jest.fn();
//       const unsubscribe = store.subscribe(spy);
//       expect(spy).not.toHaveBeenCalled();
//       store.dispatch(action1);
//       expect(spy).toHaveBeenCalled();
//       unsubscribe();
//       store.dispatch(action2);
//       expect(spy).toHaveBeenCalledTimes(1);
//     });
//   });

// describe("createStore", () => {
//   it("should be a function", () => {
//     expect(createStore).toBeInstanceOf(Function);
//   });
//   it("should create a store", () => {
//     expect(createStore(() => {})).toBeInstanceOf(Store);
//   });
//   it("should call a middleware on dispatch", () => {
//     const middleware = jest.fn();
//     const store = createStore(() => {}, undefined, [middleware]);
//     store.dispatch({ type: "any" });
//     expect(middleware).toHaveBeenCalledWith(store);
//   });
// });

// describe("combineReducers", () => {
//   it("is a function", () => {
//     expect(combineReducers).toBeInstanceOf(Function);
//   });

//   it("returns a function", () => {
//     expect(combineReducers({})).toBeInstanceOf(Function);
//   });

//   it("returns a reducer based on the config (initial state)", () => {
//     const reducer = combineReducers({
//       a: (state = 2) => state,
//       b: (state = "hop") => state,
//     });
//     expect(reducer(undefined, { type: "unknown" })).toEqual({
//       a: 2,
//       b: "hop",
//     });
//   });

//   it("calls subreducers with proper values", () => {
//     type State = { a: number; b: number };
//     const config = {
//       a: jest.fn((state: number = 5, action) => state + action.payload),
//       b: jest.fn((state: number = 6, action) => state - action.payload),
//     };
//     const reducer = combineReducers(config);

//     const state: State = {
//       a: 55,
//       b: 66,
//     };
//     const action1 = { type: "any", payload: 1 };
//     const newState1 = reducer(state, action1);

//     expect(config.a).toHaveBeenCalledWith(55, action1);
//     expect(config.b).toHaveBeenCalledWith(66, action1);

//     expect(newState1).toEqual({
//       a: 56,
//       b: 65,
//     });

//     const action2 = { type: "any", payload: 2 };
//     const newState2 = reducer(newState1, action2);
//     expect(config.a).toHaveBeenCalledWith(56, action2);
//     expect(config.b).toHaveBeenCalledWith(65, action2);
//     expect(newState2).toEqual({
//       a: 58,
//       b: 63,
//     });
//   });
// });
// });
