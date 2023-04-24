import { Link } from "react-router-dom";
import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";
import classes from "./Form.module.scss";

type Props = {
  mode: string;
  accent: string;
};

const passwordConfirmIsValid = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const RegisterForm: React.FC<Props> = (props) => {
  const theme = props.mode + props.accent;
  const styleClasses = [classes[theme], classes.form];

  const {
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setIsTouched: setNameIsTouched,
  } = useInput(Validator.isName);

  const {
    isValid: enteredSurnameIsValid,
    hasError: enteredSurnameHasError,
    valueChangeHandler: surnameChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    setIsTouched: setSurnameIsTouched,
  } = useInput(Validator.isSurname);

  const {
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
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
    <form className={styleClasses.join(" ")} onSubmit={submitFormHandler}>
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
        {enteredPasswordHasError && <span>Please enter valid Password</span>}
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
  );
};

export default RegisterForm;
