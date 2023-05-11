import classes from "./LoadingSpinner.module.scss";

const LoadingSPpinner: React.FC = () => {
  const styleClasses = [classes.ldsRing];
  return (
    <div className={classes.box}>
      <div className={styleClasses.join(" ")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSPpinner;
