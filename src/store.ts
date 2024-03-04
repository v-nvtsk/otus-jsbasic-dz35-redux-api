export type Reducer<State, Action> = (state: State | undefined, action: Action) => State;

export type Middleware<State, Action> = (
  store: Store<State, Action>,
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
) => Store<State, Action>;

type CombineReducer<ReducersConfig = any, Action = { type: any }> = (config: {
  [key in keyof ReducersConfig]: (state: ReducersConfig[key] | undefined, action: Action) => ReducersConfig[key];
}) => (
  state:
    | {
        [key in keyof ReducersConfig]: ReducersConfig[key];
      }
    | undefined,
  action: Action,
) => {
  [key in keyof ReducersConfig]: ReducersConfig[key];
};

export default class Store<State, Action> {
  private listeners: Set<Function> = new Set();

  constructor(
    protected reducer: Reducer<State, Action>,
    protected state: State | undefined,
    protected middlewares: Middleware<State, Action>[] = [],
  ) {}

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => {
      this.unsubscribe(listener);
    };
  }

  triggerListeners() {
    this.listeners.forEach((listener) => listener());
  }

  unsubscribe(listener: Function) {
    this.listeners.delete(listener);
  }

  replaceReducer(newReducer: Reducer<State, Action>) {
    this.reducer = newReducer;
  }

  /**
   * Get the current state.
   *
   * @return {Object} a copy of the current state
   */
  getState(): State | undefined {
    return this.state;
  }

  /**
   * setState function updates the state by merging the patch object with the current state object.
   *
   * @param {Object} patch - an object containing the properties to be updated in the state
   * @return {void}
   */
  setState(newState: State) {
    this.state = newState;
    this.triggerListeners();
  }

  dispatch(action: Action) {
    this.middlewares.forEach((middleware) => middleware(this));
    this.setState(this.reducer(this.state, action));
  }
}

export function createStore<State, Action>(
  reducer: Reducer<State, Action>,
  preloadedState?: State,
  middlewares?: Middleware<State, Action>[],
): Store<State, Action> {
  return new Store(reducer, preloadedState, middlewares);
}

export function configureStore<State, Action>(
  reducer: Reducer<State, Action>,
  initialState?: State,
  middlewares?: Middleware<State, Action>[],
): Store<State, Action> {
  const Middlewares = middlewares || [];
  return new Store(reducer, initialState, Middlewares);
}

export function combineReducers(config: {}): ReturnType<CombineReducer> {
  return (state, action) => {
    const result = Object.entries(config).reduce((acc, [key, reducer]) => {
      const curr = state ? (reducer as Function)(state[key], action) : (reducer as Function)();
      return { ...acc, [key]: curr };
    }, {});
    return result;
  };
}
