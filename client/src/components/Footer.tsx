import classes from "./Footer.module.scss";

const Footer: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.footer, classes[mode]];
  return (
    <footer className={styleClasses.join(" ")}>
      <span>© Designed by Kacper Stępień. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
