import { Router } from "express";
import { borrowBook, getAllBorrowedBooks } from "../controllers/borrow.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/borrow/:bookId", auth, borrowBook);
router.get("/borrow",  getAllBorrowedBooks);

export default router;
