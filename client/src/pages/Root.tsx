import { FC } from "react";
import { Outlet } from "react-router-dom";
import classes from "./Root.module.scss";

const RootLayout: FC = () => {
  return (
    <div className={classes.content}>
      <Outlet />
    </div>
  );
};

export default RootLayout;
