const express = require("express");

const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

module.exports = router;

/**
 * Route: /books
 * Method:GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

/**
 * Route: /books/issued
 * Method:GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books issued",
    });
  }
  return res.status(200).json({
    succes: true,
    message: "Users with the issued books",
    data: issuedBooks,
  });
});

/**
 * Route: /books/id
 * Method:GET
 * Description: Gettin a book by id
 * Access: Public
 * Parameters: ID
 */

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  return res.status(200).json({
    success: true,
    messgae: "Book Found by id",
    data: book,
  });
});

/**
 * Route: /books/issued
 * Method:GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books issued",
    });
  }
  return res.status(200).json({
    succes: true,
    message: "Users with the issued books",
    data: issuedBooks,
  });
});
