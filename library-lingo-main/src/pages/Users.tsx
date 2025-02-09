import { useEffect, useState } from "react";
import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { books } from "@/lib/mock-data";
import { BookGrid } from "@/components/BookGrid";
import { SearchBar } from "@/components/SearchBar";
import { Link } from "react-router-dom";
import { Book } from "@/types/book";
import axios from "axios";

const Users = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);

    const API_URL = "https://library-55df1-default-rtdb.firebaseio.com";
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/books.json`);
          const data = response.data || {};
          const booksArray = Object.entries(data).map(([id, book]) => ({
            id,
            ...(book as Book),
          })).filter(book => book.title && book.author);
          setBooks(booksArray);
          console.log(booksArray);
        } catch (error) {
          console.error("Error fetching data from Realtime Database: ", error);
        }
      };
      
  
      fetchData();
    }, []); // Only runs on mount
  
    const search = searchQuery?.toLowerCase() || "";
    const filteredBooks = books.filter(
      (book) =>
        (book.available===true) &&
        (book?.title?.toLowerCase()?.includes(search) ||
        book?.author?.toLowerCase()?.includes(search) ||
        book?.genre.toLowerCase().includes(search))
    );  

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Bar */}
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
                                    <Link to="/books" className="text-lg font-medium">Books</Link>
                                    <Link to="/users" className="text-lg font-medium">Profile</Link>
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <nav className="hidden md:flex items-center gap-6">
                            <Link to="/books" className="text-sm font-medium hover:text-primary/80 transition-colors">Books</Link>
                            <Link to="/profile" className="text-sm font-medium hover:text-primary/80 transition-colors">Profile</Link>
                        </nav>
                    </div>

                    {/* <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="w-5 h-5" />
                        </Button>
                    </div> */}
                </div>
            </header>

            {/* Main Content */}
            <div className="container py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Library Management System</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover, borrow, and manage your library books all in one place.
                    </p>
                </div>

                <SearchBar onSearch={setSearchQuery} />

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Available Books</h2>
                    <BookGrid books={filteredBooks} />
                </div>
            </div>
        </div>
    );
};

export default Users;
