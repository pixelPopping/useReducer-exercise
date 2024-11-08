import { useLibrary } from "./LibraryContext";

export const AddBookForm = () => {
  const { addBook } = useLibrary(); // Access addBook directly from context

  const submitForm = (event) => {
    event.preventDefault();
    addBook({
      title: event.target.elements.title.value,
      author: event.target.elements.author.value,
      category: event.target.elements.category.value,
    });
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="author">Author:</label>
      <input type="text" name="author" required />

      <label htmlFor="title">Title:</label>
      <input type="text" name="title" required />

      <label htmlFor="category">Category:</label>
      <input type="text" name="category" required />

      <button type="submit">Add Book</button>
    </form>
  );
};
