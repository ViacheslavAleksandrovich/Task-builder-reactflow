import { configureStore, combineReducers } from "@reduxjs/toolkit";
import flowReducer from "./flowSlice";
import { loadState, saveState } from "./localStorageUtils";

const rootReducer = combineReducers({
  flow: flowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type AppDispatch = typeof store.dispatch;

export default store;
