import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Omit<Book, "id">) => void;
  onCancel: () => void;
}

export const BookForm = ({ book, onSubmit, onCancel }: BookFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Omit<Book, "id">>({
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
    coverImage: book?.coverImage || "",
    description: book?.description || "",
    available: book?.count && book.count > 0,
    publishedDate: book?.publishedDate || "",
    rating: book?.rating ?? 0,
    count: book?.count || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) {
      toast({
        title: "Error",
        description: "Title and author are required",
        variant: "destructive",
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="isbn">ISBN</Label>
        <Input
          id="isbn"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="publishedDate">Published Date</Label>
        <Input
          id="publishedDate"
          type="date"
          value={formData.publishedDate}
          onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Input
          id="rating"
          type="number"
          step='0.1'
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })
          }
          min={0}
          max={5}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="available"
          type="checkbox"
          checked={formData.available}
          onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
        />
        <Label htmlFor="available">Available</Label>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{book ? "Update" : "Add"} Book</Button>
      </div>
    </form>
  );
};
