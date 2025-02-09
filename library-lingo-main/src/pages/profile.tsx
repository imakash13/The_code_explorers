
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "./Profile.css";

// Define types for books
interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

const Profile: React.FC = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode

  // Mock list of issued books
  const [issuedBooks, setIssuedBooks] = useState<Book[]>([
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "image": "https://tse3.mm.bing.net/th?id=OIP.OIOAhyVyhfuNoK5ev3p9DAHaLG&pid=Api&P=0&h=180"
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "image": "https://tse4.mm.bing.net/th?id=OIP.uUtNeR0CUK2RIvzheFw6ZAHaJz&pid=Api&P=0&h=180"
    },
    {
      "id": 3,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "image": "https://tse3.mm.bing.net/th?id=OIP.6-6fkF8k2jwWGFc8B69XnAHaLH&pid=Api&P=0&h=180"
    },
    {
      "id": 4,
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "image": "https://tse2.mm.bing.net/th?id=OIP.JPow5QVYTIRnaf8pqZ5MCgHaI7&pid=Api&P=0&h=180"
    },
    {
      "id": 5,
      "title": "Moby-Dick",
      "author": "Herman Melville",
      "image": "https://tse3.mm.bing.net/th?id=OIP.QLm4EQ4BQx99J2HPJ3EtOgHaLZ&pid=Api&P=0&h=180"
    }
    ,
  {
    "id": 6,
    "title": "A Suitable Boy",
    "author": "Vikram Seth",
    "image": "https://tse2.mm.bing.net/th?id=OIP.bCDGIBQK8p98nJmCfjoybAHaLW&pid=Api&P=0&h=180"
  },
  {
    "id": 7,
    "title": "The Guide",
    "author": "R.K. Narayan",
    "image": "https://tse2.mm.bing.net/th?id=OIP.WKxJx5f3tVr4ev6ZRLrDPAHaKe&pid=Api&P=0&h=180"
  },
  {
    "id": 8,
    "title": "The White Tiger",
    "author": "Aravind Adiga",
    "image": "https://tse4.mm.bing.net/th?id=OIP.jLZ4Vl_LcNHPzgC8X4yd2gHaLR&pid=Api&P=0&h=180"
  }, {
    "id": 9,
    "title": "The God of Small Things",
    "author": "Arundhati Roy",
    "image": "https://tse1.mm.bing.net/th?id=OIP.nNcBZdoVpqiGr2JeJGvLrQHaLQ&pid=Api&P=0&h=180"
  }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setName(currentUser.displayName || "");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Save user info (Only updates UI, does not save to DB)
  const saveProfile = () => {
    setIsEditing(false); // Hide inputs and save button after saving
  };

  // Handle book return
  const returnBook = (id: number) => {
    setIssuedBooks(issuedBooks.filter(book => book.id !== id));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>

        {isEditing ? (
          <>
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>
            <label>
              <strong>Mobile:</strong>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </label>
            <br />
            <button onClick={saveProfile} className="buttonp">Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {name || "N/A"}</p>
            <p><strong>Mobile:</strong> {mobile || "N/A"}</p>
            <button onClick={() => setIsEditing(true)} className="buttonp">Edit</button>
          </>
        )}
      </div>

      <h3 className="books-title">Issued Books</h3>
      <div className="books-grid">
        {issuedBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-details">
              <p><strong>{book.title}</strong> by {book.author}</p>
              <button onClick={() => returnBook(book.id)} className="return-button">Return</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
