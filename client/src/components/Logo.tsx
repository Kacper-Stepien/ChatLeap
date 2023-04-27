import classes from "./Logo.module.scss";

const Logo: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.logo, classes[mode]];
  return <p className={styleClasses.join(" ")}>ChatLeap</p>;
};

export default Logo;
