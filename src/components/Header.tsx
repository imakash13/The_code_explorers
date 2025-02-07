
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "react-router-dom";

export const Header = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <header className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-lg font-medium">Home</Link>
                <Link to="/books" className="text-lg font-medium">Books</Link>
                <Link to="/profile" className="text-lg font-medium">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="text-lg font-medium">Admin</Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="font-bold text-xl hover:opacity-80 transition-opacity">
            LibraryOS
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/books" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Books
            </Link>
            <Link to="/profile" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Profile
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium hover:text-primary/80 transition-colors">
                Admin
              </Link>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
