import React from 'react'

const Admin = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const API_URL = "https://library-55df1-default-rtdb.firebaseio.com";

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

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

  // Add a new book
  const handleAddBook = async (bookData: Omit<Book, "id">) => {
    try {
      const newBook = { ...bookData, count: 1 };
      const response = await axios.post(`${API_URL}/books.json`, newBook);
      if (response.data && response.data.name) {
        const addedBook = { ...newBook, id: response.data.name };
        setBooks((prevBooks) => [...prevBooks, addedBook]); // Avoids stale state
        setIsDialogOpen(false);
        toast({ title: "Success", description: "Book added successfully" });
      } else {
        throw new Error("Failed to get ID from Firebase");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast({ title: "Error", description: "Failed to add book." });
    }
  };

  // Edit an existing book
  const handleEditBook = async (bookData: Omit<Book, "id">) => {
    if (!selectedBook) return;
    try {
      const updatedBook = { ...bookData, id: selectedBook.id, count: selectedBook.count };
      await axios.put(`${API_URL}/books/${selectedBook.id}.json`, updatedBook);

      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === selectedBook.id ? updatedBook : book))
      );

      setIsDialogOpen(false);
      setSelectedBook(undefined);
      toast({ title: "Success", description: "Book updated successfully" });
    } catch (error) {
      console.error("Error editing book:", error);
      toast({ title: "Error", description: "Failed to update book." });
    }
  };

  // Delete a book
  const handleDeleteBook = async (book: Book) => {
    try {
      await axios.delete(`${API_URL}/books/${book.id}.json`);
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== book.id));
      toast({ title: "Success", description: "Book deleted successfully" });
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({ title: "Error", description: "Failed to delete book." });
    }
  };

  // Increase book count
  const handleIncreaseCount = async (book: Book) => {
    try {
      const updatedBook = { ...book, count: book.count + 1 };
      if (updatedBook.count <= 0) {
        updatedBook.available = false;
      } else {
        updatedBook.available = true;
      }
      await axios.put(`${API_URL}/books/${book.id}.json`, updatedBook);

      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
      );
    } catch (error) {
      console.error("Error increasing count:", error);
      toast({ title: "Error", description: "Failed to increase book count." });
    }
  };

  // Decrease book count
  const handleDecreaseCount = async (book: Book) => {
    try {
      const updatedBook = { ...book, count: book.count - 1 };
      if (updatedBook.count <= 0) {
        updatedBook.available = false;
      } else {
        updatedBook.available = true;
      }
  
      await axios.put(`${API_URL}/books/${book.id}.json`, updatedBook);
  
      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
      );
    } catch (error) {
      console.error("Error decreasing count:", error);
      toast({ title: "Error", description: "Failed to decrease book count." });
    }
  };
  
  
  const search = searchQuery?.toLowerCase() || "";
  const filteredBooks = books.filter(
    (book) =>
      book?.title?.toLowerCase()?.includes(search) ||
      book?.author?.toLowerCase()?.includes(search) ||
      book?.genre.toLowerCase().includes(search)
  );