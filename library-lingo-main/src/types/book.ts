
export interface Book {
  count: any;
  id: string;
  title: string;
  author: string;
  rating: number;
  publishedDate: string;
  available: boolean;
  genre?: string;
  isbn?: string;
  coverImage?: string;
  description?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
