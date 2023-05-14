import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import classes from "./Settings.module.scss";

const Settings: React.FC = () => {
  const { mode, accent, setMode, setAccent } = useContext(ThemeContext);
  const styleClasses: string[] = [classes[mode], classes.page];

  const darkBtnClasses: string[] = [classes.modeDarkBtn];
  const lightBtnClasses: string[] = [classes.modeLightBtn];
  const indigoBtnClasses: string[] = [classes.accentIndigoBtn];
  const tealBtnClasses: string[] = [classes.accentTealBtn];
  const orangeBtnClasses: string[] = [classes.accentOrangeBtn];
  const pinkBtnClasses: string[] = [classes.accentPinkBtn];
  const greenBtnClasses: string[] = [classes.accentGreenBtn];

  if (mode === "dark") {
    darkBtnClasses.push(classes.active);
  }
  if (mode === "light") {
    lightBtnClasses.push(classes.active);
  }

  if (accent === "Indigo") {
    indigoBtnClasses.push(classes.active);
  }

  if (accent === "Teal") {
    tealBtnClasses.push(classes.active);
  }

  if (accent === "Orange") {
    orangeBtnClasses.push(classes.active);
  }

  if (accent === "Pink") {
    pinkBtnClasses.push(classes.active);
  }

  if (accent === "Green") {
    greenBtnClasses.push(classes.active);
  }

  return (
    <div className={styleClasses.join(" ")}>
      <h2 className={classes.header}>Settings</h2>
      <div className={classes.settings}>
        <div className={classes.mode}>
          <h3 className={classes.option}>Mode</h3>
          <div className={classes.buttons}>
            <button
              className={darkBtnClasses.join(" ")}
              onClick={() => {
                setMode("dark");
              }}
            ></button>
            <button
              className={lightBtnClasses.join(" ")}
              onClick={() => {
                setMode("light");
              }}
            ></button>
          </div>
        </div>
        <div className={classes.mode}>
          <h3 className={classes.option}>Accent</h3>
          <div className={classes.buttons}>
            <button
              className={indigoBtnClasses.join(" ")}
              onClick={() => {
                setAccent("Indigo");
              }}
            ></button>
            <button
              className={tealBtnClasses.join(" ")}
              onClick={() => {
                setAccent("Teal");
              }}
            ></button>
            <button
              className={orangeBtnClasses.join(" ")}
              onClick={() => {
                setAccent("Orange");
              }}
            ></button>
            <button
              className={pinkBtnClasses.join(" ")}
              onClick={() => {
                setAccent("Pink");
              }}
            ></button>
            <button
              className={greenBtnClasses.join(" ")}
              onClick={() => {
                setAccent("Green");
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
