import { Middleware, Reducer, StoreBase } from "./index.d";

export default class Store<State, Action> extends StoreBase<State, Action> {
  protected listeners: Set<Function> = new Set();

  constructor(
    protected reducer: Reducer<State, Action>,
    protected state: State | undefined,
    protected middlewares: Middleware<State, Action>[] = [],
  ) {
    super();
  }

  subscribe(listener: Function) {
    this.listeners.add(listener);
    return () => {
      this.unsubscribe(listener);
    };
  }

  protected triggerListeners() {
    this.listeners.forEach((listener) => listener());
  }

  unsubscribe(listener: Function) {
    this.listeners.delete(listener);
  }

  replaceReducer(newReducer: Reducer<State, Action>) {
    this.reducer = newReducer;
  }

  getState(): State | undefined {
    return this.state;
  }

  setState(newState: State) {
    this.state = newState;
    this.triggerListeners();
  }

  dispatch(action: Action) {
    this.middlewares.forEach((middleware) => middleware(this));
    this.setState(this.reducer(this.state, action));
  }
}
