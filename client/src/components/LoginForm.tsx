import { Link } from "react-router-dom";
import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";

import classes from "./Form.module.scss";

type Props = {
  mode: string;
  accent: string;
};

const LoginForm: React.FC<Props> = (props) => {
  const theme = props.mode + props.accent;
  const styleClasses = [classes[theme], classes.form];

  const {
    isValid: enteredEmailIsValid,
    hasError: enteredEmailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    setIsTouched: setEmailIsTouched,
  } = useInput(Validator.isEmail);

  const {
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
    <form className={styleClasses.join(" ")} onSubmit={submitHandler}>
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
        {enteredPasswordHasError && <span>Please enter valid password</span>}
      </div>

      <div className={classes.formActions}>
        <button type="submit">Login</button>
        <p>Doesn't have an account?</p>
        <Link to="/register" className={classes.link}>
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
