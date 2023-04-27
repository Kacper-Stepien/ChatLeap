import { useRef } from "react";
import classes from "./SearchBar.module.scss";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC<{ mode: string }> = ({ mode }) => {
  const styleClasses: string[] = [classes.searchBar, classes[mode]];
  const inputRef = useRef<HTMLInputElement>(null);

  const clickHandler = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styleClasses.join(" ")} onClick={clickHandler}>
      <input ref={inputRef}></input>
      <FaSearch className={classes.icon} />
    </div>
  );
};

export default SearchBar;
