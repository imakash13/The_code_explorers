import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isOnline: boolean;
  signup: (name: string, email: string, phone: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (name: string, email: string, phone: string, password: string) => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot sign up while offline. Please check your internet connection.",
      });
      throw new Error("Cannot sign up while offline");
    }
  
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: "Account created successfully",
        description: "Welcome to the Library Management System!",
      });
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes("auth/email-already-in-use")) {
        toast({
          variant: "destructive",
          title: "Email already in use",
          description: "The email address is already associated with an existing account. Please use a different email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error creating account",
          description: errorMessage,
        });
      }
      throw error;
    }
  };
  
  const login = async (email: string, password: string) => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot log in while offline. Please check your internet connection.",
      });
      throw new Error("Cannot log in while offline");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: (error as Error).message,
      });
      throw error;
    }
  };

  const logout = async () => {
    if (!isOnline) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot log out while offline. Please check your internet connection.",
      });
      throw new Error("Cannot log out while offline");
    }

    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "See you soon!",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: (error as Error).message,
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isOnline,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
