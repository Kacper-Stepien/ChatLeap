import { FC } from "react";
import classes from "./LoadingSpinner.module.scss";
import { useTheme } from "../context/ThemeContext";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  message?: string;
  small?: boolean;
}

const LoadingSPpinner: FC<LoadingSpinnerProps> = ({
  fullScreen,
  message,
  small,
}) => {
  const { mode } = useTheme();
  const styleClasses = [
    small ? classes.ldsRingSmall : classes.ldsRing,
    classes[mode],
  ];

  console.log(mode);
  console.log(styleClasses);

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
