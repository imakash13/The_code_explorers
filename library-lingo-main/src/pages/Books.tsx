import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "@/types/book";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, PlusCircle } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Books = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");

  const API_URL = "https://library-management-6e410-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books.json`);
        const data = response.data;
        const formattedBooks = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
          rating: data[key].rating || 0,
        }));
        setBooks(formattedBooks);
        setFilteredBooks(formattedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let result = [...books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
      );
    }

    if (selectedGenre !== "all") {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    if (selectedRating !== "all") {
      const minRating = parseInt(selectedRating);
      result = result.filter((book) => (book.rating || 0) >= minRating);
    }

    if (selectedAvailability !== "all") {
      result = result.filter((book) =>
        selectedAvailability === "available" ? book.available : !book.available
      );
    }

    setFilteredBooks(result);
  }, [books, searchQuery, selectedGenre, selectedRating, selectedAvailability]);

  const genres = [...new Set(books.map((book) => book.genre))];

  const addToProfile = (book: Book) => {
    const issuedBooks = JSON.parse(localStorage.getItem('issuedBooks') || '[]');
    
    // Check if book is already issued
    if (issuedBooks.some((b: Book) => b.id === book.id)) {
      toast({
        title: "Already Added",
        description: "This book is already in your profile.",
        variant: "destructive"
      });
      return;
    }

    // Add book to issued books
    const updatedIssuedBooks = [...issuedBooks, book];
    localStorage.setItem('issuedBooks', JSON.stringify(updatedIssuedBooks));

    toast({
      title: "Book Added",
      description: "The book has been added to your profile successfully.",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8 space-y-4">
        <h1 className="text-3xl font-bold">Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <Card key={n}>
              <CardContent className="p-4 space-y-4">
                <Skeleton className="h-[200px] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Books Collection</h1>
      
      <FilterBar
        onSearchChange={setSearchQuery}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
        onAvailabilityChange={setSelectedAvailability}
        genres={genres}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <div className="text-sm text-muted-foreground">by {book.author}</div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm line-clamp-2">{book.description}</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{(book.rating || 0).toFixed(1)}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Published: {new Date(book.publishedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                  {book.genre}
                </span>
                <span className={`text-xs font-medium ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                  {book.available ? 'Available' : 'Checked Out'}
                </span>
              </div>
              {book.available && (
                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => addToProfile(book)}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add to Profile
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Books;