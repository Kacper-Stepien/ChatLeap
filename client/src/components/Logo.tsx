import { FC } from "react";
import classes from "./Logo.module.scss";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

type LogoProps = {
  mode?: string;
};

const Logo: FC<LogoProps> = ({ mode: passedMode }) => {
  const { mode } = useTheme();
  if (!passedMode) {
    passedMode = mode;
  }
  const navigate = useNavigate();

  const styleClasses = [classes.logo, classes[passedMode]];

  const handleClick = () => {
    navigate("/");
  };

  return (
    <p className={styleClasses.join(" ")} onClick={handleClick}>
      ChatLeap
    </p>
  );
};

export default Logo;
