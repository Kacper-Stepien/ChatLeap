import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useLoadingSpinner } from "../context/LoadinSpinnerContext";

import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";
import logIn from "../utils/Login";
import { ModalType } from "../hooks/use-modal";
import LocalStorage from "../utils/LocalStorage";

import classes from "./Form.module.scss";

type Props = {
  mode: string;
  accent: string;
  openModal: (title: string, content: string, type: ModalType) => void;
  closeModal: () => void;
};

const LoginForm: React.FC<Props> = (props) => {
  const theme = props.mode + props.accent;
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
        setIsLoading(false);
        props.openModal("Error", result.message, ModalType.ERROR);
      } else if (result.status === "success") {
        setIsLoading(false);
        setLoggedInUser(
          {
            userID: result.data._id,
            userName: result.data.name,
            userSurname: result.data.surname,
            userNick: result.data.nick,
            photo: result.data.photo || "",
          },
          result.token
        );
        props.openModal("Success", result.message, ModalType.SUCCESS);
        setTimeout(() => {
          setRedirectToHome(true);
        }, 200);
      } else if (result.status === "error") {
        setIsLoading(false);
        props.openModal("Error", result.message, ModalType.ERROR);
      }
    } catch (error) {
      setIsLoading(false);
      props.openModal(
        "Error",
        "Problem with server. Please try again later.",
        ModalType.ERROR
      );
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
