import { FC, ReactNode, createContext, useContext, useState } from "react";

interface LoadingSpinnerContextProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface LoadingSpinnerContextProviderProps {
  children: ReactNode;
}

const initialState: LoadingSpinnerContextProps = {
  isLoading: false,
  setIsLoading: (isLoading: boolean) => {},
};

const LoadingSpinnerContext =
  createContext<LoadingSpinnerContextProps>(initialState);

const LoadingSpinnerProvider: FC<LoadingSpinnerContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingSpinnerContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingSpinnerContext.Provider>
  );
};

const useLoadingSpinner = () => {
  const context = useContext(LoadingSpinnerContext);

  if (context === undefined) {
    throw new Error(
      "useLoadingSpinner must be used within a LoadingSpinnerProvider"
    );
  }

  return context;
};

export { LoadingSpinnerProvider, useLoadingSpinner };
