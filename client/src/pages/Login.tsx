import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";
import { ThemeContext } from "../context/ThemeContext";
import classes from "./Form.module.scss";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { mode, accent, setMode } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

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

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formIsValid) {
      setEmailIsTouched(true);
      setPasswordIsTouched(true);
      console.log("Invalid form");
    } else {
      console.log("Valid form");
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <p className={classes.logo}>ChatLeap</p>
      <div className={classes.formArea}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.inputControl}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {enteredEmailHasError && <span>Please enter valid email</span>}
          </div>
          <div className={classes.inputControl}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {enteredPasswordHasError && (
              <span>Please enter valid password</span>
            )}
          </div>

          <div className={classes.formActions}>
            <button type="submit">Login</button>
            <p>Doesn't have an account?</p>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
