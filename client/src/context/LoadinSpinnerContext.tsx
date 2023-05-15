import { createContext, useState } from "react";
import LoadingSPpinner from "../components/LoadingSpinner";

export const LoadingSpinnerContext = createContext({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
});
