import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SimpleNavbar from "../components/SimpleNavbar";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import classes from "./Form.module.scss";

const Register: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  return (
    <div className={styleClasses.join(" ")}>
      <SimpleNavbar mode={mode} />
      <div className={classes.formArea}>
        <h1>Register</h1>
        <RegisterForm mode={mode} accent={accent} />
      </div>
      <Footer mode={mode} />
    </div>
  );
};

export default Register;
