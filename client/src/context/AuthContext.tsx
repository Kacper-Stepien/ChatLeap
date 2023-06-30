import { createContext } from "react";

export const AuthContext = createContext({
  loggedIn: false,
  userID: "",
  userName: "",
  userSurname: "",
  userNick: "",
  token: "",
  photo: "",
  setLoggedIn: (loggedIn: boolean) => {},
  setUser: ({
    userID,
    userName,
    userSurname,
    userNick,
    photo,
  }: {
    userID: string;
    userName: string;
    userSurname: string;
    userNick: string;
    photo: string;
  }) => {},
  setToken: (token: string) => {},
});
