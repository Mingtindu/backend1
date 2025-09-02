import { Router } from "express";

const router = Router();

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

// http://localhost:8000/books/
router.get("/", (req, res) => {
  res.json(books);
});

// http://localhost:8000/books/1
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.json({
      message: "Book not found",
    });
  }
  res.json(book);
});

export default router;
