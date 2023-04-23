import { Link, useNavigate } from "react-router-dom";
import classes from "./Register.module.scss";

function Register() {
  const navigate = useNavigate();
  const styleClasses = [classes.darkTeal, classes.page];

  return (
    <div className={styleClasses.join(" ")}>
      <p className={classes.logo}>ChatLeap</p>
      <div className={classes.formArea}>
        <h1>Register</h1>
        <form>
          <div className={classes.inputControl}>
            <input type="text" id="name" placeholder="First Name" />
            <span>Please enter valid name</span>
          </div>
          <div className={classes.inputControl}>
            <input type="text" id="lastname" placeholder="Last Name" />
            <span>Please enter valid Surame</span>
          </div>
          <div className={classes.inputControl}>
            <input type="text" id="email" placeholder="Email" />
            <span>Please enter valid email</span>
          </div>
          <div className={classes.inputControl}>
            <input type="text" id="nick" placeholder="Nick" />
            <span>Please enter valid nick</span>
          </div>
          <div className={classes.inputControl}>
            <input type="text" id="password" placeholder="Password" />
            <span>Please enter valid Password</span>
          </div>
          <div className={classes.inputControl}>
            <input
              type="text"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <span>Please enter valid password</span>
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
}

export default Register;
