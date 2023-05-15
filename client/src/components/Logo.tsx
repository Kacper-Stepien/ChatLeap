import { useNavigate } from "react-router-dom";

import classes from "./Logo.module.scss";

const Logo: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.logo, classes[mode]];
  const navigate = useNavigate();

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
