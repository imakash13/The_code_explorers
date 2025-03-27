import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
=======
import { AuthProvider } from "./contexts/AuthContext";
>>>>>>> 7b3cee30c5d18195ead4db72d8bd8a53655b2e26
import { ThemeProvider } from "./components/Theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
