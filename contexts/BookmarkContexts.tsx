// context/BookmarkContext.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// 1. Movie Type
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

// 2. Context Type
type BookmarkContextType = {
  bookmarks: Movie[];
  toggleBookmark: (movie: Movie) => void;
  isBookmarked: (id: number) => boolean;
};

// 3. Create Context
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

// 4. Custom Hook to Use Context
export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context)
    throw new Error("BookmarkContext must be used within a BookmarkProvider");
  return context;
};

// 5. AsyncStorage Key
const STORAGE_KEY = "@bookmarked_movies";

// 6. Provider Component
export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Movie[]>([]);

  // Load bookmarks from storage on app load
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setBookmarks(JSON.parse(json));
        }
      } catch (err) {
        console.error("Failed to load bookmarks", err);
      }
    };
    loadBookmarks();
  }, []);

  // Save bookmarks to storage on change
  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (err) {
        console.error("Failed to save bookmarks", err);
      }
    };
    saveBookmarks();
  }, [bookmarks]);

  // Toggle logic
  const toggleBookmark = (movie: Movie) => {
    setBookmarks((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [...prev, movie];
    });
  };

  const isBookmarked = (id: number) => bookmarks.some((m) => m.id === id);

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
