import { createContext } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  userID: "",
  userName: "",
  userSurname: "",
  userNick: "",
  token: "",
  setLoggedIn: (loggedIn: boolean) => {},
  setUser: ({
    userID,
    userName,
    userSurname,
    userNick,
  }: {
    userID: string;
    userName: string;
    userSurname: string;
    userNick: string;
  }) => {},
  setToken: (token: string) => {},
});
