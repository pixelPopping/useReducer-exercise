import { AddBookForm } from "./AddBookForm";
import { Category } from "./Category";
import { useLibrary } from "./LibraryContext";

export const Books = () => {
  const { books } = useLibrary();

  // Extract unique categories from books
  const categories = books.reduce(
    (categories, book) =>
      categories.includes(book.category)
        ? categories
        : categories.concat(book.category),
    []
  );

  return (
    <>
      <h2>Books ({books.length}):</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        categories.map((category) => (
          <Category
            key={category} // Added unique key for each category
            title={category[0].toUpperCase() + category.slice(1)}
            category={category}
          />
        ))
      )}
      <AddBookForm /> {/* Corrected rendering syntax */}
    </>
  );
};
