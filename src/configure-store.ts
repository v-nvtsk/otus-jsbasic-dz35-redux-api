import { createStore } from "./create-store";
import { Middleware, Reducer } from "./index.d";
import Store from "./store";

export function configureStore<State, Action>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  ...middlewares: Middleware<State, Action>[]
): Store<State, Action> {
  return createStore(reducer, initialState, [...middlewares]);
}
