import { createContext } from "react";

export const LoadingSpinnerContext = createContext({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
});
