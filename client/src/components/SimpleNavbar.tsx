import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

import classes from "./SimpleNavbar.module.scss";

const SimpleNavbar: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.navbar, classes[mode]];

  return (
    <nav className={styleClasses.join(" ")}>
      <Logo mode={mode} />
      <ThemeSwitcher />
    </nav>
  );
};

export default SimpleNavbar;
