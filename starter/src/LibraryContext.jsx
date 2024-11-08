import { createContext, useContext, useReducer } from "react";
import { collection } from "./collection";

export const LibraryContext = createContext({});
LibraryContext.displayName = "LibraryContext";

// Define the initial state for books
const initialState = collection.books;

// Define reducer function to handle actions
const libraryReducer = (state, action) => {
  switch (action.type) {
    case "borrow-book":
      return state.map((book) =>
        book.id === action.id ? { ...book, available: false } : book
      );
    case "return-book":
      return state.map((book) =>
        book.id === action.id ? { ...book, available: true } : book
      );
    case "remove-book":
      return state.filter((book) => book.id !== action.id);

    case "add-book":
      // Create a new book object
      const newBook = {
        ...action.book,
        id: state.length > 0 ? state[state.length - 1].id + 1 : 1, // Increment the last book's ID
        category: action.book.category.toLowerCase(), // Ensure lowercase category
        available: true, // Set availability to true
      };

      // Return a new array with the new book added to the end
      return [...state, newBook]; // Or use structuredClone([...state, newBook]) if deep cloning is needed

    default:
      return state;
  }
};

export const LibraryContextProvider = ({ children }) => {
  const [books, dispatch] = useReducer(libraryReducer, initialState);

  const borrowBook = (id) => {
    dispatch({ type: "borrow-book", id });
  };

  const returnBook = (id) => {
    dispatch({ type: "return-book", id });
  };

  const removeBook = (id) => {
    dispatch({ type: "remove-book", id }); // Corrected action type
  };

  // In LibraryContext.js
  const addBook = (props) => {
    dispatch({ type: "add-book", ...props });
  };

  return (
    <LibraryContext.Provider
      value={{ books, borrowBook, returnBook, removeBook, addBook }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryContextProvider");
  }
  return context;
};
