import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // AuthProvider import karo
import { ThemeProvider } from "./components/Theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>  {/* Wrap App with AuthProvider */}
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
);
