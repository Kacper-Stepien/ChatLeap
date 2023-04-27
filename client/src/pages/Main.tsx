import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import Sidebar from ".././components/Sidebar";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

import classes from "./Main.module.scss";

function Main() {
  const navigate = useNavigate();
  const { mode, accent, setMode } = useContext(ThemeContext);
  const theme = mode + accent;
  const styleClasses = [classes[theme], classes.page];

  function handleClick() {
    navigate("/login");
  }

  return (
    // <div>
    //   <ul>
    //     <li>
    //       Go to <Link to="register">Register</Link>
    //     </li>
    //     <li>
    //       Go to <Link to="login">Login</Link>
    //     </li>
    //     <li>
    //       Go to <Link to="user">User</Link>
    //     </li>
    //   </ul>
    //   <h1>Main</h1>
    // </div>
    <div className={styleClasses.join(" ")}>
      <aside className={classes.aside}>
        <Sidebar />
      </aside>
      <div className={classes.main}>
        <Navbar />
        <Posts />
      </div>
    </div>
  );
}

export default Main;
