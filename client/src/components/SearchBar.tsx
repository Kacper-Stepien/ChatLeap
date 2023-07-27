import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import UserModel from "../models/Author";
import LoadingSPpinner from "./LoadingSpinner";

import classes from "./SearchBar.module.scss";

const SearchBar: React.FC<{ mode: string }> = ({ mode }) => {
  const { token } = useAuth();
  const styleClasses: string[] = [classes.searchBar, classes[mode]];

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<UserModel[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const fetchResults = async (value: string) => {
    const address = process.env.REACT_APP_SERVER + `/users/search/${value}`;
    if (value.length > 0) {
      setIsLoading(true);
      if (abortController) {
        abortController.abort(); // Abort previous request
      }
      const newController = new AbortController(); // Create new controller
      setAbortController(newController); // Set new controller
      try {
        const response = await fetch(address, {
          headers: { Authorization: `Bearer ${token}` },
          signal: newController.signal,
        });
        const data = await response.json();
        if (data.data.length === 0) {
          setSearchResults([]);
        } else {
          setSearchResults(data.data.users);
        }
        setIsLoading(false);
      } catch (error) {
        if (!(error instanceof DOMException)) {
          setIsLoading(false);
        }
      }
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  };

  const clickHandler = () => {
    searchInputRef.current?.focus();
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    fetchResults(value);
  };

  const focusHandler = () => {
    setIsFocused(true);
    const value = searchInputRef.current?.value;
    if (searchInputRef.current?.value.length !== 0 && value) {
      fetchResults(value);
    }
  };

  const blurHandler = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.relatedTarget?.className === classes.result) {
      return;
    }
    setIsFocused(false);
    setSearchResults([]);
  };

  return (
    <div className={styleClasses.join(" ")} onClick={clickHandler}>
      <input
        aria-label="Search Bar"
        placeholder="Search..."
        ref={searchInputRef}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
      ></input>
      <FaSearch className={classes.icon} />
      {isFocused && (
        <div className={classes.results}>
          {searchInputRef.current?.value.length !== 0 && (
            <ul className={classes.results_list}>
              {searchResults.map((result) => {
                return (
                  <li key={result._id}>
                    <NavLink
                      to={`/user/${result._id}`}
                      className={classes.result}
                    >
                      <img
                        src={
                          result.photo
                            ? process.env.REACT_APP_PHOTOS +
                              `/users/${result.photo}`
                            : "/user.jpg"
                        }
                        alt={result.name + " " + result.surname}
                      ></img>
                      <p>
                        {result.name} {result.surname}
                      </p>
                      <p>{result.nick}</p>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          )}
          {isLoading && <LoadingSPpinner small message="Loading" />}
          {!isLoading &&
            searchInputRef.current?.value.length !== 0 &&
            searchResults.length === 0 && (
              <p className={classes.message}>No results</p>
            )}
          {!isLoading && searchInputRef.current?.value.length === 0 && (
            <p className={classes.message}>Type something</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
