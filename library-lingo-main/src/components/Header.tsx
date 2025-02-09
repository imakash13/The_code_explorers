
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/Theme-toggle";
import { Link } from "react-router-dom";

export const Header = () => {

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
              </nav>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="font-bold text-xl hover:opacity-80 transition-opacity">
            LibraryOS
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
