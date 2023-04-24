import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";
import { ThemeContext } from "../context/ThemeContext";
import classes from "./Form.module.scss";

const passwordConfirmIsValid = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { mode, accent, setMode } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setIsTouched: setNameIsTouched,
  } = useInput(Validator.isName);

  const {
    value: enteredSurname,
    isValid: enteredSurnameIsValid,
    hasError: enteredSurnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    setIsTouched: setSurnameIsTouched,
  } = useInput(Validator.isSurname);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
    value: enteredNick,
    isValid: enteredNickIsValid,
    hasError: enteredNickHasError,
    valueChangeHandler: nickChangeHandler,
    inputBlurHandler: nickBlurHandler,
    setIsTouched: setNickIsTouched,
  } = useInput(Validator.isNick);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: enteredPasswordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    setIsTouched: setPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const {
    value: enteredConfirmPassword,
    isValid: enteredConfirmPasswordIsValid,
    hasError: enteredConfirmPasswordHasError,
    isTouched: enteredConfirmPasswordIsTouched,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    setIsTouched: setConfirmPasswordIsTouched,
  } = useInput(Validator.isPassword);

  const formIsValid =
    enteredNameIsValid &&
    enteredSurnameIsValid &&
    enteredEmailIsValid &&
    enteredNickIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid;

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setMode("dark");

    if (!formIsValid) {
      console.log("Form is not valid");
      setNameIsTouched(true);
      setSurnameIsTouched(true);
      setEmailIsTouched(true);
      setNickIsTouched(true);
      setPasswordIsTouched(true);
      setConfirmPasswordIsTouched(true);
    } else {
      console.log("Form is valid");
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <p className={classes.logo}>ChatLeap</p>
      <div className={classes.formArea}>
        <h1>Register</h1>
        <form onSubmit={submitFormHandler}>
          <div className={classes.inputControl}>
            <input
              type="text"
              id="name"
              placeholder="First Name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {enteredNameHasError && <span>Please enter valid name</span>}
          </div>
          <div className={classes.inputControl}>
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              onChange={surnameChangeHandler}
              onBlur={surnameBlurHandler}
            />
            {enteredSurnameHasError && <span>Please enter valid Surame</span>}
          </div>
          <div className={classes.inputControl}>
            <input
              type="text"
              id="email"
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {enteredEmailHasError && <span>Please enter valid email</span>}
          </div>
          <div className={classes.inputControl}>
            <input
              type="text"
              id="nick"
              placeholder="Nick"
              onChange={nickChangeHandler}
              onBlur={nickBlurHandler}
            />
            {enteredNickHasError && <span>Please enter valid nick</span>}
          </div>
          <div className={classes.inputControl}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {enteredPasswordHasError && (
              <span>Please enter valid Password</span>
            )}
          </div>
          <div className={classes.inputControl}>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
            />

            {!passwordConfirmIsValid(enteredPassword, enteredConfirmPassword) &&
              enteredConfirmPasswordIsTouched && (
                <span>Passwords must be the same</span>
              )}
          </div>

          <div className={classes.formActions}>
            <button type="submit">Register</button>
            <p>Do you have an account?</p>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
