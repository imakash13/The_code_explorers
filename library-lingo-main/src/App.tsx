import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
// import Index from "./pages/Index";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/profile";
import { PrivateRoute } from "./components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Header/>
          {/* <Home /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
