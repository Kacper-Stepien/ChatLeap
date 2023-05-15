import React, { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import styles from "./Error.module.scss";

const ErrorPage: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [styles[theme], styles.error];
  return (
    <div className={styleClasses.join(" ")}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};

export default ErrorPage;
