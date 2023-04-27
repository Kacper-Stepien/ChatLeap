import { useContext } from "react";
import LoginForm from "../components/LoginForm";
import { ThemeContext } from "../context/ThemeContext";
import SimpleNavbar from "../components/SimpleNavbar";
import Footer from "../components/Footer";
import classes from "./Form.module.scss";

const Login: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  return (
    <div className={styleClasses.join(" ")}>
      <SimpleNavbar mode={mode} />
      <div className={classes.formArea}>
        <h1>Login</h1>
        <LoginForm mode={mode} accent={accent} />
      </div>
      <Footer mode={mode} />
    </div>
  );
};

export default Login;
