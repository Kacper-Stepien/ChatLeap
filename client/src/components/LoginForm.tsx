import { Link, Navigate } from "react-router-dom";

import { FC } from "react";
import { ModalType } from "../hooks/use-modal";
import Validator from "../utils/Validator";
import classes from "./Form.module.scss";
import logIn from "../utils/Login";
import { useAuth } from "../context/AuthContext";
import useInput from "../hooks/use-input";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

type Props = {
  openModal: (title: string, content: string, type: ModalType) => void;
  closeModal: () => void;
};

const LoginForm: FC<Props> = (props) => {
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.form];

  const { setLoggedInUser } = useAuth();
  const [redirectToHome, setRedirectToHome] = useState(false);

  const { setIsLoading } = useLoadingSpinner();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      setEmailIsTouched(true);
      setPasswordIsTouched(true);
      return;
    }
    try {
      setIsLoading(true);
      const result = await logIn(enteredEmail, enteredPassword);
      if (result.status === "fail") {
        props.openModal("Error", result.message, ModalType.ERROR);
      } else if (result.status === "success") {
        setLoggedInUser(
          {
            id: result.data._id,
            userName: result.data.name,
            userSurname: result.data.surname,
            userNick: result.data.nick,
            photo: result.data.photo || "",
          },
          result.token
        );
        setTimeout(() => {
          setRedirectToHome(true);
        }, 200);
      } else if (result.status === "error") {
        props.openModal("Error", result.message, ModalType.ERROR);
      }
    } catch (error) {
      props.openModal(
        "Error",
        "Problem with server. Please try again later.",
        ModalType.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styleClasses.join(" ")} onSubmit={submitHandler}>
      <div className={classes.inputControl}>
        <input
          id="email"
          type="email"
          placeholder="Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={enteredEmailHasError ? classes.invalidInput : ""}
        />
        {enteredEmailHasError && <span>Please enter valid email.</span>}
      </div>
      <div className={classes.inputControl}>
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          className={enteredPasswordHasError ? classes.invalidInput : ""}
        />
        {enteredPasswordHasError && (
          <span>
            Please enter valid password. It must contain at least 8 characters.
          </span>
        )}
      </div>

      <div className={classes.formActions}>
        <button aria-label="Login button" type="submit">
          Login
        </button>
        <p>Doesn't have an account?</p>
        <Link to="/register" className={classes.link}>
          Register
        </Link>
      </div>
      {redirectToHome && <Navigate to="/" />}
    </form>
  );
};

export default LoginForm;
