import { useRef } from "react";
import { Link } from "react-router-dom";
import Validator from "../utils/Validator";
import useInput from "../hooks/use-input";
import classes from "./Form.module.scss";

enum ModalType {
  SUCCESS,
  ERROR,
  WARNING,
}

type Props = {
  mode: string;
  accent: string;
  openModal: (title: string, content: string, type: ModalType) => void;
  closeModal: () => void;
};

const passwordConfirmIsValid = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

const RegisterForm: React.FC<Props> = (props) => {
  const theme = props.mode + props.accent;
  const styleClasses = [classes[theme], classes.form];
  const form = useRef<HTMLFormElement>(null);

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

  const resetForm = () => {
    resetName();
    resetSurname();
    resetEmail();
    resetNick();
    resetPassword();
    resetConfirmPassword();
    form.current?.reset();
  };

  const formIsValid =
    enteredNameIsValid &&
    enteredSurnameIsValid &&
    enteredEmailIsValid &&
    enteredNickIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid;

  const createUser = async () => {
    console.log(process.env.SERVER);
    const address = "http://127.0.01:3000/chatleap" + "/users/signup";
    const data = {
      name: enteredName,
      surname: enteredSurname,
      email: enteredEmail,
      nick: enteredNick,
      password: enteredPassword,
      passwordConfirm: enteredConfirmPassword,
    };

    const response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formIsValid) {
      setNameIsTouched(true);
      setSurnameIsTouched(true);
      setEmailIsTouched(true);
      setNickIsTouched(true);
      setPasswordIsTouched(true);
      setConfirmPasswordIsTouched(true);
    } else {
      console.log("Form is valid");
      const response = await createUser();
      console.log(response);
      if (response.status === "fail") {
        console.log(response.message);
        props.openModal("Error", response.message, ModalType.ERROR);
      } else if (response.status === "success") {
        props.openModal(
          "Success",
          "Account has been created",
          ModalType.SUCCESS
        );
        resetForm();
      }
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
