import { RootState } from "./store";

export const loadState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem("flowState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state:", err);
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("flowState", serializedState);
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
