import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  copies: {
    type: Number,
    default: 1,
  },
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
