import "./sass/base.scss";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LoadingSpinnerProvider } from "./context/LoadinSpinnerContext";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
      <LoadingSpinnerProvider>
        <App />
      </LoadingSpinnerProvider>
    </ThemeProvider>
  </AuthProvider>
);
