import LocalStorage from "./LocalStorage";

interface LogoutParams {
  setLoggedIn: (loggedIn: boolean) => void;
}

export const LogoutUser = ({ setLoggedIn }: LogoutParams) => {
  setLoggedIn(false);
  const localStorage = new LocalStorage();
  localStorage.clearToken();
  localStorage.clearUser();
};
