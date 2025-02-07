import { Book, Review } from "@/types/book";

export const books: Book[] = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    description: "A fascinating exploration of the psychology behind effective design, explaining how good design can make products more usable and appealing.",
    genre: "Design",
    rating: 4.5,
    publishedDate: "2013-11-05",
    available: true,
  },
  {
    id: "2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
    description: "An exploration of the two systems that drive the way we think: the fast, intuitive, and emotional system; and the slower, more deliberative, and logical system.",
    genre: "Psychology",
    rating: 4.8,
    publishedDate: "2011-10-25",
    available: true,
  },
  {
    id: "3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
    description: "A guide to becoming a better programmer, with practical advice on everything from design to testing and career development.",
    genre: "Technology",
    rating: 4.7,
    publishedDate: "2019-09-23",
    available: false,
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    coverUrl: "https://images.unsplash.com/photo-1509266272358-7701da638078?auto=format&fit=crop&q=80&w=400",
    description: "A handbook of agile software craftsmanship that helps developers write better code.",
    genre: "Technology",
    rating: 4.6,
    publishedDate: "2008-08-01",
    available: true,
  }
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