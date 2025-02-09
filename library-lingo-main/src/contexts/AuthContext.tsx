import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  userRole: string | null;
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
  const [userRole, setUserRole] = useState<string | null>(null);
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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error: unknown) {
          console.error("Error fetching user role:", error);
          if ((error as Error).message.includes('offline')) {
            toast({
              variant: "destructive",
              title: "Offline Mode",
              description: "Some features may be limited while offline",
            });
          }
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [toast]);

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
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      });
      toast({
        title: "Account created successfully",
        description: "Welcome to the Library Management System!",
      });
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error creating account",
        description: (error as Error).message,
      });
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
    userRole,
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
