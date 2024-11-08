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
      return state.filter((book) => book.id !== action.id); // Corrected filter logic
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

  return (
    <LibraryContext.Provider
      value={{ books, borrowBook, returnBook, removeBook }}
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
