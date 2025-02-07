import { useState } from "react";
import { books } from "@/lib/mock-data";
import { BookGrid } from "@/components/BookGrid";
import { SearchBar } from "@/components/SearchBar";
import { BookOpen } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="container py-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold tracking-tight">Library Management System</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover, borrow, and manage your library books all in one place.
            </p>
          </div>
          
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Available Books</h2>
              <p className="text-muted-foreground">
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </p>
            </div>
            <BookGrid books={filteredBooks} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Index;