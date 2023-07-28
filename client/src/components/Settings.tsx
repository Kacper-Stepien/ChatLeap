import { useTheme } from "../context/ThemeContext";

import classes from "./Settings.module.scss";

const Settings: React.FC = () => {
  const { mode, accent, setThemeMode, setThemeAccent } = useTheme();

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
              aria-label="Dark mode button"
              className={darkBtnClasses.join(" ")}
              onClick={() => {
                setThemeMode("dark");
              }}
            ></button>
            <button
              aria-label="Light mode button"
              className={lightBtnClasses.join(" ")}
              onClick={() => {
                setThemeMode("light");
              }}
            ></button>
          </div>
        </div>
        <div className={classes.mode}>
          <h3 className={classes.option}>Accent</h3>
          <div className={classes.buttons}>
            <button
              aria-label="Indigo accent button"
              className={indigoBtnClasses.join(" ")}
              onClick={() => {
                setThemeAccent("Indigo");
              }}
            ></button>
            <button
              aria-label="Teal accent button"
              className={tealBtnClasses.join(" ")}
              onClick={() => {
                setThemeAccent("Teal");
              }}
            ></button>
            <button
              aria-label="Orange accent button"
              className={orangeBtnClasses.join(" ")}
              onClick={() => {
                setThemeAccent("Orange");
              }}
            ></button>
            <button
              aria-label="Pink accent button"
              className={pinkBtnClasses.join(" ")}
              onClick={() => {
                setThemeAccent("Pink");
              }}
            ></button>
            <button
              aria-label="Green accent button"
              className={greenBtnClasses.join(" ")}
              onClick={() => {
                setThemeAccent("Green");
              }}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
