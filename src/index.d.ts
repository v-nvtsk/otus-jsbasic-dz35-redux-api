export abstract class StoreBase<State, Action> {
  abstract dispatch(action: Action): void;
  abstract setState(newState: State): void;
  abstract getState(): State | undefined;
  abstract replaceReducer(newReducer: Reducer<State, Action>): void;
  abstract subscribe(listener: Function): Function;
  abstract unsubscribe(listener: Function): void;
  protected abstract triggerListeners(): void;
  protected abstract middlewares: Middleware<State, Action>[];

  protected abstract reducer: Reducer<State, Action>;

  protected abstract state: State | undefined;

  protected abstract listeners: Set<Function>;
}

declare type Reducer<State, Action> = (state: State | undefined, action: Action) => State;

declare type Middleware<State, Action> = (
  store: StoreBase<State, Action>,
) => (next: (action: Action) => any) => (action: Action) => any;

declare type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
) => StoreBase<State, Action>;

declare type CombineReducer<ReducersConfig = any, Action = { type: any }> = (config: {
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
