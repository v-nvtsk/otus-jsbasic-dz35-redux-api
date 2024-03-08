import { CombineReducer } from "./index.d";

export function combineReducers(config: {}): ReturnType<CombineReducer> {
  return (state, action) =>
    Object.entries(config).reduce((acc, [key, reducer]) => {
      const curr = state ? (reducer as Function)(state[key], action) : (reducer as Function)();
      return { ...acc, [key]: curr };
    }, {});
}
