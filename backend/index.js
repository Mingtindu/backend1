import express from "express";
import bookRoutes from "./routes/book.route.js";
import userRoutes from "./routes/user.route.js"
import { connectDB } from "./config/db.js";

const app = express();
connectDB()

app.use(express.json());

// middleware
// is like a bridge between the request
// coming from client and the response sent by server

// function which has req res next
app.use("/books", bookRoutes);
app.use("/users",userRoutes)

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
