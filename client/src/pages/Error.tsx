import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../context/ThemeContext";

import styles from "./Error.module.scss";

const ErrorPage: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [styles[theme], styles.error];

  const [seconds, setSeconds] = useState<number>(5);
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 1) {
        setSeconds((prevSecond) => prevSecond - 1);
      } else {
        redirectToHomePage();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [seconds]);

  return (
    <div className={styleClasses.join(" ")}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        You will be redirected to the home page in <span>{seconds}</span>{" "}
        seconds
      </p>
    </div>
  );
};

export default ErrorPage;
