
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
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
                <a href="/" className="text-lg font-medium">Home</a>
                <a href="/books" className="text-lg font-medium">Books</a>
                <a href="/profile" className="text-lg font-medium">Profile</a>
                {isAdmin && (
                  <a href="/admin" className="text-lg font-medium">Admin</a>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          
          <a href="/" className="font-bold text-xl">
            LibraryOS
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/books" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Books
            </a>
            <a href="/profile" className="text-sm font-medium hover:text-primary/80 transition-colors">
              Profile
            </a>
            {isAdmin && (
              <a href="/admin" className="text-sm font-medium hover:text-primary/80 transition-colors">
                Admin
              </a>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
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
