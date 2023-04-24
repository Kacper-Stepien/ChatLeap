import { useState } from "react";

type ValidityFunction = (value: string) => boolean;

const useInput = (validate: ValidityFunction) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validate(value);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue("");
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    isTouched,
    valueChangeHandler,
    inputBlurHandler,
    setIsTouched,
  };
};

export default useInput;
