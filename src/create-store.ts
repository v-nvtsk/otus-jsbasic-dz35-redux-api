import { Middleware, Reducer } from "./index.d";
import Store from "./store";

export function createStore<State, Action>(
  reducer: Reducer<State, Action>,
  preloadedState?: State,
  middlewares?: Middleware<State, Action>[],
): Store<State, Action> {
  return new Store(reducer, preloadedState, middlewares);
}
