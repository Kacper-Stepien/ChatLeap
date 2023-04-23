import { Outlet } from "react-router-dom";

import classes from "./Root.module.scss";

function RootLayout() {
  return (
    <div className={classes.content}>
      <Outlet />
    </div>
  );
}

export default RootLayout;
