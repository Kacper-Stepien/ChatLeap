import ReactDOM from "react-dom/client";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingSpinnerProvider } from "./context/LoadinSpinnerContext";
import App from "./App";

import "./sass/base.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
      <LoadingSpinnerProvider>
        <App />
      </LoadingSpinnerProvider>
    </ThemeProvider>
  </AuthProvider>
);
