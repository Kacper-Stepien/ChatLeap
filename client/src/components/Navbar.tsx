import { FC } from "react";
import { FaBars } from "react-icons/fa";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import classes from "./Navbar.module.scss";
import { useTheme } from "../context/ThemeContext";

type Props = {
  setShowAside: (show: boolean) => void;
};

const Navbar: FC<Props> = ({ setShowAside }) => {
  const { mode, theme } = useTheme();
  const styleClasses = [classes[theme], classes.navbar];

  return (
    <div className={styleClasses.join(" ")}>
      <button
        aria-label="Menu button"
        className={classes.menu}
        onClick={() => {
          setShowAside(true);
        }}
      >
        <FaBars />
      </button>
      <SearchBar />
      <ThemeSwitcher />
    </div>
  );
};

export default Navbar;
