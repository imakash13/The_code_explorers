
import { Book, Review } from "@/types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl: "/placeholder.svg",
    description: "A fascinating exploration of the psychology behind effective design...",
    genre: "Design",
    rating: 4.5,
    publishedDate: "2013-11-05",
    available: true,
  },
  {
    id: "2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "/placeholder.svg",
    description: "An exploration of the two systems that drive the way we think...",
    genre: "Psychology",
    rating: 4.8,
    publishedDate: "2011-10-25",
    available: true,
  },
  // Add more mock books as needed
];

export const reviews: Review[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alice Johnson",
    rating: 5,
    comment: "A fascinating read that changed how I think about design.",
    date: "2024-03-20",
  },
  {
    id: "2",
    userId: "2",
    userName: "Bob Smith",
    rating: 4,
    comment: "Very insightful, though some parts were a bit technical.",
    date: "2024-03-19",
  },
];
