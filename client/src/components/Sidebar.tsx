import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "./Footer";

const Sidebar: React.FC = () => {
  const { mode, accent } = useContext(ThemeContext);
  const theme = mode + accent;
  return (
    <div>
      <p>xd</p>
      <Footer mode={"dark"} />
    </div>
  );
};

export default Sidebar;
