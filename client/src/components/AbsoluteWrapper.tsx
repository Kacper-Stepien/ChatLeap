import { FC, ReactNode } from "react";

import classes from "./AbsoluteWrapper.module.scss";
import { useTheme } from "../context/ThemeContext";

type Props = {
  children: ReactNode;
};

const AbsoluteWrapper: FC<Props> = ({ children }) => {
  const { theme } = useTheme();
  const styleClasses = [classes[theme], classes.absoluteWrapper];
  return (
    <div className={styleClasses.join(" ")}>
      <div className={classes.box}>{children}</div>
    </div>
  );
};

export default AbsoluteWrapper;
