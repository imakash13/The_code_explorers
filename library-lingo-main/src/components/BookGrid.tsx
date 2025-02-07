
import { Book } from "@/types/book";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface BookGridProps {
  books: Book[];
}

export const BookGrid = ({ books }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {books.map((book) => (
        <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-[3/4] relative">
            <img
              src={book.coverImage}
              alt={book.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">{book.rating}</span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg leading-tight mb-1">{book.title}</h3>
            <p className="text-muted-foreground text-sm">{book.author}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                {book.genre}
              </span>
              <span className={`text-xs font-medium ${book.available ? 'text-green-600' : 'text-red-600'}`}>
                {book.available ? 'Available' : 'Checked Out'}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
