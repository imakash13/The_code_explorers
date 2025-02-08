

import React, { useState } from "react";
import "./Profile.css";

// Define types for user and books
interface User {
  name: string;
  email: string;
  mobile: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

const Profile: React.FC = () => {
  // Mock user data
  const [user] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
  });

  // Mock list of issued books
  const [issuedBooks, setIssuedBooks] = useState<Book[]>([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://via.placeholder.com/150" },
    { id: 2, title: "1984", author: "George Orwell", image: "https://via.placeholder.com/150" },
  ]);

  // Handle book return
  const returnBook = (id: number) => {
    setIssuedBooks(issuedBooks.filter(book => book.id !== id));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
      </div>

      <h3 className="books-title">Issued Books</h3>
      <div className="books-grid">
        {issuedBooks.map(book => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-details">
              <p><strong>{book.title}</strong> by {book.author}</p>
              <button
                onClick={() => returnBook(book.id)}
                className="return-button"
              >
                Return
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
