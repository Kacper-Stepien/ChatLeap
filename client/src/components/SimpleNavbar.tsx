import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import classes from "./SimpleNavbar.module.scss";
import { useTheme } from "../context/ThemeContext";

const SimpleNavbar: React.FC = () => {
  const { mode } = useTheme();
  const styleClasses: string[] = [classes.navbar, classes[mode]];

  return (
    <nav className={styleClasses.join(" ")}>
      <Logo />
      <ThemeSwitcher />
    </nav>
  );
};

export default SimpleNavbar;
