import classes from "./AbsoluteWrapper.module.scss";

type Props = {
  theme: string;
  children: React.ReactNode;
};

const AbsoluteWrapper: React.FC<Props> = ({ theme, children }) => {
  const styleClasses = [classes[theme], classes.absoluteWrapper];
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.box}>{children}</div>
    </div>
  );
};

export default AbsoluteWrapper;
