import { FC } from "react";
import classes from "./Footer.module.scss";
import { useTheme } from "../context/ThemeContext";

type FooterProps = {
  mode?: string;
};

const Footer: FC<FooterProps> = ({ mode: passedMode }) => {
  const { mode } = useTheme();
  if (!passedMode) {
    passedMode = mode;
  }
  const styleClasses = [classes.footer, classes[passedMode]];

  return (
    <footer className={styleClasses.join(" ")}>
      <span>
        © Designed by{" "}
        <a
          aria-label="Link to author GitHub profile"
          href="https://github.com/Kacper-Stepien"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kacper Stępień
        </a>
        . All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
