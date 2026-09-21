import type { AppStore } from './makeStore';

declare global {
  type RootState = ReturnType<AppStore['getState']>;
  type AppDispatch = AppStore['dispatch'];
}

export {};
