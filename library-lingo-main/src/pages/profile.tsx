import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [issuedBooks, setIssuedBooks] = useState<Book[]>([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      image: "https://tse3.mm.bing.net/th?id=OIP.OIOAhyVyhfuNoK5ev3p9DAHaLG&pid=Api&P=0&h=180"
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      image: "https://tse4.mm.bing.net/th?id=OIP.uUtNeR0CUK2RIvzheFw6ZAHaJz&pid=Api&P=0&h=180"
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      image: "https://tse3.mm.bing.net/th?id=OIP.6-6fkF8k2jwWGFc8B69XnAHaLH&pid=Api&P=0&h=180"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      image: "https://tse2.mm.bing.net/th?id=OIP.JPow5QVYTIRnaf8pqZ5MCgHaI7&pid=Api&P=0&h=180"
    }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
      } else {
        navigate("/admin/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const saveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const returnBook = (id: number) => {
    setIssuedBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

    toast({
      title: "Book Returned",
      description: "The book has been returned successfully.",
    });
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{name || "User"}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile</label>
                <Input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                />
              </div>
              <Button onClick={saveProfile}>Save Changes</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Name</div>
                <div>{name || "Not set"}</div>
                <div className="text-muted-foreground">Mobile</div>
                <div>{mobile || "Not set"}</div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Issued Books</h3>
            {issuedBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {issuedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex space-x-4 p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => returnBook(book.id)}
                      >
                        Return Book
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No books issued.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
