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

const createBook = (req, res) => {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);
    console.log(books);
    res.status(201).json(newBook);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getBook = (req, res) => {
  console.log("this is get req");
  res.status(200).send(books);
};

const getBookById = (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }
  res.json(book);
};

const updateBook = (req, res) => {
  const { title, author } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));
  book.title = title;
  book.author = author;

  console.log(book);
  res.json(book);
};

const deleteBook = (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  console.log(books);
  res.json({ message: "book deleted" });
};

export { createBook, getBook, getBookById, updateBook, deleteBook };
