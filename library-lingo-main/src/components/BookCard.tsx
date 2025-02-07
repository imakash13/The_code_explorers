import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  isAdmin?: boolean;
}

export const BookCard = ({ book, onEdit, onDelete, isAdmin = false }: BookCardProps) => {
  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="relative h-64">
        <img
          src={book.coverImage || "/placeholder.svg"}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="font-serif text-xl font-semibold text-primary mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
        <p className="text-sm text-gray-500">{book.genre}</p>
      </CardContent>
      {isAdmin && (
        <CardFooter className="flex justify-between gap-2">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => onEdit?.(book)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => onDelete?.(book)}
          >
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};