import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Search } from "lucide-react";
  
  interface FilterBarProps {
    onSearchChange: (value: string) => void;
    onGenreChange: (value: string) => void;
    onRatingChange: (value: string) => void;
    onAvailabilityChange: (value: string) => void;
    genres: string[];
  }
  
  export const FilterBar = ({
    onSearchChange,
    onGenreChange,
    onRatingChange,
    onAvailabilityChange,
    genres,
  }: FilterBarProps) => {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search books..."
            className="pl-10"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select onValueChange={onGenreChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  
          <Select onValueChange={onRatingChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Star</SelectItem>
            </SelectContent>
          </Select>
  
          <Select onValueChange={onAvailabilityChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Books</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="checked-out">Checked Out</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };