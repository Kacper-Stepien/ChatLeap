import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { ThemeContext } from "../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import classes from "./Form.module.scss";

const Login: React.FC = () => {
  const { mode, accent, setMode } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  const toggleModeHandler = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <div className={styleClasses.join(" ")}>
      <p className={classes.logo}>ChatLeap</p>
      <button className={classes.themeButton} onClick={toggleModeHandler}>
        {mode === "light" ? <FaMoon /> : <FaSun />}
      </button>
      <div className={classes.formArea}>
        <h1>Login</h1>
        <LoginForm mode={mode} accent={accent} />
      </div>
    </div>
  );
};

export default Login;
