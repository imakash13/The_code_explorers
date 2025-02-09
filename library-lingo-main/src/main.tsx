import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { AuthProvider } from "./contexts/AuthContext"; // AuthProvider import karo
import { ThemeProvider } from "./components/Theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>  {/* Wrap App with AuthProvider */}
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
=======
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./components/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <ThemeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
>>>>>>> 0604764da1f82f20d8b43e5b89a4ac43619c5596
    </ThemeProvider>
  </AuthProvider>
);
