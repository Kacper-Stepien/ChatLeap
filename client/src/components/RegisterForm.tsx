import { FC, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { ModalType } from "../hooks/use-modal";
import Validator from "../utils/Validator";
import classes from "./Form.module.scss";
import createUser from "../utils/CreateUser";
import useInput from "../hooks/use-input";
import { useTheme } from "../context/ThemeContext";

type Props = {
  setIsLoading: (isLoading: boolean) => void;
  openModal: (title: string, content: string, type: ModalType) => void;
};

const passwordConfirmIsValid = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const RegisterForm: FC<Props> = (props) => {
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.form];
  const form = useRef<HTMLFormElement>(null);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setIsTouched: setNameIsTouched,
    reset: resetName,
  } = useInput(Validator.isName);

  const {
    value: enteredSurname,
    isValid: enteredSurnameIsValid,
    hasError: enteredSurnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    setIsTouched: setSurnameIsTouched,
    reset: resetSurname,
  } = useInput(Validator.isSurname);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
    reset: resetEmail,
  } = useInput(Validator.isEmail);

  const {
    value: enteredNick,
    isValid: enteredNickIsValid,
    hasError: enteredNickHasError,
    valueChangeHandler: nickChangeHandler,
    inputBlurHandler: nickBlurHandler,
    setIsTouched: setNickIsTouched,
    reset: resetNick,
  } = useInput(Validator.isNick);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
    reset: resetPassword,
  } = useInput(Validator.isPassword);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    isTouched: enteredConfirmPasswordIsTouched,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    setIsTouched: setConfirmPasswordIsTouched,
    reset: resetConfirmPassword,
  } = useInput(Validator.isPassword);

  const formIsValid =
    enteredNameIsValid &&
    enteredSurnameIsValid &&
    enteredEmailIsValid &&
    enteredNickIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid;

  const resetForm = () => {
    resetName();
    resetSurname();
    resetEmail();
    resetNick();
    resetPassword();
    resetConfirmPassword();
    form.current?.reset();
  };

  const setFormTouched = () => {
    setNameIsTouched(true);
    setSurnameIsTouched(true);
    setEmailIsTouched(true);
    setNickIsTouched(true);
    setPasswordIsTouched(true);
    setConfirmPasswordIsTouched(true);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) {
      setFormTouched();
      return;
    }

    try {
      props.setIsLoading(true);
      const response = await createUser(
        enteredName,
        enteredSurname,
        enteredEmail,
        enteredNick,
        enteredPassword,
        enteredConfirmPassword
      );

      props.setIsLoading(false);
      if (response.status === "fail") {
        props.openModal("Error", response.message, ModalType.ERROR);
        return;
      } else if (response.status === "success") {
        props.openModal(
          "Success",
          "Account has been created. You can log in.",
          ModalType.SUCCESS
        );
        resetForm();
        setTimeout(() => {
          setRedirectToLogin(true);
        }, 2000);
      } else if (response.status === "error") {
        props.openModal("Error", response.message, ModalType.ERROR);
        return;
      }
    } catch (error) {
      props.setIsLoading(false);
      props.openModal(
        "Error",
        "Problem with server. Please try again later.",
        ModalType.ERROR
      );
    }
  };
  return (
    <form
      ref={form}
      className={styleClasses.join(" ")}
      onSubmit={submitFormHandler}
    >
      <div className={classes.inputControl}>
        <input
          type="text"
          id="name"
          placeholder="First Name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          className={enteredNameHasError ? classes.invalidInput : ""}
        />
        {enteredNameHasError && (
          <span>
            Please enter a valid name. If it consists of two parts, please
            separate them with a space.
          </span>
        )}
      </div>
      <div className={classes.inputControl}>
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          onChange={surnameChangeHandler}
          onBlur={surnameBlurHandler}
          className={enteredSurnameHasError ? classes.invalidInput : ""}
        />
        {enteredSurnameHasError && (
          <span>
            Please enter a valid surname. If it consists of two parts, please
            separate them with a dash.
          </span>
        )}
      </div>
      <div className={classes.inputControl}>
        <input
          type="text"
          id="email"
          placeholder="Email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={enteredEmailHasError ? classes.invalidInput : ""}
        />
        {enteredEmailHasError && <span>Please enter valid email.</span>}
      </div>
      <div className={classes.inputControl}>
        <input
          type="text"
          id="nick"
          placeholder="Nick"
          onChange={nickChangeHandler}
          onBlur={nickBlurHandler}
          className={enteredNickHasError ? classes.invalidInput : ""}
        />
        {enteredNickHasError && (
          <span>
            Please enter valid nick. It can contain only lowercase letters (a-z)
            and numbers (0-9). It should have a length between 5 and 25
            characters.
          </span>
        )}
      </div>
      <div className={classes.inputControl}>
        <input
          type="password"
          id="password"
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
      <div className={classes.inputControl}>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
          className={
            !passwordConfirmIsValid(enteredPassword, enteredConfirmPassword) &&
            enteredConfirmPasswordIsTouched && (
              <span>Passwords must be the same</span>
            )
              ? classes.invalidInput
              : ""
          }
        />

        {!passwordConfirmIsValid(enteredPassword, enteredConfirmPassword) &&
          enteredConfirmPasswordIsTouched && (
            <span>Passwords must be the same.</span>
          )}
      </div>

      <div className={classes.formActions}>
        <button aria-label="Register button" type="submit">
          Register
        </button>
        <p>Do you have an account?</p>
        <Link to="/login" className={classes.link}>
          Login
        </Link>
      </div>
      {redirectToLogin && <Navigate to="/" />}
    </form>
  );
};

export default RegisterForm;
