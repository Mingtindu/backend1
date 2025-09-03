import express from "express";
import bookRoutes from "./routes/book.route.js";
const app = express();

app.use(express.json());

// middleware
// is like a bridge between the request
// coming from client and the response sent by server

// function which has req res next

function logger(req, res, next) {
  console.log(`${req.method}  ${req.url}`);
  next();
}

app.use(logger);
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
