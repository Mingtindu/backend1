import express from "express";
import bookRoutes from "./routes/book.route.js";
const app = express();

app.use(express.json());

app.use("/books",bookRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
});

let books = [
  {
    id: 1,
    title: "Book One",
    author: "Author A",
  },
  {
    id: 2,
    title: "Book Two",
    author: "Author B",
  },
];

app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.json({
      message: "Book not found",
    });
  }
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  console.log(books);
  res.json(newBook);
});

app.put("/books/:id", (req, res) => {
  const { title, author } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));
  book.title = title;
  book.author = author;

  console.log(book);
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  console.log(books);
  res.json({ message: "book deleted" });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
