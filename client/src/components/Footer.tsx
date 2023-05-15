import classes from "./Footer.module.scss";

const Footer: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.footer, classes[mode]];
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
