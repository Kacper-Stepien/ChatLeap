import classes from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
  small?: boolean;
}

const LoadingSPpinner: React.FC<LoadingSpinnerProps> = ({
  fullScreen,
  message,
  small,
}) => {
  const styleClasses = [small ? classes.ldsRingSmall : classes.ldsRing];

  if (fullScreen) {
    return (
      <div className={classes.boxFullScreen}>
        <div className={styleClasses.join(" ")}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {message && <p className={classes.spinnerMessage}>{message}</p>}
      </div>
    );
  }

  return (
    <div className={classes.box}>
      <div className={styleClasses.join(" ")}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && <p className={classes.spinnerMessage}>{message}</p>}
    </div>
  );
};

export default LoadingSPpinner;
