const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.static("public"));
app.use(express.json());
const path = require("path");

const PORT = process.env.PORT || 3000;

let nextId = 1;
const booksFilePath = path.join(__dirname, "books.json");

// Function to clear all books
function clearBooks() {
  fs.writeFileSync(booksFilePath, "[]");
  console.log("All Books Cleared");
}

// Clear all books when the server starts
clearBooks();

// API Routes

// Endpoint to create a new book
app.put("/book", (req, res) => {
  const { title, author } = req.body; // Storing title and author from req input

  // Check if title or author is empty
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title cannot be empty" });
  }
  if (typeof author !== "string" || author.trim() === "") {
    return res.status(400).json({ error: "author cannot be empty" });
  }

  // Check if title or author is missing
  if (title === undefined) {
    return res.status(400).json({ error: "title is missing" });
  }
  if (author === undefined) {
    return res.status(400).json({ error: "author is missing" });
  }

  // Load existing books from JSON
  let books = [];
  try {
    const data = fs.readFileSync(booksFilePath, "utf8");
    books = JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
  }

  // Check if a book with the same title already exists
  const existingBook = books.find((book) => book.title === title);
  if (existingBook) {
    // Book already exists, return 400 error
    return res
      .status(400)
      .json({ error: `Book  with title "${title}" already exists` });
  }

  const id = nextId++; // Generate sequential numeric ID for the book
  const newBook = { id, title, author }; // compose response body

  // Add new book to the list
  books.push(newBook);

  // Save updated list of books to JSON file
  fs.writeFileSync(booksFilePath, JSON.stringify(books));

  // Return response with created book
  res.json(newBook);
});

// Endpoint to get a book by ID
app.get("/book/:id", (req, res) => {
  const { id } = req.params;

  // Load existing books from JSON file
  let books = [];
  try {
    const data = fs.readFileSync(booksFilePath, "utf8");
    books = JSON.parse(data);
    console.log(JSON.stringify(books));
  } catch (err) {
    console.error("Error reading file:", err);
  }

  // Find book by ID
  const book = books.find((book) => book.id === parseInt(id));
  if (book) {
    // Book found, return it
    res.json(book);
  } else {
    // Book not found, return error response
    res.status(400).json({ error: `Book with id:${id} not found` });
  }
});

// Endpoint to delete all books
app.delete("/book", (req, res) => {
  // Clear contents of JSON file
  fs.writeFileSync(booksFilePath, "[]");

  // Return success response
  res.json({ message: "All books deleted" });
});

module.exports = app; // Export the app instance
