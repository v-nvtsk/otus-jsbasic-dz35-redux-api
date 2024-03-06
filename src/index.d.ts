export abstract class StoreBase<State, Action> {
  protected abstract dispatch(action: Action): void;
  protected abstract setState(newState: State): void;
  protected abstract getState(): State | undefined;
  protected abstract replaceReducer(newReducer: Reducer<State, Action>): void;
  protected abstract subscribe(listener: Function): Function;
  protected abstract unsubscribe(listener: Function): void;
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
