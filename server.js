// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory "database" for books
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008 },
  { id: 2, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// GET a book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// POST a new book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    year
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author, year } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.year = year || book.year;

  res.json(book);
});

// DELETE a book
app.delete('/api/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

  books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Library API running at http://localhost:${PORT}`);
});
